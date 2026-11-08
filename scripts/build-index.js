const fs = require("fs");
const path = require("path");
const { validatePosts } = require("./validate-posts");

const postsDir = path.join(__dirname, "..", "content", "posts");
const indexFile = path.join(__dirname, "..", "content", "posts-index.json");

function getEntries(sourceDir = postsDir) {
  return validatePosts(sourceDir)
    .map(({ file, article }) => ({
      slug: article.slug,
      title: article.title,
      date: article.date,
      file,
    }))
    .sort((left, right) => new Date(right.date) - new Date(left.date) || right.slug.localeCompare(left.slug, "zh-CN"));
}

function buildIndex(sourceDir = postsDir, outputFile = indexFile) {
  const entries = getEntries(sourceDir);
  fs.writeFileSync(outputFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  return entries;
}

function checkIndex(sourceDir = postsDir, outputFile = indexFile) {
  const expected = `${JSON.stringify(getEntries(sourceDir), null, 2)}\n`;
  let actual;
  try {
    actual = fs.readFileSync(outputFile, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") throw new Error(`文章索引不存在：${outputFile}。请运行 node scripts/build-index.js。`);
    throw error;
  }
  if (actual !== expected) throw new Error(`文章索引与文章文件不一致：${outputFile}。请运行 node scripts/build-index.js 并提交更新后的索引。`);
  return getEntries(sourceDir);
}

if (require.main === module) {
  try {
    const checkOnly = process.argv.includes("--check");
    const entries = checkOnly ? checkIndex() : buildIndex();
    const action = checkOnly ? "checked" : "wrote";
    console.log(`Validated ${entries.length} posts and ${action} ${path.relative(process.cwd(), indexFile)}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { buildIndex, checkIndex, getEntries };
