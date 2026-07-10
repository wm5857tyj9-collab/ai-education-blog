const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "content", "posts");
const indexFile = path.join(postsDir, "index.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const entries = fs
  .readdirSync(postsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".json") && entry.name !== "index.json")
  .map((entry) => {
    const article = readJson(path.join(postsDir, entry.name));
    return {
      slug: article.slug || entry.name.replace(/\.json$/, ""),
      title: article.title || "未命名文章",
      date: article.date || "1970-01-01",
      file: entry.name,
    };
  })
  .sort((left, right) => new Date(right.date) - new Date(left.date) || left.slug.localeCompare(right.slug, "zh-CN"));

fs.writeFileSync(indexFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");

console.log(`Wrote ${entries.length} post index entries.`);
