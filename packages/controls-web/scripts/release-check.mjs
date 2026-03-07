import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageDir = path.resolve(__dirname, "..");
const packageJsonPath = path.join(packageDir, "package.json");
const readmePath = path.join(packageDir, "README.md");
const changelogPath = path.join(packageDir, "CHANGELOG.md");
const distIndexPath = path.join(packageDir, "dist", "index.js");
const distTypesPath = path.join(packageDir, "dist", "index.d.ts");

function fail(message) {
  console.error(`release-check failed: ${message}`);
  process.exit(1);
}

function ensure(condition, message) {
  if (!condition) {
    fail(message);
  }
}

const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));

ensure(pkg.name === "@ekstraai/controls-web", "package name must remain @ekstraai/controls-web");
ensure(typeof pkg.version === "string" && pkg.version.length > 0, "package version is missing");
ensure(pkg.private === false, "package must be publishable");
ensure(pkg.type === "module", "package must be ESM");
ensure(pkg.publishConfig?.access === "public", "publishConfig.access must be public");
ensure(Array.isArray(pkg.files) && pkg.files.includes("dist"), "package files must include dist");
ensure(pkg.files.includes("CHANGELOG.md"), "package files must include CHANGELOG.md");
ensure(existsSync(readmePath), "README.md is missing");
ensure(existsSync(changelogPath), "CHANGELOG.md is missing");
ensure(existsSync(distIndexPath), "dist/index.js is missing. Run npm run build");
ensure(existsSync(distTypesPath), "dist/index.d.ts is missing. Run npm run build");

const readme = readFileSync(readmePath, "utf8");
ensure(readme.includes("@ekstraai/controls-web"), "README must mention package name");

const moduleNs = await import(pathToFileURL(distIndexPath).href);
const {
  controlProfiles,
  supportedControlProfiles,
  previewControlProfiles,
  experimentalControlProfiles,
  getControlProfile,
  pointerBasic,
  presentationRemote,
} = moduleNs;

ensure(Array.isArray(controlProfiles) && controlProfiles.length >= 2, "controlProfiles export is invalid");
ensure(typeof getControlProfile === "function", "getControlProfile export is missing");
ensure(pointerBasic?.id === "pointer.basic", "pointerBasic export is invalid");
ensure(
  presentationRemote?.id === "presentation.remote",
  "presentationRemote export is invalid",
);
ensure(
  supportedControlProfiles.some((profile) => profile.id === "pointer.basic"),
  "supported profiles must include pointer.basic",
);
ensure(
  supportedControlProfiles.some((profile) => profile.id === "presentation.remote"),
  "supported profiles must include presentation.remote",
);
ensure(
  previewControlProfiles.every((profile) => profile.stability === "preview"),
  "previewControlProfiles contains non-preview entries",
);
ensure(
  experimentalControlProfiles.every((profile) => profile.stability === "experimental"),
  "experimentalControlProfiles contains non-experimental entries",
);
ensure(
  getControlProfile("pointer.basic")?.starter?.slug === "web-phone-pointer",
  "pointer.basic starter metadata is invalid",
);
ensure(
  getControlProfile("presentation.remote")?.starter?.slug === "presentation-remote",
  "presentation.remote starter metadata is invalid",
);

const isPrerelease = pkg.version.includes("-");
const releaseTag = isPrerelease ? "preview" : "latest";

console.log(
  JSON.stringify(
    {
      package: pkg.name,
      version: pkg.version,
      releaseTag,
      supportedProfiles: supportedControlProfiles.map((profile) => profile.id),
      previewProfiles: previewControlProfiles.map((profile) => profile.id),
    },
    null,
    2,
  ),
);

