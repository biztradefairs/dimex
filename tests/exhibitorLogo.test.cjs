const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function load(file, imports = {}, globals = {}) {
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText, { module, exports: module.exports, require: id => imports[id], ...globals });
  return module.exports;
}
const logos = load("lib/exhibitorLogo.ts");
test("reads logo URLs from list responses and JSON/object detail metadata", () => {
  const url = "https://res.cloudinary.com/demo/image/upload/logo.png";
  assert.equal(logos.getExhibitorLogoUrl({ logoUrl: url }), url);
  assert.equal(logos.getExhibitorLogoUrl({ metadata: { logoUrl: url } }), url);
  assert.equal(logos.getExhibitorLogoUrl({ metadata: JSON.stringify({ logoUrl: url }) }), url);
  assert.equal(logos.getExhibitorLogoUrl({ metadata: "{malformed" }), "");
  assert.equal(logos.getExhibitorLogoUrl({ metadata: null }), "");
});
test("validates image types, empty files and the upload size limit", () => {
  for (const type of ["image/png", "image/jpeg", "image/webp", "image/gif"]) assert.equal(logos.validateExhibitorLogo({ type, size: 1024 }), null);
  assert.match(logos.validateExhibitorLogo({ type: "application/pdf", size: 100 }), /PNG/);
  assert.match(logos.validateExhibitorLogo({ type: "image/png", size: 0 }), /empty/);
  assert.match(logos.validateExhibitorLogo({ type: "image/png", size: 5 * 1024 * 1024 + 1 }), /5 MB/);
});

function apiHarness() {
  const state = {};
  const instance = {
    interceptors: { request: { use: callback => { state.intercept = callback; } }, response: { use() {} } },
    async post(url, data, config) {
      state.post = { url, data, config };
      return { data: { success: true, data: { url: "https://res.cloudinary.com/demo/image/upload/logo.png", publicId: "exhibitor-logos/test" } } };
    },
    async get() { return { data: { success: true, data: [{ id: "one", company: "Company", metadata: JSON.stringify({ logoUrl: "https://res.cloudinary.com/demo/image/upload/logo.png" }) }], pagination: { page: 1, limit: 10, total: 1, totalPages: 1 } } }; },
  };
  const axios = { create: () => instance, isAxiosError: () => false };
  const api = load("lib/api/exhibitors.ts", { axios, "@/lib/exhibitorLogo": logos }, {
    FormData, process: { env: {} }, console: { log() {}, error() {} },
    window: { location: { pathname: "/admin/exhibition/exhibitors" } },
    localStorage: { getItem: key => ({ admin_token: "admin-session", exhibitor_token: "exhibitor-session" })[key] || null },
  }).exhibitorsAPI;
  return { api, state };
}
test("uploads a multipart logo file with a finite timeout and maps its Cloudinary response", async () => {
  const { api, state } = apiHarness();
  const file = new File(["image"], "logo.png", { type: "image/png" });
  const result = await api.uploadLogo("company-id", file);
  assert.equal(state.post.url, "/exhibitors/company-id/logo");
  assert.equal(state.post.data.get("logo").name, "logo.png");
  assert.equal(state.post.config.timeout, 90000);
  assert.equal(result.publicId, "exhibitor-logos/test");
});
test("invalid images never call the upload API", async () => {
  const { api, state } = apiHarness();
  await assert.rejects(api.uploadLogo("one", new File(["pdf"], "file.pdf", { type: "application/pdf" })), /PNG/);
  assert.equal(state.post, undefined);
});
test("the list API retains logos from metadata for display", async () => {
  const { api } = apiHarness();
  const result = await api.getAll();
  assert.match(result.data[0].logoUrl, /res.cloudinary.com/);
});
test("admin pages use the admin session even when an exhibitor is also signed in", () => {
  const { state } = apiHarness();
  const config = state.intercept({ method: "get", url: "/exhibitors", headers: {} });
  assert.equal(config.headers.Authorization, "Bearer admin-session");
});
