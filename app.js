const CONTENT_REPO = "wm5857tyj9-collab/ai-education-blog";
const CONTENT_BRANCH = "master";
const CONTENT_DIR = "content/posts";
const CONTENT_API = `https://api.github.com/repos/${CONTENT_REPO}/contents/${CONTENT_DIR}?ref=${CONTENT_BRANCH}`;

const state = {
  articles: [],
  loading: true,
  error: "",
  search: "",
  focusTag: "",
  route: "home",
  slug: "",
};

const app = document.getElementById("app");
const searchInput = document.getElementById("global-search");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

function normalizeArticle(article) {
  const cover = safeArray(article.cover, ["#0d6b7a", "#18a0b6"]);

  return {
    slug: article.slug || "",
    title: article.title || "未命名文章",
    date: article.date || new Date().toISOString().slice(0, 10),
    minutes: Number(article.minutes) || 5,
    category: article.category || "未分类",
    excerpt: article.excerpt || "",
    tags: safeArray(article.tags),
    cover: cover.length >= 2 ? cover.slice(0, 2) : ["#0d6b7a", "#18a0b6"],
    note: article.note || "",
    sections: safeArray(article.sections).map((section) => ({
      heading: section.heading || "",
      paragraphs: safeArray(section.paragraphs),
      bullets: safeArray(section.bullets),
    })),
  };
}

function getRoute() {
  const hash = (location.hash || "#/home").replace(/^#/, "");
  const [path, query = ""] = hash.split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(query);

  if (parts[0] === "article" && parts[1]) {
    return { route: "article", slug: decodeURIComponent(parts[1]), params };
  }

  if (parts[0] === "tags") {
    return { route: "tags", slug: decodeURIComponent(parts[1] || ""), params };
  }

  if (parts[0] === "about") {
    return { route: "about", params };
  }

  return { route: "home", params };
}

function formatDate(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatMinutes(minutes) {
  return `${minutes} 分钟`;
}

function getArticleBySlug(slug) {
  return state.articles.find((article) => article.slug === slug);
}

function getAllTags() {
  const tagMap = new Map();

  for (const article of state.articles) {
    for (const tag of article.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return [...tagMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, "zh-CN"));
}

function filteredArticles() {
  const keyword = state.search.trim().toLowerCase();

  return state.articles.filter((article) => {
    const matchesTag = !state.focusTag || article.tags.includes(state.focusTag);
    const matchesKeyword =
      !keyword ||
      [
        article.title,
        article.excerpt,
        article.category,
        article.tags.join(" "),
        article.sections
          .flatMap((section) => [section.heading, ...section.paragraphs, ...section.bullets])
          .join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    return matchesTag && matchesKeyword;
  });
}

function relatedArticles(article) {
  return state.articles
    .filter((item) => item.slug !== article.slug && item.tags.some((tag) => article.tags.includes(tag)))
    .sort((left, right) => right.tags.filter((tag) => article.tags.includes(tag)).length - left.tags.filter((tag) => article.tags.includes(tag)).length || new Date(right.date) - new Date(left.date))
    .slice(0, 4);
}

function topTags(limit = 8) {
  return getAllTags().slice(0, limit);
}

function renderTagPills(tags) {
  return `<div class="tag-list">${tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function renderTagCloud(tags) {
  if (!tags.length) {
    return `<div class="empty-state">暂无标签。</div>`;
  }

  return `<div class="tag-cloud">${tags
    .map(
      (tag) =>
        `<button class="chip ${state.focusTag === tag.name ? "is-active" : ""}" data-tag="${escapeHtml(tag.name)}">${escapeHtml(tag.name)} · ${tag.count}</button>`,
    )
    .join("")}</div>`;
}

function renderArticleCard(article) {
  return `
    <article class="article-card" style="--c1:${article.cover[0]}; --c2:${article.cover[1]}">
      <div class="article-strip"></div>
      <div class="article-body">
        <div class="article-meta">
          <strong>${escapeHtml(article.category)}</strong>
          <span>${formatDate(article.date)}</span>
          <span>${formatMinutes(article.minutes)}</span>
        </div>
        <h3><a href="#/article/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h3>
        <p>${escapeHtml(article.excerpt)}</p>
        ${renderTagPills(article.tags)}
        <div class="link-row">
          <a class="button primary" href="#/article/${encodeURIComponent(article.slug)}">阅读全文</a>
          <a class="button" href="#/tags/${encodeURIComponent(article.tags[0] || "")}">查看同类标签</a>
        </div>
      </div>
    </article>
  `;
}

function renderArticleGrid(items, emptyMessage) {
  if (!items.length) {
    return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
  }

  return `<div class="article-grid">${items.map(renderArticleCard).join("")}</div>`;
}

function renderHeroCover(article) {
  const c1 = article?.cover?.[0] || "#0d6b7a";
  const c2 = article?.cover?.[1] || "#18a0b6";
  return `<canvas class="cover-canvas" data-cover="${escapeHtml(article?.slug || "hero")}" data-c1="${escapeHtml(c1)}" data-c2="${escapeHtml(c2)}" aria-hidden="true"></canvas>`;
}

function renderHome() {
  const visible = filteredArticles();
  const tags = topTags();
  const latest = state.articles[0];

  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">AI 赋能教育 · 独立文章文件 + 简单后台</p>
        <h1>把 AI 用在备课、课堂、评价和教师成长里</h1>
        <p class="hero-lead">文章已经拆成独立 JSON 文件，后台新增内容后会自动进入首页、标签页和文章详情。</p>
        <div class="hero-actions">
          <a class="button primary" href="#/tags">浏览标签分类</a>
          <a class="button" href="#/about">了解本站</a>
          <a class="button" href="./admin/">进入后台</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><strong>${state.articles.length} 篇文章</strong><span>独立文件管理</span></div>
          <div class="stat"><strong>${tags.length} 个标签</strong><span>快速筛选主题</span></div>
          <div class="stat"><strong>${state.focusTag || "全部内容"}</strong><span>当前浏览范围</span></div>
        </div>
      </div>
      <div class="hero-visual">
        ${renderHeroCover(latest)}
      </div>
    </section>

    <section class="section-grid">
      <div class="panel">
        <div class="panel-inner">
          <div class="section-head">
            <div>
              <h2>文章列表</h2>
              <p>${state.focusTag ? `当前标签：${escapeHtml(state.focusTag)}` : "按时间排序，默认展示最新内容。"}</p>
            </div>
            <div>
              <a class="button" href="#/tags">筛选标签</a>
            </div>
          </div>
          ${state.error ? `<div class="empty-state">${escapeHtml(state.error)}</div>` : renderArticleGrid(visible, state.loading ? "正在加载文章文件..." : "没有找到匹配的文章。")}
        </div>
      </div>

      <aside class="sidebar">
        <section class="panel">
          <div class="panel-inner aside-card">
            <h3>最近更新</h3>
            <div class="aside-list">
              ${state.articles.slice(0, 3).map((article) => `
                <div class="aside-item">
                  <strong><a href="#/article/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></strong>
                  <span>${formatDate(article.date)} · ${escapeHtml(article.category)}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner aside-card">
            <h3>标签云</h3>
            <p>点击标签可快速聚合相关文章。</p>
            ${renderTagCloud(tags)}
          </div>
        </section>
      </aside>
    </section>
  `;
}

function renderTagsPage(selectedTag) {
  const tags = getAllTags();
  const activeTag = selectedTag || state.focusTag;
  const matched = activeTag ? state.articles.filter((article) => article.tags.includes(activeTag)) : state.articles;

  return `
    <section class="archive-hero">
      <p class="eyebrow">标签分类</p>
      <h1>${activeTag ? escapeHtml(activeTag) : "全部标签"}</h1>
      <p>通过标签把备课、课堂、评价、课程和治理内容串起来。</p>
    </section>

    <section class="tag-layout">
      <div class="panel">
        <div class="panel-inner">
          <div class="section-head">
            <div>
              <h2>相关文章</h2>
              <p>${activeTag ? `标签「${escapeHtml(activeTag)}」下共有 ${matched.length} 篇文章。` : "点击任意标签查看对应文章。"}</p>
            </div>
            <div class="link-row">
              <a class="button" href="#/tags">查看全部</a>
              <a class="button primary" href="#/home">返回首页</a>
            </div>
          </div>
          ${state.error ? `<div class="empty-state">${escapeHtml(state.error)}</div>` : renderArticleGrid(matched, state.loading ? "正在加载文章文件..." : "这个标签下还没有文章。")}
        </div>
      </div>

      <aside class="panel">
        <div class="panel-inner">
          <h3>标签总览</h3>
          <p>从这里切换到不同主题。</p>
          <div class="chips">${tags
            .map(
              (tag) =>
                `<button class="chip ${activeTag === tag.name ? "is-active" : ""}" data-tag="${escapeHtml(tag.name)}">${escapeHtml(tag.name)} · ${tag.count}</button>`,
            )
            .join("")}</div>
          <div class="taxonomy-list">
            ${tags
              .map(
                (tag) => `
                  <div class="taxonomy-item">
                    <strong><span>${escapeHtml(tag.name)}</span><span>${tag.count}</span></strong>
                    <span>查看该主题下的文章集合。</span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </aside>
    </section>
  `;
}

function renderAboutPage() {
  return `
    <section class="about-hero">
      <p class="eyebrow">关于本站</p>
      <h1>AI 赋能教育</h1>
      <p>这里记录 AI 在备课、课堂支持、作业评价、课程设计和教师成长中的实际用法。</p>
    </section>

    <section class="about-grid">
      <div class="panel">
        <div class="panel-inner">
          <div class="section-head">
            <div>
              <h2>内容结构</h2>
              <p>每篇文章都是独立 JSON 文件，便于后台管理和 Git 自动部署。</p>
            </div>
          </div>
          <div class="article-grid">
            <div class="stat"><strong>文章列表</strong><span>首页按时间排序</span></div>
            <div class="stat"><strong>文章详情</strong><span>支持目录、正文和相关内容</span></div>
            <div class="stat"><strong>标签分类</strong><span>按主题聚合内容</span></div>
            <div class="stat"><strong>后台入口</strong><span><a href="./admin/">从这里进入编辑后台</a></span></div>
          </div>
        </div>
      </div>

      <aside class="sidebar">
        <section class="panel">
          <div class="panel-inner aside-card">
            <h3>更新方式</h3>
            <div class="aside-list">
              <div class="aside-item">
                <strong>1. 在后台新建文章</strong>
                <span>保存后写入 <code>content/posts/</code>。</span>
              </div>
              <div class="aside-item">
                <strong>2. 通过 Git 提交</strong>
                <span>仓库变更会触发 Netlify 自动部署。</span>
              </div>
              <div class="aside-item">
                <strong>3. 首页自动刷新</strong>
                <span>前端直接从独立文章文件读取内容。</span>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </section>
  `;
}

function renderSections(article) {
  return article.sections
    .map((section, index) => {
      const id = `${article.slug}-section-${index + 1}`;
      const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
      const bullets = section.bullets.length
        ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>`
        : "";

      return `
        <section id="${id}">
          <h2>${escapeHtml(section.heading)}</h2>
          ${paragraphs}
          ${bullets}
        </section>
      `;
    })
    .join("");
}

function renderArticlePage(article) {
  const related = relatedArticles(article);
  const toc = article.sections.map(
    (section, index) =>
      `<a href="#${article.slug}-section-${index + 1}">${escapeHtml(section.heading || `第 ${index + 1} 节`)}</a>`,
  );

  return `
    <section class="article-hero">
      <div class="article-hero-copy">
        <a class="back-link" href="#/home">返回首页</a>
        <p class="eyebrow">${escapeHtml(article.category)}</p>
        <h1>${escapeHtml(article.title)}</h1>
        <p>${formatDate(article.date)} · ${formatMinutes(article.minutes)}</p>
        ${renderTagPills(article.tags)}
        <div class="article-note">${escapeHtml(article.note)}</div>
      </div>
      <div class="article-hero-cover">
        ${renderHeroCover(article)}
      </div>
    </section>

    <section class="detail-grid">
      <div class="panel">
        <div class="article-content">
          ${renderSections(article)}
        </div>
      </div>

      <aside class="detail-side">
        <section class="panel">
          <div class="panel-inner">
            <h3>文章信息</h3>
            <div class="detail-meta">
              <div class="detail-meta-row"><span>分类</span><strong>${escapeHtml(article.category)}</strong></div>
              <div class="detail-meta-row"><span>发布日期</span><strong>${formatDate(article.date)}</strong></div>
              <div class="detail-meta-row"><span>阅读时间</span><strong>${formatMinutes(article.minutes)}</strong></div>
              <div class="detail-meta-row"><span>标签</span><strong>${article.tags.length} 个</strong></div>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <h3>本页目录</h3>
            <div class="detail-toc">
              ${toc.join("")}
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <h3>相关文章</h3>
            <div class="related-list">
              ${related.length
                ? related
                    .map(
                      (item) => `
                        <div class="related-item">
                          <strong><a href="#/article/${encodeURIComponent(item.slug)}">${escapeHtml(item.title)}</a></strong>
                          <div class="article-meta">
                            <span>${formatDate(item.date)}</span>
                            <span>${escapeHtml(item.category)}</span>
                          </div>
                        </div>
                      `,
                    )
                    .join("")
                : `<div class="empty-state">暂无相关文章。</div>`}
            </div>
          </div>
        </section>
      </aside>
    </section>
  `;
}

function renderNotFound() {
  return `
    <section class="panel">
      <div class="panel-inner">
        <h2>文章未找到</h2>
        <p>你访问的内容不存在，可能是链接已更改。</p>
        <a class="button primary" href="#/home">返回首页</a>
      </div>
    </section>
  `;
}

function setDocumentTitle(route, article) {
  if (route.route === "article" && article) {
    document.title = `${article.title} · AI 赋能教育`;
    return;
  }

  if (route.route === "tags") {
    document.title = `${route.slug ? `${route.slug} · ` : ""}标签分类 · AI 赋能教育`;
    return;
  }

  if (route.route === "about") {
    document.title = `关于本站 · AI 赋能教育`;
    return;
  }

  document.title = `AI 赋能教育 · 个人博客`;
}

function updateNavState(route) {
  document.querySelectorAll(".nav a[href^=\"#/\"]").forEach((link) => {
    const href = link.getAttribute("href");
    const active =
      (route.route === "home" && href === "#/home") ||
      (route.route === "tags" && href === "#/tags") ||
      (route.route === "about" && href === "#/about");

    link.classList.toggle("is-active", active);
  });
}

function render() {
  const route = getRoute();
  state.route = route.route;
  state.slug = route.slug || "";

  if (route.route === "tags" && route.slug) {
    state.focusTag = route.slug;
  }

  const article = route.route === "article" ? getArticleBySlug(route.slug) : null;

  setDocumentTitle(route, article);
  updateNavState(route);

  if (!state.loading && route.route === "article" && !article) {
    app.innerHTML = renderNotFound();
  } else if (route.route === "article" && article) {
    app.innerHTML = renderArticlePage(article);
  } else if (route.route === "tags") {
    app.innerHTML = renderTagsPage(route.slug || state.focusTag);
  } else if (route.route === "about") {
    app.innerHTML = renderAboutPage();
  } else {
    app.innerHTML = renderHome();
  }

  requestAnimationFrame(paintCanvases);
}

function seededValue(seed) {
  let value = 0;
  for (let i = 0; i < seed.length; i += 1) {
    value = (value * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return value || 1;
}

function drawCover(canvas, colors, seed) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, rect.width, rect.height);

  const random = seededValue(seed);
  const bars = 5;

  for (let i = 0; i < bars; i += 1) {
    const x = ((random + i * 131) % 1000) / 1000;
    const y = ((random + i * 257) % 1000) / 1000;
    const w = 0.22 + (((random + i * 73) % 100) / 1000);
    const h = 0.08 + (((random + i * 41) % 80) / 1000);

    ctx.fillStyle = `rgba(255, 255, 255, ${0.12 - i * 0.015})`;
    ctx.fillRect(rect.width * x, rect.height * y, rect.width * w, rect.height * h);
  }

  for (let i = 0; i < 10; i += 1) {
    const x = (((random >> i) + i * 91) % 1000) / 1000;
    const y = (((random >> (i % 7)) + i * 59) % 1000) / 1000;
    const radius = 12 + (((random + i * 37) % 34));

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + i * 0.008})`;
    ctx.arc(rect.width * x, rect.height * y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const lineCount = 4;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 1;

  for (let i = 0; i < lineCount; i += 1) {
    const y = rect.height * ((i + 1) / (lineCount + 1));
    ctx.beginPath();
    ctx.moveTo(rect.width * 0.08, y);
    ctx.lineTo(rect.width * 0.92, y - rect.height * 0.08);
    ctx.stroke();
  }
}

function paintCanvases() {
  document.querySelectorAll("canvas[data-cover]").forEach((canvas) => {
    const colors = [canvas.dataset.c1 || "#0d6b7a", canvas.dataset.c2 || "#18a0b6"];
    drawCover(canvas, colors, canvas.dataset.cover || "cover");
  });
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function loadFromGitHub() {
  const files = await fetchJson(CONTENT_API);
  const posts = files
    .filter((file) => file.type === "file" && file.name.endsWith(".json") && file.name !== "index.json")
    .sort((left, right) => left.name.localeCompare(right.name));

  const articles = await Promise.all(
    posts.map(async (file) => {
      const article = await fetchJson(file.download_url);
      return normalizeArticle(article);
    }),
  );

  return articles.sort((left, right) => new Date(right.date) - new Date(left.date));
}

async function loadFromLocalIndex() {
  const index = await fetchJson("./content/posts/index.json");
  const articles = await Promise.all(
    index.map(async (entry) => {
      const article = await fetchJson(`./content/posts/${entry.file}`);
      return normalizeArticle(article);
    }),
  );

  return articles.sort((left, right) => new Date(right.date) - new Date(left.date));
}

async function loadArticles() {
  state.loading = true;
  state.error = "";
  render();

  try {
    state.articles = await loadFromGitHub();
  } catch (githubError) {
    try {
      state.articles = await loadFromLocalIndex();
    } catch (localError) {
      state.articles = [];
      state.error = `文章加载失败：${githubError.message || githubError}。`;
      console.error(githubError, localError);
    }
  } finally {
    state.loading = false;
    render();
  }
}

searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  render();
});

window.addEventListener("hashchange", render);
window.addEventListener("resize", () => {
  requestAnimationFrame(paintCanvases);
});

app.addEventListener("click", (event) => {
  const tagButton = event.target.closest("[data-tag]");
  if (!tagButton) {
    return;
  }

  event.preventDefault();
  const tag = tagButton.dataset.tag || "";
  state.focusTag = tag;
  location.hash = `#/tags/${encodeURIComponent(tag)}`;
});

searchInput.value = state.search;
render();
loadArticles();
