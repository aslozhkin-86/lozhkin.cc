import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + pathname, {
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

test("server-renders the portfolio homepage", async () => {
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
  assert.doesNotMatch(html, /data-birmarket-access-trigger=/);
  assert.doesNotMatch(html, /Enter the password to open this project/);
  assert.match(html, /href="\/projects\/birmarket"/);
  assert.match(html, /Helped launch m10 and scale it/);
  assert.match(html, /href="\/projects\/m10"/);
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
  assert.doesNotMatch(html, /I’m a designer, and I like getting my hands into the work/);
  assert.doesNotMatch(html, /How I work/);
  assert.doesNotMatch(html, /id="approach"/);
  assert.equal((html.match(/data-approach-card=/g) ?? []).length, 0);
  assert.doesNotMatch(html, /data-typewriter-character/);
  assert.equal((html.match(/data-card-id=/g) ?? []).length, 3);
  assert.equal((html.match(/data-speaking-card-id=/g) ?? []).length, 5);
  assert.equal((html.match(/data-sticker-id=/g) ?? []).length, 6);
  assert.equal((html.match(/data-company-id=/g) ?? []).length, 6);
  assert.equal((html.match(/data-project-teaser=/g) ?? []).length, 3);
  assert.doesNotMatch(html, /data-project-image-id=/);
});

test("server-renders the m10 case page without the home contact footer", async () => {
  const response = await render("/projects/m10");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Digital wallet m10/);
  assert.match(html, /Tracked results/);
  assert.match(html, /Mentions/);
  assert.equal((html.match(/data-project-case-card=/g) ?? []).length, 4);
  assert.match(html, /Simplicity as a Strategy: Turning Limited Resources into a Market-Recognised Product/);
  assert.match(html, /Card that gives you nothing but fun/);
  assert.match(html, /Visual Brand Refresh and the Creation of a Unified Product Brand System/);
  assert.match(html, /How I Secured Dedicated Engineering Resources for Customer-Critical Projects — and Cut Call Center Contacts by 46%/);
  assert.match(html, /projects\/m10\/design-strategy.png/);
  assert.match(html, /projects\/m10\/digital-card-case.png/);
  assert.match(html, /projects\/m10\/brand-update.png/);
  assert.match(html, /projects\/m10\/love-to-pay.png/);
  assert.match(html, /projects\/m10\/app-store-award.svg/);
  assert.doesNotMatch(html, /data-m10-proof-card-id=/);
  assert.doesNotMatch(html, /m10 is a digital wallet built for everyday payments/);
  assert.match(html, /© Alexander Lozhkin/);
  assert.doesNotMatch(html, /Hey, let/);
});

test("server-renders the Birmarket case without store proof or mentions", async () => {
  const response = await render("/projects/birmarket");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Birmarket marketplace/);
  assert.match(html, /Head of design/);
  assert.match(html, /Project results/);
  assert.doesNotMatch(html, /16% higher add-to-cart conversion/);
  assert.doesNotMatch(html, /30 to 87 items per minute/);
  assert.match(html, /share selected results/);
  assert.equal((html.match(/<dialog/g) ?? []).length, 0);
  assert.equal((html.match(/data-project-case-card=/g) ?? []).length, 2);
  assert.doesNotMatch(html, /App of the Day/);
  assert.doesNotMatch(html, /Ratings checked/);
  assert.doesNotMatch(html, /Mentions/);
  assert.doesNotMatch(html, /Hey, let/);
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


test("earlier projects are display cards without navigation or status icons", async () => {
  const home = await (await render()).text();
  const section = home.match(/<section[^>]*id="other-projects"[\s\S]*?<\/section>/)?.[0];
  assert.ok(section);
  assert.equal((section.match(/data-project-case-card=/g) ?? []).length, 6);
  assert.doesNotMatch(section, /<a\b/);
  assert.doesNotMatch(section, /projects\/shared\/(arrow-link|lock)\.svg/);
  for (const id of ["dolfin-portfolio", "dolfin-crm", "bright-view", "bright-view-data", "yandex-maps", "dota"]) {
    assert.ok(section.includes(`id="${id}"`));
  }
});


test("Birmarket case cards remain visible without publishing their pages", async () => {
  const overview = await (await render("/projects/birmarket")).text();
  assert.match(overview, /Breaking the inertia: turning scattered effort into visible change/);
  assert.match(overview, /Marketplace Vision 2027/);
  assert.match(overview, /projects\/birmarket\/vision-2027.png/);
  assert.match(overview, /projects\/shared\/lock.svg/);
  assert.doesNotMatch(overview, /href="\/projects\/birmarket\/(breaking-the-inertia|vision-2027)"/);
  assert.doesNotMatch(overview, /Unlock case study/);
  assert.doesNotMatch(overview, /Warehouse operator workstation/);
  assert.equal((await render("/projects/birmarket/breaking-the-inertia")).status, 404);
  assert.equal((await render("/projects/birmarket/vision-2027")).status, 404);
});


test("m10 case cards stay locked", async () => {
  const m10 = await (await render("/projects/m10")).text();
  assert.doesNotMatch(m10, /href="\/projects\/m10\/design-strategy"/);
});
