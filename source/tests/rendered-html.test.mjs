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
  assert.match(html, /aria-label="Main navigation"/);
  assert.match(html, /Hi! I am Alex/);
  assert.match(html, /Superpowers/);
  assert.match(html, /id="birmarket-2027"/);
  assert.match(html, /homepage\/birmarket\/vision-2027\/catalog\.png/);
  assert.match(html, /homepage\/birmarket\/vision-2027\/hero\.mp4/);
  assert.match(html, /homepage\/birmarket\/vision-2027\/play\.svg/);
  assert.match(html, /aria-label="Play Birmarket 2027 concept video"/);
  assert.match(html, /homepage\/birmarket\/vision-2027\/listing-promo\.mp4/);
  assert.match(html, /homepage\/birmarket\/checkout-demo\.mp4/);
  assert.match(html, /homepage\/birmarket\/vision-2027\/cart-snippets\.png/);
  assert.ok(html.indexOf('alt="Alexander Lozhkin"') < html.indexOf('id="birmarket-2027"'));
  assert.ok(html.indexOf('id="superpowers-title"') < html.indexOf('id="birmarket-2027"'));
  assert.ok(html.indexOf('aria-label="Featured projects"') < html.indexOf('id="birmarket-2027"'));
  assert.ok(html.indexOf('id="birmarket-2027"') < html.indexOf('id="birmarket-feature-title"'));
  assert.ok(html.indexOf('id="birmarket-feature-title"') < html.indexOf('id="birmarket-audit-title"'));
  assert.ok(html.indexOf('id="birmarket-audit-title"') < html.indexOf('id="m10"'));
  assert.ok(html.indexOf('id="birmarket-2027"') < html.indexOf('id="m10"'));
  assert.ok(html.indexOf('id="m10"') < html.indexOf('id="yandex-market"'));
  assert.doesNotMatch(html, /Scope &amp; Scale/);
  assert.doesNotMatch(html, /Alexander-Lozhkin-CV\.pdf/);
  assert.match(html, /Featured projects/);
  assert.match(html, /Brand refresh for Birmarket/);
  assert.match(html, /Birmarket: from audit to action/);
  assert.match(html, /We audited the main shopping journeys/);
  assert.match(html, /homepage\/birmarket\/audit-teaser\.png/);
  assert.match(html, /aria-haspopup="dialog"[^>]*>old logo<\/button> got lost in ads/);
  assert.match(html, /<dialog[^>]+id="birmarket-old-logo-gallery"/);
  for (const name of ["campaign", "wordmark", "advert", "app", "promotion"]) {
    assert.match(html, new RegExp(`homepage/birmarket/old-logo-${name}\\.jpg`));
  }
  for (const name of ["new-logo", "sale", "old-app", "toys", "med", "tools", "bike", "food", "home", "wear", "cosm", "wash", "comp"]) {
    assert.match(html, new RegExp(`homepage/birmarket/${name}\\.png`));
  }
  assert.match(html, /homepage\/birmarket\/brand-billboard\.jpg/);
  assert.match(html, /Strengthening the brand’s presence/);
  assert.match(html, /aria-pressed="true"[^>]*>Old<\/button>/);
  assert.match(html, /aria-pressed="false"[^>]*>New<\/button>/);
  assert.match(html, /homepage\/birmarket\/cloth-drop\.mp4/);
  assert.match(html, /homepage\/yandex\/delivery-icon\.svg/);
  assert.ok(html.indexOf('alt="Birmarket winter campaign') < html.indexOf('alt="Old pink Birmarket icon'));
  assert.ok(html.indexOf('alt="Old pink Birmarket icon') < html.indexOf("Strengthening the brand’s presence"));
  assert.ok(html.indexOf("Strengthening the brand’s presence") < html.indexOf("Consistent style and creation rules for 3D product imagery"));
  assert.doesNotMatch(html, /homepage\/birmarket\/brand-catalog\.png/);
  assert.match(html, /<section[^>]+id="birmarket"/);
  assert.doesNotMatch(html, /data-birmarket-access-trigger=/);
  assert.doesNotMatch(html, /Enter the password to open this project/);
  assert.match(html, /href="\/projects\/birmarket\/breaking-the-inertia"/);
  assert.equal((html.match(/href="\/projects\/birmarket\/breaking-the-inertia"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /projects\/whiteboard\/yandex-market-teaser\.png/);
  assert.doesNotMatch(html, /Case in progress/);
  assert.match(html, /id="other-projects"/);
  assert.match(html, /id="speaking-title"/);
  assert.match(html, /alt="Alexander Lozhkin"/);
  assert.doesNotMatch(html, /id="approach"/);
  assert.ok(html.indexOf('id="birmarket"') < html.indexOf('id="m10"'));
  assert.ok(html.indexOf('id="birmarket-feature-title"') < html.indexOf('id="birmarket-audit-title"'));
  assert.ok(html.indexOf('id="birmarket-audit-title"') < html.indexOf('id="m10"'));
  assert.ok(html.indexOf('id="m10"') < html.indexOf('id="company-history-title"'));
});

test("server-renders the m10 case page without the home contact footer", async () => {
  const response = await render("/projects/m10");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Digital wallet m10/);
  assert.match(html, /Measurable results/);
  assert.match(html, /Mentions/);
  assert.match(html, /Simplicity as a solution/);
  assert.match(html, /Card that gives you nothing but fun/);
  assert.match(html, /A unified product brand/);
  assert.match(html, /Customer-critical projects/);
  assert.match(html, /projects\/m10\/hero-project\.jpg/);
  assert.match(html, /projects\/m10\/design-strategy.png/);
  assert.match(html, /projects\/m10\/digital-card-case.png/);
  assert.match(html, /projects\/m10\/brand-update.png/);
  assert.match(html, /projects\/m10\/love-to-pay.png/);
  assert.match(html, /projects\/m10\/app-store-award.svg/);
  assert.doesNotMatch(html, /data-m10-proof-card-id=/);
  assert.doesNotMatch(html, /m10 is a digital wallet built for everyday payments/);
  assert.match(html, /© Lozhkin/);
  assert.doesNotMatch(html, /Hey, let/);
});

test("server-renders the Birmarket role page without an image hero or case cards", async () => {
  const response = await render("/projects/birmarket");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<h1[^>]*>Birmarket, Head of design<\/h1>/);
  assert.match(html, /aria-label="Back to Birmarket on the homepage"/);
  assert.match(html, /Project results/);
  assert.doesNotMatch(html, /16% higher add-to-cart conversion/);
  assert.doesNotMatch(html, /30 to 87 items per minute/);
  assert.match(html, /share selected results/);
  assert.equal((html.match(/<dialog/g) ?? []).length, 0);
  assert.doesNotMatch(html, /projects\/birmarket\/hero-project\.jpg/);
  assert.doesNotMatch(html, /id="breaking-the-inertia"|id="vision"/);
  assert.doesNotMatch(html, /projects\/birmarket\/vision-2027\.png/);
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
  assert.match(html, />Email<\/span>/);
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
  assert.equal((section.match(/<article\b/g) ?? []).length, 6);
  assert.doesNotMatch(section, /<a\b/);
  assert.doesNotMatch(section, /projects\/shared\/(arrow-link|lock)\.svg/);
  for (const id of ["dolfin-portfolio", "dolfin-crm", "bright-view", "bright-view-data", "yandex-maps", "dota"]) {
    assert.ok(section.includes(`id="${id}"`));
  }
});


test("the Birmarket article remains available from the homepage", async () => {
  const overview = await (await render("/projects/birmarket")).text();
  assert.doesNotMatch(overview, /How design sped up company transformation/);
  assert.doesNotMatch(overview, /projects\/birmarket\/vision-2027.png/);
  assert.doesNotMatch(overview, /href="\/projects\/birmarket\/breaking-the-inertia"/);
  assert.doesNotMatch(overview, /href="\/projects\/birmarket\/vision-2027"/);
  assert.doesNotMatch(overview, /Unlock case study|Enter the password/);
  assert.doesNotMatch(overview, /Warehouse operator workstation/);

  const article = await render("/projects/birmarket/breaking-the-inertia");
  assert.equal(article.status, 200);
  const html = await article.text();
  assert.match(html, /href="\/#birmarket"/);
  assert.match(html, /Birmarket had strong traffic, but too few visits turned into completed orders/);
  assert.doesNotMatch(html, /7 percentage points|500 responses|Image placeholder/);
  assert.match(html, /600 responses/);
  assert.match(html, /6 min reading/);
  assert.match(html, /Business goal — fix unit economics/);
  assert.match(html, /Measured results/);
  assert.match(html, /This is a recent project, so I can’t share detailed results publicly yet/);
  assert.match(html, /\/projects\/birmarket\/inertia\/results-lock\.svg/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /Results coming soon|View full-size image/);
  assert.equal((html.match(/<figure\b/g) ?? []).length, 9);
  assert.equal((html.match(/data-case-block="big-image"/g) ?? []).length, 5);
  assert.equal((html.match(/data-case-block="text-image"/g) ?? []).length, 5);
  assert.equal((html.match(/data-case-block="paragraph"/g) ?? []).length, 13);
  assert.equal((html.match(/data-case-block="feature"/g) ?? []).length, 1);
  assert.match(html, /<h3 id="understand-the-problem">Understand the problem<\/h3>/);
  assert.match(html, /\/projects\/birmarket\/inertia\/research-visual\.jpg/);
  assert.match(html, /\/projects\/birmarket\/inertia\/impact-effort-matrix\.png/);
  assert.match(html, /\/projects\/birmarket\/inertia\/brand-transition\.png/);
  assert.doesNotMatch(html, /homepage-results/);
  assert.doesNotMatch(html, /\/projects\/birmarket\/inertia\/[^"\s]+\.webp/);
  assert.equal((await render("/projects/birmarket/vision-2027")).status, 404);
});


test("m10 case cards stay locked", async () => {
  const m10 = await (await render("/projects/m10")).text();
  assert.doesNotMatch(m10, /href="\/projects\/m10\/design-strategy"/);
});

test("public pages expose self canonicals and a factual person identity", async () => {
  for (const pathname of [
    "/",
    "/work",
    "/about",
    "/speaking",
    "/contact",
    "/projects/birmarket",
    "/projects/birmarket/breaking-the-inertia",
    "/projects/m10",
  ]) {
    const html = await (await render(pathname)).text();
    const canonical = `https://lozhkin.cc${pathname === "/" ? "" : pathname}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"\\s*/>`));
    const jsonLd = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
    assert.ok(jsonLd, `${pathname} should contain Person JSON-LD`);
    const person = JSON.parse(jsonLd);
    assert.equal(person["@type"], "Person");
    assert.equal(person.name, "Alexander Lozhkin");
    assert.equal(person.url, "https://lozhkin.cc/");
    assert.deepEqual(person.sameAs, ["https://www.linkedin.com/in/alexanderlozhkin/"]);
  }
});

test("the unlinked m10 prototype does not compete with public cases in search", async () => {
  const html = await (await render("/projects/m10/design-strategy")).text();
  assert.match(html, /<meta name="robots" content="noindex, nofollow"\s*\/>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/lozhkin.cc\/projects\/m10\/design-strategy"\s*\/>/);
});

test("discovery files list only released site pages", async () => {
  const { readFile } = await import("node:fs/promises");
  const robots = await readFile(new URL("../dist/client/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../dist/client/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Sitemap: https:\/\/lozhkin.cc\/sitemap.xml$/m);
  for (const pathname of ["/", "/work", "/about", "/speaking", "/contact", "/projects/birmarket", "/projects/birmarket/breaking-the-inertia", "/projects/m10"]) {
    assert.ok(sitemap.includes(`<loc>https://lozhkin.cc${pathname}</loc>`));
  }
  assert.doesNotMatch(sitemap, /playground|design-strategy|vision-2027/);
});

test("the homepage navigation links to four readable pages", async () => {
  const home = await (await render()).text();
  assert.match(home, /aria-label="Main navigation"/);
  assert.doesNotMatch(home, /<dialog[^>]+id="site-menu"/);
  assert.match(home, /href="\/work"[^>]*>For agents<\/a>/);
  assert.match(home, /href="\/contact"[^>]*>Contact<\/a>/);
  for (const pathname of ["/work", "/about", "/speaking", "/contact"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    assert.match(html, /href="\/"[^>]*>← Home<\/a>/);
    assert.match(html, /aria-label="Portfolio pages"/);
    assert.equal((html.match(/aria-current="page"/g) ?? []).length, 1);
    assert.match(html, /<h1[^>]*>/);
  }
  const work = await (await render("/work")).text();
  assert.match(work, /<h1>Projects over time<\/h1>/);
  assert.match(work, /href="\/work" aria-current="page">Work<\/a>/);
  assert.equal((work.match(/<li\b/g) ?? []).length, 47);
  assert.match(work, /<h2 id="year-2026">2026<\/h2>/);
  assert.match(work, /<h2 id="year-2011">2011<\/h2>/);
  assert.ok(work.indexOf('id="year-2026"') < work.indexOf('id="year-2011"'));
  assert.match(work, /product page, cart and checkout redesign/);
  assert.match(work, /City entertainment portal centred on discussion forums and video/);
  assert.doesNotMatch(work, /href="\/projects\//);
});
