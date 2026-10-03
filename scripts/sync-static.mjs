import { cp, mkdir, readFile, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const client = join(root, "source", "dist", "client");
const prerender = join(root, "source", "dist", "server", "prerendered-routes");
const output = join(root, "public");

for (const file of ["index.html", "index.rsc", "404.html"]) {
  const path = join(prerender, file);
  if (!(await stat(path).catch(() => null))?.isFile()) {
    throw new Error(`Missing static page: ${path}`);
  }
}

const html = await readFile(join(prerender, "index.html"), "utf8");
if (!html.includes('data-approach-card="intro"') || html.includes("/Users/")) {
  throw new Error("Static HTML is incomplete or contains a local file path.");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true, filter: (path) => !path.endsWith(".DS_Store") });
for (const file of ["index.html", "index.rsc", "404.html"]) {
  await cp(join(prerender, file), join(output, file));
}
console.log(`Updated ${output} from the current source build.`);
