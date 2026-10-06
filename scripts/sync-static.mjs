import { cp, mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const client = join(root, "source", "dist", "client");
const prerender = join(root, "source", "dist", "server", "prerendered-routes");
const output = join(root, "public");

for (const file of [
  "index.html",
  "index.rsc",
  "404.html",
  "projects/birmarket.html",
  "projects/m10.html",
  "projects/m10/design-strategy.html",
]) {
  const path = join(prerender, file);
  if (!(await stat(path).catch(() => null))?.isFile()) {
    throw new Error(`Missing static page: ${path}`);
  }
}

const html = await readFile(join(prerender, "index.html"), "utf8");
if (!html.includes('aria-label="Draggable card stack"') || html.includes("/Users/")) {
  throw new Error("Static HTML is incomplete or contains a local file path.");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true, filter: (path) => !path.endsWith(".DS_Store") });
await cp(prerender, output, { recursive: true });

const directories = [""];
while (directories.length > 0) {
  const directory = directories.pop();
  for (const entry of await readdir(join(prerender, directory), { withFileTypes: true })) {
    const relative = join(directory, entry.name);
    if (entry.isDirectory()) {
      directories.push(relative);
      continue;
    }
    if (!entry.name.endsWith(".html") || relative === "index.html" || relative === "404.html") continue;

    const route = relative.slice(0, -".html".length);
    const routeDirectory = join(output, route);
    await mkdir(routeDirectory, { recursive: true });
    await cp(join(prerender, relative), join(routeDirectory, "index.html"));

    const rsc = join(prerender, `${route}.rsc`);
    if ((await stat(rsc).catch(() => null))?.isFile()) {
      await cp(rsc, join(routeDirectory, "index.rsc"));
    }
  }
}
console.log(`Updated ${output} from the current source build.`);
