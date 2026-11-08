const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { buildIndex } = require("./build-index");
const { promoteDraft } = require("./promote-draft");

function makePost(slug, overrides = {}) {
  return {
    slug,
    title: `文章 ${slug}`,
    date: "2026-11-08",
    minutes: 5,
    category: "教学设计",
    excerpt: "用于流程测试的摘要。",
    tags: ["AI教育"],
    cover: ["#0d6b7a", "#18a0b6"],
    sections: [{ heading: "正文", paragraphs: ["文章内容。"], bullets: [] }],
    ...overrides,
  };
}

function makeProject(posts = [], drafts = []) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-promote-"));
  const postsDir = path.join(root, "content", "posts");
  const draftsDir = path.join(root, "drafts");
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(draftsDir);
  for (const article of posts) fs.writeFileSync(path.join(postsDir, `${article.slug}.json`), JSON.stringify(article), "utf8");
  for (const article of drafts) fs.writeFileSync(path.join(draftsDir, `${article.slug}.json`), JSON.stringify(article), "utf8");
  buildIndex(postsDir, path.join(root, "content", "posts-index.json"));
  return root;
}

test("promotes a valid draft and rebuilds the index without deleting the draft", () => {
  const root = makeProject([makePost("existing-post")], [makePost("new-post")]);
  try {
    const result = promoteDraft("drafts/new-post.json", root);
    assert.equal(result.count, 2);
    assert.equal(fs.existsSync(path.join(root, "content", "posts", "new-post.json")), true);
    assert.equal(fs.existsSync(path.join(root, "drafts", "new-post.json")), true);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, "content", "posts-index.json"), "utf8")).map((entry) => entry.slug), ["new-post", "existing-post"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("rejects invalid drafts without changing the index", () => {
  const root = makeProject([makePost("existing-post")], [makePost("invalid-post", { tags: [] })]);
  const indexFile = path.join(root, "content", "posts-index.json");
  const previousIndex = fs.readFileSync(indexFile, "utf8");
  try {
    assert.throws(() => promoteDraft("drafts/invalid-post.json", root), /草稿校验失败/);
    assert.equal(fs.existsSync(path.join(root, "content", "posts", "invalid-post.json")), false);
    assert.equal(fs.readFileSync(indexFile, "utf8"), previousIndex);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("rejects duplicate slugs and paths outside the drafts directory", () => {
  const root = makeProject([makePost("existing-post")], [makePost("existing-post")]);
  try {
    assert.throws(() => promoteDraft("drafts/existing-post.json", root), /slug 已存在/);
    assert.throws(() => promoteDraft("content/posts/existing-post.json", root), /必须是 drafts\/ 目录下/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
