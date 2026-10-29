const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const jsxRuntime = require("react/jsx-runtime");

function fixture(props = {}, values = {}, registration = null) {
  let submit;
  const sent = [];
  const errors = [];
  const navigations = [];
  const prefetches = [];
  const effects = [];
  const mocks = {
    react: {
      ...React,
      useEffect: (effect) => effects.push(effect),
      useState: (initial) => [
        initial &&
        typeof initial === "object" &&
        Object.hasOwn(initial, "productSector")
          ? { ...initial, ...values }
          : initial,
        () => {},
      ],
    },
    "react/jsx-runtime": {
      ...jsxRuntime,
      jsx(type, props, ...rest) {
        if (type === "form") submit = props.onSubmit;
        return jsxRuntime.jsx(type, props, ...rest);
      },
      jsxs(type, props, ...rest) {
        if (type === "form") submit = props.onSubmit;
        return jsxRuntime.jsxs(type, props, ...rest);
      },
    },
    "next/navigation": {
      useRouter: () => ({ push: (url) => navigations.push(url), prefetch: (url) => prefetches.push(url) }),
    },
    "react-hot-toast": { error: (message) => errors.push(message) },
    "react-google-recaptcha": () => null,
    "@/hooks/useLocationData": {
      useLocationData: () => ({
        countries: [],
        states: [],
        cities: [],
        countriesLoading: false,
        statesLoading: false,
        citiesLoading: false,
      }),
    },
    "@/hooks/useUTMTracker": {
      useUTMData: () => ({
        utmData: { utm_source: "facebook", utm_campaign: "exhibitors" },
        campaign: null,
      }),
    },
    "@/lib/submitRegistration": registration || {
      submitRegistrationInBackground: (payload) => sent.push(payload),
      saveThanksSession() {},
    },
  };
  function load(name) {
    const source = fs.readFileSync(path.join(__dirname, "..", name), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText;
    const mod = { exports: {} };
    vm.runInNewContext(compiled, {
      module: mod,
      exports: mod.exports,
      console,
      process: { env: {} },
      require: (name) =>
        Object.hasOwn(mocks, name) ? mocks[name] : require(name),
    });
    return mod.exports;
  }
  mocks["@/components/FormFields"] = load("components/FormFields.tsx");
  const Form = load("components/ExhibitorForm.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Form, props));
  effects.forEach((effect) => effect());
  return {
    html,
    sent,
    errors,
    navigations,
    prefetches,
    submit: () => submit({ preventDefault() {} }),
  };
}

const complete = {
  companyName: "Precision Tools",
  contactPerson: "Test Exhibitor",
  jobTitle: "Director",
  email: "exhibitor@example.test",
  phone: "9876543210",
  industry: "Manufacturing",
  country: "India",
  state: "Maharashtra",
  city: "Pune",
  standSize: "9 sqm (3x3)",
};

test("the popup omits only Interest Level, Products / Services and Message", () => {
  const { html } = fixture({ variant: "popup" });
  for (const label of [
    "Interest Level",
    "Products / Services",
    "Message (If any)",
  ])
    assert.equal(html.includes(label), false);
  for (const name of ["interestLevel", "productSector", "message"])
    assert.equal(html.includes(`name="${name}"`), false);
});

test("all remaining shared form fields and consent controls stay in the popup", () => {
  const { html } = fixture({ variant: "popup" });
  const controls = html.match(/<(?:input|select)\b[^>]*>/g);
  for (const name of [
    "companyName",
    "contactPerson",
    "jobTitle",
    "email",
    "phone",
    "industry",
    "ex-country",
    "ex-state",
    "ex-city",
    "standSize",
  ]) {
    const control = controls.find((tag) => tag.includes(`name="${name}"`));
    assert.ok(control, `Missing ${name}`);
    assert.ok(control.includes("required"), `${name} must remain required`);
  }
  assert.ok(html.includes('id="ex-terms"'));
  assert.ok(html.includes('id="ex-privacy"'));
});

test("the regular register page keeps all three original fields by default", () => {
  const { html } = fixture();
  for (const label of [
    "Interest Level",
    "Products / Services",
    "Message (If any)",
  ])
    assert.ok(html.includes(label));
});

test("popup submission bypasses hidden product validation and uses the existing exhibitor flow", async () => {
  const app = fixture({ variant: "popup" }, complete);
  await app.submit();
  assert.deepEqual(app.errors, []);
  assert.equal(app.sent.length, 1);
  const payload = app.sent[0];
  assert.equal(payload.formType, "exhibitor-enquiry");
  assert.equal(payload.jobTitle, "Director");
  assert.equal(payload.country, "India");
  assert.equal(payload.standSize, "9 sqm (3x3)");
  assert.equal(payload.utmSource, "facebook");
  for (const field of ["interestLevel", "productSector", "message"])
    assert.equal(Object.hasOwn(payload, field), false);
  assert.ok(app.navigations[0].startsWith("/register/thank-you?t=exhibitor"));
});

test("the regular form still requires product selection", async () => {
  const app = fixture({}, complete);
  await app.submit();
  assert.equal(app.sent.length, 0);
  assert.deepEqual(app.errors, ["Please select at least one product sector"]);
});

test("a selected landing-page package preselects the matching shared booth-size option", () => {
  const { html } = fixture({
    variant: "popup",
    initialStandSize: "9 sqm (3x3)",
  });
  assert.match(html, /<option value="9 sqm \(3x3\)" selected="">/);
});

test('regular exhibitor submissions retain the original product, message and interest fields', async () => {
  const app = fixture({}, { ...complete, productSector: ['Cutting Tools'], message: 'Please send details', interestLevel: 'Looking for more information' });
  await app.submit();
  assert.equal(app.sent.length, 1);
  assert.equal(app.sent[0].productSector[0], 'Cutting Tools');
  assert.equal(app.sent[0].message, 'Please send details');
  assert.equal(app.sent[0].interestLevel, 'Looking for more information');
});


test('opening the popup preloads the exhibitor thank-you page', () => {
  const app = fixture({ variant: 'popup' });
  assert.deepEqual(app.prefetches, ['/register/thank-you?t=exhibitor']);
});

test('the popup redirects immediately while the real background request is unresolved', async () => {
  const storage = new Map();
  const browser = new EventTarget();
  browser.location = { href: 'https://www.diemex.in/exhibit-2027' };
  let finish;
  let request;
  const module = { exports: {} };
  const compiled = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../lib/submitRegistration.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(compiled, {
    module, exports: module.exports, Error, Event, console,
    window: browser,
    sessionStorage: { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    fetch: (url, options) => {
      request = { url, options };
      return new Promise((resolve) => { finish = resolve; });
    },
  });
  const background = module.exports;
  const app = fixture({ variant: 'popup' }, complete, background);
  await Promise.race([
    app.submit(),
    new Promise((_, reject) => setImmediate(() => reject(new Error('Navigation waited for backend processing')))),
  ]);
  assert.deepEqual(app.navigations, ['/register/thank-you?t=exhibitor&name=Test']);
  assert.equal(background.readRegistrationStatus().status, 'pending');
  assert.equal(request.url, '/api/registration');
  assert.equal(request.options.keepalive, true);
  assert.equal(JSON.parse(request.options.body).payload.formType, 'exhibitor-enquiry');
  finish(new Response(JSON.stringify({ success: true }), { status: 200 }));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(background.readRegistrationStatus().status, 'success');
});

test('repeated submit clicks cannot start duplicate saves or emails during the redirect', async () => {
  const app = fixture({ variant: 'popup' }, complete);
  await app.submit();
  await app.submit();
  assert.equal(app.sent.length, 1);
  assert.equal(app.navigations.length, 1);
});
