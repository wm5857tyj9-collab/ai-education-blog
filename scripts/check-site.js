const DEFAULT_SITE_URL = "https://elaborate-halva-b6a69f.netlify.app";

async function readText(url, fetchImpl) {
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${url} 返回 HTTP ${response.status}`);
  return response.text();
}

async function readJson(url, fetchImpl) {
  const text = await readText(url, fetchImpl);
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${url} 不是有效 JSON：${error.message}`);
  }
}

async function checkSite({ baseUrl = process.env.SITE_URL || DEFAULT_SITE_URL, requiredSlug = "", fetchImpl = fetch } = {}) {
  const base = new URL(baseUrl);
  const home = await readText(new URL("/", base), fetchImpl);
  if (!home.includes("AI 赋能教育")) throw new Error("首页未找到博客标题。");

  const admin = await readText(new URL("/admin/", base), fetchImpl);
  if (!admin.includes("nc-root")) throw new Error("后台入口页面缺少 CMS 挂载节点。");

  const indexUrl = new URL("/content/posts-index.json", base);
  const index = await readJson(indexUrl, fetchImpl);
  if (!Array.isArray(index) || !index.length) throw new Error("线上文章索引为空或格式错误。");
  if (requiredSlug && !index.some((entry) => entry.slug === requiredSlug)) {
    throw new Error(`线上文章索引中未找到新文章：${requiredSlug}`);
  }

  await Promise.all(index.map(async (entry) => {
    if (!entry || typeof entry.slug !== "string" || typeof entry.title !== "string" || typeof entry.file !== "string" || !/^[a-z0-9-]+\.json$/.test(entry.file)) {
      throw new Error("线上文章索引中存在无效条目。");
    }
    const articleUrl = new URL(`/content/posts/${entry.file}`, base);
    const article = await readJson(articleUrl, fetchImpl);
    if (article.slug !== entry.slug || article.title !== entry.title) throw new Error(`线上索引与文章内容不一致：${entry.slug}`);
  }));

  return { count: index.length, baseUrl: base.origin };
}

if (require.main === module) {
  const [, , baseUrl, requiredSlug] = process.argv;
  checkSite({ baseUrl, requiredSlug })
    .then(({ count, baseUrl: site }) => console.log(`线上检查通过：${site}，主页、后台、${count} 篇文章及索引均可访问。`))
    .catch((error) => {
      console.error(`线上检查失败：${error.message}`);
      process.exitCode = 1;
    });
}

module.exports = { checkSite };
