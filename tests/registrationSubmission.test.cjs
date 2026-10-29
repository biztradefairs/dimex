const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, imports, globals = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(compiled, {
    module: mod, exports: mod.exports, Error, Event, AbortSignal,
    console: { error() {}, warn() {} },
    require(id) {
      if (Object.hasOwn(imports, id)) return imports[id];
      throw new Error('Unexpected import: ' + id);
    },
    ...globals,
  }, { filename: file });
  return mod.exports;
}

const response = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json' },
});
const leadSuccess = () => response(200, { data: { createLead: { id: 'lead-1', name: 'Test Visitor', email: 'visitor@example.test' } } });
const payload = {
  formType: 'visitor-registration', email: 'visitor@example.test',
  contactPerson: 'Test Visitor', phone: '9876543210', countryCode: '+91',
  companyName: 'Test Company', jobTitle: 'Engineer', country: 'India',
  state: 'Maharashtra', city: 'Pune', profile: 'Automotive',
  utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'visitors',
  landingPage: 'https://www.diemex.in/register?t=visitor',
};

function serverFixture({ cms = leadSuccess, contact = () => response(202, { success: true }), env = {} } = {}) {
  const calls = [];
  const globals = {
    process: { env: {
      NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT: 'https://cms.example.test/graphql',
      NEXT_PUBLIC_CMS_PROJECT_ID: 'project-test',
      ...env,
    } },
    fetch: async (url, options) => {
      calls.push({ url, options, body: JSON.parse(options.body) });
      return url.endsWith('/graphql') ? cms() : contact();
    },
  };
  const client = load('lib/graphql-client.ts', {}, globals);
  const route = load('app/api/registration/route.ts', {
    '@/lib/graphql-client': client,
    'next/server': { NextResponse: { json: (body, options) => response(options.status, body) } },
  }, globals);
  return {
    calls,
    post: (body = { payload }) => route.POST({ json: async () => body }),
  };
}

test('visitor background processing saves a VISITOR lead and starts the existing confirmation email flow', async () => {
  const app = serverFixture();
  const result = await app.post();
  assert.equal(result.status, 200);
  assert.equal((await result.json()).success, true);
  const cmsInput = app.calls[0].body.variables.input;
  assert.equal(cmsInput.leadType, 'VISITOR');
  assert.equal(cmsInput.name, payload.contactPerson);
  assert.equal(cmsInput.projectId, 'project-test');
  assert.equal(cmsInput.industry, 'Automotive');
  assert.equal(cmsInput.utmSource, 'google');
  assert.equal(cmsInput.utmUrl, payload.landingPage);
  assert.equal(app.calls[1].url, 'https://diemex-backend.onrender.com/api/contact');
  assert.deepEqual(app.calls[1].body, payload);
});

test('exhibitor submissions keep the same CMS and email destinations', async () => {
  const app = serverFixture();
  assert.equal((await app.post({ payload: { ...payload, formType: 'exhibitor-enquiry' } })).status, 200);
  assert.equal(app.calls[0].body.variables.input.leadType, 'EXHIBITOR');
  assert.equal(app.calls[1].body.formType, 'exhibitor-enquiry');
});

test('a CMS GraphQL error is reported even when the email request succeeds', async () => {
  const app = serverFixture({ cms: () => response(200, { errors: [{ message: 'Database unavailable' }] }) });
  const result = await app.post();
  assert.equal(result.status, 502);
  assert.equal((await result.json()).success, false);
  assert.equal(app.calls.length, 2);
});

test('an HTTP error from the contact backend is reported while the CMS operation still completes', async () => {
  const app = serverFixture({ contact: () => response(500, { success: false, message: 'Pass creation failed' }) });
  const result = await app.post();
  assert.equal(result.status, 502);
  assert.match((await result.json()).message, /registration was saved/);
  assert.equal(app.calls.length, 2);
});

test('invalid success responses cannot report a completed registration', async () => {
  const app = serverFixture({ contact: () => response(200, { success: false, message: 'Not saved' }) });
  assert.equal((await app.post()).status, 502);
});

test('configured backend roots and API base URLs both produce the correct contact URL', async () => {
  for (const env of [
    { NEXT_PUBLIC_API_URL: 'https://backend.example.test/' },
    { NEXT_PUBLIC_API_BASE_URL: 'https://backend.example.test/api/' },
    { API_BASE_URL: 'https://backend.example.test/api/', NEXT_PUBLIC_API_URL: 'https://unused.example.test' },
  ]) {
    const app = serverFixture({ env });
    await app.post();
    assert.equal(app.calls[1].url, 'https://backend.example.test/api/contact');
  }
});

test('CMS-only processing does not send the confirmation email twice', async () => {
  const app = serverFixture();
  assert.equal((await app.post({ payload, options: { contact: false } })).status, 200);
  assert.equal(app.calls.length, 1);
});

test('invalid registration requests are rejected before calling either service', async () => {
  const app = serverFixture();
  for (const body of [null, {}, { payload: [] }, { payload: { ...payload, email: '' } }, { payload: { ...payload, formType: 'unknown' } }]) {
    assert.equal((await app.post(body)).status, 400);
  }
  assert.equal(app.calls.length, 0);
});

function browserFixture(fetch) {
  const storage = new Map();
  const window = new EventTarget();
  window.location = { href: 'https://www.diemex.in/register?t=visitor' };
  return load('lib/submitRegistration.ts', {}, {
    window, fetch,
    sessionStorage: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value),
    },
  });
}
const flush = () => new Promise((resolve) => setImmediate(resolve));

test('the form can navigate immediately while its server request runs with keepalive', async () => {
  let finish;
  let request;
  const app = browserFixture((url, options) => {
    request = { url, options };
    return new Promise((resolve) => { finish = resolve; });
  });
  assert.equal(app.submitRegistrationInBackground(payload), undefined);
  assert.equal(app.readRegistrationStatus().status, 'pending');
  assert.equal(request.url, '/api/registration');
  assert.equal(request.options.keepalive, true);
  assert.equal(JSON.parse(request.options.body).payload.utmUrl, payload.landingPage);
  finish(response(200, { success: true }));
  await flush();
  assert.equal(app.readRegistrationStatus().status, 'success');
});

test('background HTTP errors and network errors are available to the thank-you page', async () => {
  for (const fetch of [
    async () => response(502, { success: false, message: 'Please contact our team.' }),
    async () => { throw new Error('Network unavailable'); },
  ]) {
    const app = browserFixture(fetch);
    app.submitRegistrationInBackground(payload);
    await flush();
    assert.equal(app.readRegistrationStatus().status, 'error');
    assert.ok(app.readRegistrationStatus().message);
  }
});


test('exhibitor processing runs the database save and thank-you email concurrently after navigation', async () => {
  let finishDatabase;
  let finishMail;
  const server = serverFixture({
    cms: () => new Promise((resolve) => { finishDatabase = () => resolve(leadSuccess()); }),
    contact: () => new Promise((resolve) => { finishMail = () => resolve(response(200, { success: true })); }),
  });
  const browser = browserFixture((url, options) => server.post(JSON.parse(options.body)));
  const result = browser.submitRegistrationInBackground({ ...payload, formType: 'exhibitor-enquiry' });
  assert.equal(result, undefined);
  await flush();
  assert.equal(browser.readRegistrationStatus().status, 'pending');
  assert.equal(server.calls.length, 2);
  assert.equal(server.calls[0].body.variables.input.leadType, 'EXHIBITOR');
  assert.equal(server.calls[1].body.formType, 'exhibitor-enquiry');
  finishDatabase();
  await flush();
  assert.equal(browser.readRegistrationStatus().status, 'pending');
  finishMail();
  await flush();
  assert.equal(browser.readRegistrationStatus().status, 'success');
});
