const assert = require("node:assert/strict");
const test = require("node:test");
const { checkSite } = require("./check-site");

const index = [{ slug: "sample-post", title: "测试文章", file: "sample-post.json" }];
const article = { slug: "sample-post", title: "测试文章" };

function makeFetch({ missingArticle = false } = {}) {
  return async (input) => {
    const url = new URL(input);
    if (url.pathname === "/") return { ok: true, text: async () => "<title>AI 赋能教育</title>" };
    if (url.pathname === "/admin/") return { ok: true, text: async () => '<div id="nc-root"></div>' };
    if (url.pathname === "/content/posts-index.json") return { ok: true, text: async () => JSON.stringify(index) };
    if (url.pathname === "/content/posts/sample-post.json" && !missingArticle) return { ok: true, text: async () => JSON.stringify(article) };
    return { ok: false, status: 404, text: async () => "not found" };
  };
}

test("checks the site and confirms a requested new article is live", async () => {
  const result = await checkSite({ baseUrl: "https://example.test", requiredSlug: "sample-post", fetchImpl: makeFetch() });
  assert.equal(result.count, 1);
});

test("fails when the requested article is absent from the online index", async () => {
  await assert.rejects(checkSite({ baseUrl: "https://example.test", requiredSlug: "missing-post", fetchImpl: makeFetch() }), /未找到新文章/);
});

test("fails when an indexed article cannot be fetched", async () => {
  await assert.rejects(checkSite({ baseUrl: "https://example.test", fetchImpl: makeFetch({ missingArticle: true }) }), /HTTP 404/);
});
