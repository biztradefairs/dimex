const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(fs.readFileSync("lib/adminExhibitorList.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const moduleUnderTest = { exports: {} };
vm.runInNewContext(source, {
  module: moduleUnderTest, exports: moduleUnderTest.exports, Map,
  require: () => ({ exhibitorsAPI: {} }),
});
const load = moduleUnderTest.exports.loadAdminExhibitors;
function response(ids, page, total, limit) {
  return { success: true, data: ids.map((id) => ({ id: String(id), company: "Company " + id })),
    pagination: { page, total, limit, totalPages: Math.ceil(total / limit) } };
}

test("requests the selected server page and searches the entire catalogue", async () => {
  const result = await load({ page: 3, pageSize: 10, search: "  Sunita  " }, async (params) => {
    assert.equal(params.page, 3);
    assert.equal(params.limit, 10);
    assert.equal(params.search, "Sunita");
    return response([21, 22], 3, 22, 10);
  });
  assert.equal(result.pagination.total, 22);
  assert.deepEqual(result.data.map((row) => row.id), ["21", "22"]);
});

test("All retrieves every API page rather than stopping at the first 100 exhibitors", async () => {
  const calls = [];
  const result = await load({ page: 4, pageSize: "all", search: "" }, async ({ page, limit }) => {
    calls.push(page);
    const first = (page - 1) * limit;
    return response(Array.from({ length: Math.min(limit, 238 - first) }, (_, index) => first + index + 1), page, 238, limit);
  });
  assert.deepEqual(calls, [1, 2, 3]);
  assert.equal(result.data.length, 238);
  assert.equal(new Set(result.data.map((row) => row.id)).size, 238);
  assert.equal(result.pagination.total, 238);
  assert.equal(result.pagination.page, 1);
  assert.equal(result.pagination.totalPages, 1);
});

test("All keeps the search constraint on subsequent API pages", async () => {
  const result = await load({ page: 1, pageSize: "all", search: " tooling " }, async ({ page, search }) => {
    assert.equal(search, "tooling");
    return response(page === 1 ? [1, 2] : [3], page, 101, 100);
  });
  assert.equal(result.data.length, 3);
});

test("deleting the last record on the final page recovers to a valid page", async () => {
  const calls = [];
  const result = await load({ page: 4, pageSize: 10, search: "" }, async ({ page }) => {
    calls.push(page);
    return response(page === 4 ? [] : [21, 22], page, 22, 10);
  });
  assert.deepEqual(calls, [4, 3]);
  assert.equal(result.pagination.page, 3);
});

test("a failed subsequent page rejects All rather than displaying incomplete results", async () => {
  await assert.rejects(load({ page: 1, pageSize: "all", search: "" }, async ({ page }) => {
    if (page === 2) throw new Error("Backend unavailable");
    return response([1], page, 101, 100);
  }), /Backend unavailable/);
});

test("an empty All result has valid pagination", async () => {
  const result = await load({ page: 1, pageSize: "all", search: "" }, async () => response([], 1, 0, 100));
  assert.equal(result.data.length, 0);
  assert.equal(result.pagination.page, 1);
  assert.equal(result.pagination.limit, 1);
  assert.equal(result.pagination.total, 0);
  assert.equal(result.pagination.totalPages, 0);
});
