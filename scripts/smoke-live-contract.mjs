const checks = [
  { label: "site llms", url: "https://ekstra.ai/llms.txt", expect: 200, type: "text/plain" },
  { label: "full llms", url: "https://ekstra.ai/llms-full.txt", expect: 200, type: "text/plain" },
  { label: "vibe guide", url: "https://ekstra.ai/downloads/ekstra-vibe-coder-guide.json", expect: 200, type: "application/json" },
  { label: "openapi", url: "https://ekstra.ai/api/v1/openapi.json", expect: 200, type: "application/json" },
  { label: "network devices", url: "https://ekstra.ai/api/v1/network/devices?limit=1", expect: 200, type: "application/json" },
  { label: "network stats", url: "https://ekstra.ai/api/v1/network/stats", expect: 200, type: "application/json" },
  { label: "platform facts", url: "https://ekstra.ai/api/v1/platform/facts", expect: 200, type: "application/json" },
  {
    label: "curb near",
    url: "https://ekstra.ai/api/v1/curb-rules/near?lat=40.7580&lng=-73.9855&radius_m=200",
    expect: 200,
    type: "application/json",
  },
  { label: "curb stats", url: "https://ekstra.ai/api/v1/curb-rules/stats", expect: 200, type: "application/json" },
  {
    label: "spaces near",
    url: "https://ekstra.ai/api/v1/spaces/near?lat=40.7580&lng=-73.9855&radius_m=200",
    expect: 200,
    type: "application/json",
  },
  { label: "cameras", url: "https://ekstra.ai/api/v1/cameras?limit=1", expect: 200, type: "application/json" },
  { label: "phone health", url: "https://ekstra.ai/api/phone-imu/health", expect: 200, type: "application/json" },
  {
    label: "phone ingest no-op",
    url: "https://ekstra.ai/api/phone-imu/ingest",
    method: "POST",
    body: {},
    expect: 200,
    type: "application/json",
    bodyIncludes: "\"received\":false",
  },
  {
    label: "runtime ingest auth boundary",
    url: "https://ekstra.ai/api/v1/runtime/packets/ingest",
    method: "POST",
    body: {},
    expect: 401,
    type: "application/json",
  },
  { label: "developer overview auth boundary", url: "https://ekstra.ai/api/developer/cloud/overview", expect: 401, type: "application/json" },
  { label: "developer projects auth boundary", url: "https://ekstra.ai/api/developer/cloud/projects", expect: 401, type: "application/json" },
  { label: "developer keys auth boundary", url: "https://ekstra.ai/api/developer/cloud/api-keys", expect: 401, type: "application/json" },
  { label: "developer packages auth boundary", url: "https://ekstra.ai/api/developer/cloud/packages", expect: 401, type: "application/json" },
  {
    label: "developer login validation",
    url: "https://ekstra.ai/api/developer/cloud/login",
    method: "POST",
    body: {},
    expect: 200,
    type: "application/json",
    bodyIncludes: "Valid email address required",
  },
  {
    label: "developer verify validation",
    url: "https://ekstra.ai/api/developer/cloud/verify",
    method: "POST",
    body: {},
    expect: 200,
    type: "application/json",
    bodyIncludes: "Email and verification code are required",
  },
  { label: "build landing", url: "https://ekstra.ai/build-with-ekstra", expect: 200, type: "text/html" },
  { label: "build demo", url: "https://ekstra.ai/build-with-ekstra/demo", expect: 200, type: "text/html" },
  { label: "presentation remote", url: "https://ekstra.ai/build-with-ekstra/presentation-remote", expect: 200, type: "text/html" },
  { label: "controller", url: "https://ekstra.ai/build-with-ekstra/controller", expect: 200, type: "text/html" },
  {
    label: "presentation controller",
    url: "https://ekstra.ai/build-with-ekstra/presentation-controller",
    expect: 200,
    type: "text/html",
  },
  {
    label: "controller qr",
    url: "https://ekstra.ai/build-with-ekstra/qr?data=https%3A%2F%2Fekstra.ai%2Fbuild-with-ekstra%2Fcontroller",
    expect: 200,
    type: "image/png",
  },
  { label: "public demo", url: "https://ekstra.ai/demo", expect: 200, type: "text/html" },
  { label: "os build mode", url: "https://ekstra.ai/OS?from=build", expect: 200, type: "text/html" },
  { label: "status", url: "https://ekstra.ai/status", expect: 200, type: "text/html" },
];

async function checkHttp(check) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(check.url, {
      method: check.method || "GET",
      headers: check.method === "POST" ? { "content-type": "application/json" } : undefined,
      body: check.method === "POST" ? JSON.stringify(check.body || {}) : undefined,
      redirect: "follow",
      signal: controller.signal,
    });
    const type = response.headers.get("content-type") || "";
    const body = check.bodyIncludes ? await response.text() : "";
    const ok =
      response.status === check.expect &&
      type.includes(check.type) &&
      (!check.bodyIncludes || body.includes(check.bodyIncludes));
    console.log(`${ok ? "PASS" : "FAIL"} ${check.label} ${response.status} ${type}`);
    return ok;
  } catch (error) {
    console.log(`FAIL ${check.label} ${error.message}`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function checkWebSocket() {
  return new Promise((resolve) => {
    const ws = new WebSocket("wss://ekstra.ai/ws");
    const timeout = setTimeout(() => {
      console.log("FAIL websocket timeout");
      try {
        ws.close();
      } catch {}
      resolve(false);
    }, 12000);
    ws.addEventListener("open", () => {
      clearTimeout(timeout);
      console.log("PASS websocket open");
      ws.close();
      resolve(true);
    });
    ws.addEventListener("error", () => {
      clearTimeout(timeout);
      console.log("FAIL websocket error");
      resolve(false);
    });
  });
}

let failed = 0;
for (const check of checks) {
  if (!(await checkHttp(check))) failed += 1;
}
if (!(await checkWebSocket())) failed += 1;

if (failed) {
  console.error(`\n${failed} live contract check(s) failed.`);
  process.exit(1);
}

console.log("\nAll Build with Ekstra live contract checks passed.");
