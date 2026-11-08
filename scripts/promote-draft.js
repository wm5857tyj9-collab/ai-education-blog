const fs = require("fs");
const path = require("path");
const { buildIndex } = require("./build-index");
const { validateArticle, validatePosts } = require("./validate-posts");

const projectDir = path.join(__dirname, "..");

function promoteDraft(draftPath, rootDir = projectDir) {
  if (!draftPath) throw new Error("请指定 drafts/slug.json 草稿文件。");
  const root = path.resolve(rootDir);
  const draftsDir = path.join(root, "drafts");
  const resolvedDraft = path.resolve(root, draftPath);
  if (path.dirname(resolvedDraft) !== draftsDir || !resolvedDraft.endsWith(".json")) {
    throw new Error("草稿必须是 drafts/ 目录下的 JSON 文件。");
  }

  const filename = path.basename(resolvedDraft);
  const draft = JSON.parse(fs.readFileSync(resolvedDraft, "utf8"));
  const errors = validateArticle(draft, filename);
  if (errors.length) throw new Error(`草稿校验失败：\n- ${errors.join("\n- ")}`);

  const postsDir = path.join(root, "content", "posts");
  const existingPosts = validatePosts(postsDir);
  if (existingPosts.some(({ article }) => article.slug === draft.slug)) throw new Error(`文章 slug 已存在：${draft.slug}`);

  const destination = path.join(postsDir, filename);
  const indexFile = path.join(root, "content", "posts-index.json");
  fs.writeFileSync(destination, `${JSON.stringify(draft, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  try {
    const entries = buildIndex(postsDir, indexFile);
    return { destination, count: entries.length, slug: draft.slug };
  } catch (error) {
    fs.unlinkSync(destination);
    throw error;
  }
}

if (require.main === module) {
  try {
    const result = promoteDraft(process.argv[2]);
    console.log(`草稿已校验并晋级为正式文章：${result.slug}。当前共 ${result.count} 篇，请检查内容后提交 Git。`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { promoteDraft };
