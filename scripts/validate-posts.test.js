const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { buildIndex } = require("./build-index");
const { validatePosts } = require("./validate-posts");

function makePost(overrides = {}) {
  return {
    slug: "sample-post",
    title: "一篇测试文章",
    date: "2026-11-08",
    minutes: 5,
    category: "教学设计",
    excerpt: "这是用于校验的文章摘要。",
    tags: ["AI教育"],
    cover: ["#0d6b7a", "#18a0b6"],
    sections: [{ heading: "正文", paragraphs: ["正文段落。"], bullets: [] }],
    ...overrides,
  };
}

function withPosts(posts, callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "blog-posts-"));
  try {
    for (const [filename, article] of Object.entries(posts)) fs.writeFileSync(path.join(directory, filename), article, "utf8");
    callback(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test("accepts a valid independent article file", () => {
  withPosts({ "sample-post.json": JSON.stringify(makePost()) }, (directory) => assert.equal(validatePosts(directory).length, 1));
});

test("rejects a slug that does not match the article filename", () => {
  withPosts({ "other-name.json": JSON.stringify(makePost()) }, (directory) => assert.throws(() => validatePosts(directory), /slug 必须与文件名一致/));
});

test("rejects invalid dates and empty sections", () => {
  const invalid = makePost({ date: "2026-02-30", sections: [{ heading: "空节", paragraphs: [], bullets: [] }] });
  withPosts({ "sample-post.json": JSON.stringify(invalid) }, (directory) => {
    assert.throws(() => validatePosts(directory), /date 必须是有效的/);
    assert.throws(() => validatePosts(directory), /至少需要一个段落或要点/);
  });
});

test("rejects malformed JSON instead of building a partial index", () => {
  withPosts({ "broken.json": "{not json" }, (directory) => assert.throws(() => validatePosts(directory), /JSON 无法解析/));
});

test("keeps the existing index unchanged when article validation fails", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-build-"));
  const postsDir = path.join(root, "posts");
  const indexFile = path.join(root, "posts-index.json");
  fs.mkdirSync(postsDir);
  fs.writeFileSync(path.join(postsDir, "broken.json"), "{not json", "utf8");
  fs.writeFileSync(indexFile, "previous-good-index", "utf8");
  try {
    assert.throws(() => buildIndex(postsDir, indexFile), /JSON 无法解析/);
    assert.equal(fs.readFileSync(indexFile, "utf8"), "previous-good-index");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("orders same-day series entries by descending series number", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-sort-"));
  const postsDir = path.join(root, "posts");
  const indexFile = path.join(root, "posts-index.json");
  fs.mkdirSync(postsDir);
  try {
    for (const slug of ["workbuddy-education-01", "workbuddy-education-02"]) {
      fs.writeFileSync(path.join(postsDir, `${slug}.json`), JSON.stringify(makePost({ slug })), "utf8");
    }
    const entries = buildIndex(postsDir, indexFile);
    assert.deepEqual(entries.map((entry) => entry.slug), ["workbuddy-education-02", "workbuddy-education-01"]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
