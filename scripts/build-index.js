const fs = require("fs");
const path = require("path");
const { validatePosts } = require("./validate-posts");

const postsDir = path.join(__dirname, "..", "content", "posts");
const indexFile = path.join(__dirname, "..", "content", "posts-index.json");

function buildIndex(sourceDir = postsDir, outputFile = indexFile) {
  const entries = validatePosts(sourceDir)
    .map(({ file, article }) => ({
      slug: article.slug,
      title: article.title,
      date: article.date,
      file,
    }))
    .sort((left, right) => new Date(right.date) - new Date(left.date) || right.slug.localeCompare(left.slug, "zh-CN"));

  fs.writeFileSync(outputFile, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  return entries;
}

if (require.main === module) {
  try {
    const entries = buildIndex();
    console.log(`Validated ${entries.length} posts and wrote ${path.relative(process.cwd(), indexFile)}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { buildIndex };
