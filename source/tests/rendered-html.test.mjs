import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio placeholder", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Alexander Lozhkin/);
  assert.match(html, /Draggable card stack/);
  assert.match(html, /Approach/);
  assert.match(html, /Draggable tool icons/);
  assert.match(html, /I make room for honest conversations/);
  assert.match(html, /Download CV/);
  assert.match(html, /swipe right/);
  assert.match(html, /Thanks for the room to try/);
  assert.match(html, /Where I grew from designer to manager/);
  assert.match(html, /And here a few cases/);
  assert.match(html, /Design strategy, brand update/);
  assert.match(html, /Launched the m10 digital wallet/);
  assert.match(html, /Redesigned the Yandex Market shopping experience/);
  assert.match(html, /Show other projects/);
  assert.doesNotMatch(html, /This year I finally felt the shift/);
  assert.doesNotMatch(html, /Agents prefer/);
  assert.match(html, /I speak at conferences and meetups/);
  assert.match(html, /how branding becomes part of the product experience/);
  assert.match(html, /Looking for a speaker\? Let’s talk/);
  assert.match(html, /Watch my talk about brand in product/);
  assert.match(html, /youtube\.com\/live\/O_4V_bdwSB8/);
  assert.match(html, /Alexander speaking at a presentation/);
  assert.match(html, /Portrait of Alexander/);
  assert.match(html, /I’m a designer, and I like getting my hands into the work/);
  assert.match(html, /Make something real enough to test/);
  assert.equal((html.match(/data-approach-card=/g) ?? []).length, 4);
  assert.match(html, /Discover, build, learn/);
  assert.doesNotMatch(html, /data-typewriter-character/);
  assert.equal((html.match(/data-card-id=/g) ?? []).length, 3);
  assert.equal((html.match(/data-speaking-card-id=/g) ?? []).length, 5);
  assert.equal((html.match(/data-sticker-id=/g) ?? []).length, 6);
  assert.equal((html.match(/data-company-id=/g) ?? []).length, 6);
  assert.equal((html.match(/data-project-teaser=/g) ?? []).length, 3);
  assert.doesNotMatch(html, /data-project-image-id=/);
});

test("exposes the header contact links", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /linkedin\.com\/in\/alexanderlozhkin/);
  assert.match(html, /t\.me\/Leshey/);
  assert.match(html, />Email<\/a>/);
  assert.match(html, /mailto:a\.s\.lozhkin@gmail\.com/);
});

test("serves the extensionless Vite client needed for local interactions", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const assetRequests = [];
  const response = await worker.fetch(
    new Request("http://localhost/@vite/client"),
    {
      ASSETS: {
        fetch: async (request) => {
          assetRequests.push(new URL(request.url).pathname);
          return new Response("export {};", {
            headers: { "content-type": "text/javascript" },
          });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /javascript/);
  assert.deepEqual(assetRequests, ["/@vite/client"]);
});
