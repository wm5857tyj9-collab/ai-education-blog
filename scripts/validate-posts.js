const fs = require("fs");
const path = require("path");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validateArticle(article, filename) {
  const errors = [];
  const fileSlug = filename.replace(/\.json$/, "");

  if (!article || typeof article !== "object" || Array.isArray(article)) {
    return [`${filename}: 根节点必须是 JSON 对象。`];
  }

  if (!isNonEmptyString(article.slug) || !SLUG_PATTERN.test(article.slug)) {
    errors.push(`${filename}: slug 只能包含小写英文字母、数字和单个连字符。`);
  } else if (article.slug !== fileSlug) {
    errors.push(`${filename}: slug 必须与文件名一致（应为 "${fileSlug}"）。`);
  }
  if (!isNonEmptyString(article.title) || article.title.length > 160) errors.push(`${filename}: title 必填且不能超过 160 个字符。`);
  if (!isValidDate(article.date)) errors.push(`${filename}: date 必须是有效的 YYYY-MM-DD 日期。`);
  if (!Number.isInteger(article.minutes) || article.minutes < 1 || article.minutes > 60) errors.push(`${filename}: minutes 必须是 1 到 60 的整数。`);
  if (!isNonEmptyString(article.category)) errors.push(`${filename}: category 必填。`);
  if (!isNonEmptyString(article.excerpt)) errors.push(`${filename}: excerpt 必填。`);

  if (!Array.isArray(article.tags) || article.tags.length === 0 || article.tags.some((tag) => !isNonEmptyString(tag))) {
    errors.push(`${filename}: tags 必须是至少包含一个非空文本的数组。`);
  } else if (new Set(article.tags.map((tag) => tag.trim())).size !== article.tags.length) {
    errors.push(`${filename}: tags 不能有重复项。`);
  }

  if (!Array.isArray(article.cover) || article.cover.length !== 2 || article.cover.some((color) => typeof color !== "string" || !HEX_COLOR_PATTERN.test(color))) {
    errors.push(`${filename}: cover 必须包含两个 #RRGGBB 颜色值。`);
  }
  if (article.note !== undefined && typeof article.note !== "string") errors.push(`${filename}: note 必须是文本。`);

  if (!Array.isArray(article.sections) || article.sections.length === 0) {
    errors.push(`${filename}: sections 至少需要一个正文分节。`);
  } else {
    article.sections.forEach((section, index) => {
      const label = `${filename}: 第 ${index + 1} 节`;
      if (!section || typeof section !== "object" || Array.isArray(section)) {
        errors.push(`${label}必须是对象。`);
        return;
      }
      if (!isNonEmptyString(section.heading)) errors.push(`${label}缺少 heading。`);
      const paragraphs = section.paragraphs === undefined ? [] : section.paragraphs;
      const bullets = section.bullets === undefined ? [] : section.bullets;
      if (!Array.isArray(paragraphs) || paragraphs.some((text) => !isNonEmptyString(text))) errors.push(`${label}的 paragraphs 必须是非空文本数组。`);
      if (!Array.isArray(bullets) || bullets.some((text) => !isNonEmptyString(text))) errors.push(`${label}的 bullets 必须是非空文本数组。`);
      if (Array.isArray(paragraphs) && Array.isArray(bullets) && !paragraphs.length && !bullets.length) errors.push(`${label}至少需要一个段落或要点。`);
    });
  }

  return errors;
}

function validatePosts(postsDir = path.join(__dirname, "..", "content", "posts")) {
  if (!fs.existsSync(postsDir)) throw new Error(`文章目录不存在：${postsDir}`);
  const files = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => entry.name)
    .sort();
  if (!files.length) throw new Error(`文章目录没有 JSON 文章：${postsDir}`);

  const errors = [];
  const posts = [];
  const slugs = new Set();
  for (const filename of files) {
    let article;
    try {
      article = JSON.parse(fs.readFileSync(path.join(postsDir, filename), "utf8"));
    } catch (error) {
      errors.push(`${filename}: JSON 无法解析（${error.message}）。`);
      continue;
    }
    errors.push(...validateArticle(article, filename));
    if (article && typeof article.slug === "string") {
      if (slugs.has(article.slug)) errors.push(`${filename}: slug "${article.slug}" 重复。`);
      slugs.add(article.slug);
    }
    posts.push({ file: filename, article });
  }
  if (errors.length) throw new Error(`文章校验失败（${errors.length} 项）：\n- ${errors.join("\n- ")}`);
  return posts;
}

if (require.main === module) {
  try {
    const posts = validatePosts(process.argv[2]);
    console.log(`文章校验通过：${posts.length} 篇。`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { validateArticle, validatePosts };
