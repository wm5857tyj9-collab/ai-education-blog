const articles = [
  {
    slug: "ai-prep-workflow",
    title: "AI如何重塑备课流程：从素材检索到教案生成",
    date: "2026-06-29",
    minutes: 8,
    category: "教学设计",
    excerpt: "把AI放进备课链路后，最先改变的不是速度，而是教师处理信息、筛选证据和组织活动的方式。",
    tags: ["备课", "教学设计", "教师成长"],
    cover: ["#0d6b7a", "#18a0b6"],
    note: "备课不是让AI替教师做决定，而是让教师把时间花在更高价值的判断上。",
    sections: [
      {
        heading: "先做资料侦察，再做教案编排",
        paragraphs: [
          "传统备课常卡在资料分散：教材、案例、题库、课堂素材需要在多个平台之间来回切换。AI最直接的价值，是把这些线索快速聚拢成可比较的候选集合。",
          "教师可以先让AI列出知识点、易错点和活动建议，再由自己挑选适合班级水平的内容。这样做的重点不是自动生成，而是先获得一个更完整的决策视图。"
        ]
      },
      {
        heading: "把教案写作变成结构化编辑",
        paragraphs: [
          "当教案框架稳定后，AI适合承担的是结构化补全：目标、活动、评价方式、板书设计、分层任务。教师则负责调整节奏和课堂语言。",
          "这种方式能显著减少重复劳动，但不会削弱教师的专业性，因为最终判断权始终掌握在教师手里。"
        ],
        bullets: [
          "先定教学目标，再让AI补充活动方案。",
          "优先审查例题、任务和评价指标。",
          "每次使用后都保留可复用的提示词模板。"
        ]
      },
      {
        heading: "真正的提升来自工作流，而不是单个工具",
        paragraphs: [
          "如果只是偶尔问一句，效果很快会被遗忘。更稳定的做法，是把AI嵌入固定流程：选题、查证、写作、修改、回看。",
          "一套清晰的工作流，能让教师积累自己的提示词、模板和案例库，最后形成可持续迭代的个人知识系统。"
        ]
      }
    ]
  },
  {
    slug: "ai-classroom-support",
    title: "课堂里的第二个提示器：AI如何支持分层提问",
    date: "2026-06-21",
    minutes: 7,
    category: "课堂实践",
    excerpt: "AI进入课堂后，最适合做的不是替老师讲，而是帮助老师更快地生成分层提问和即时追问。",
    tags: ["课堂", "分层教学", "互动"],
    cover: ["#143a52", "#0f8a9b"],
    note: "课堂中的AI要服务于互动，而不是挤占互动。",
    sections: [
      {
        heading: "同一知识点，三种问法",
        paragraphs: [
          "面对同一个知识点，老师往往需要快速切换不同难度的提问。AI可以先给出基础理解题、迁移应用题和开放反思题，再由教师按班级状态选择。",
          "这种分层提问有助于照顾不同学习水平的学生，也更容易在课堂中制造递进式思考。"
        ],
        bullets: [
          "基础题确认理解。",
          "迁移题连接生活。",
          "开放题引导表达观点。"
        ]
      },
      {
        heading: "即时追问要跟着学生回答走",
        paragraphs: [
          "课堂追问最怕预设太死。AI能提供追问候选，但真正有效的追问仍然要根据学生刚刚说了什么来选择。",
          "教师只要准备几个追问骨架，就能在课堂里更快接住学生的回答，把碎片化表达引到更深的思考上。"
        ]
      },
      {
        heading: "课堂里的信息密度要受控",
        paragraphs: [
          "AI给出的内容通常更丰富，但课堂不是越多越好。教师要做的，是控制信息密度，确保每个环节都能被学生消化。",
          "这意味着AI的建议要经过压缩、排序和删除，最后留下最适合当前课堂的一小部分。"
        ]
      }
    ]
  },
  {
    slug: "ai-assessment-feedback",
    title: "作业批改的下一步，不是更快，而是更准",
    date: "2026-06-13",
    minutes: 9,
    category: "评价反馈",
    excerpt: "AI在评价中的价值，不是把批改做成流水线，而是帮助教师把反馈变得更细、更准、更有针对性。",
    tags: ["评价", "作业", "反馈"],
    cover: ["#6a8b3d", "#b0c95f"],
    note: "评价的核心是诊断，不是盖章。",
    sections: [
      {
        heading: "先看错误类型，再看答案对错",
        paragraphs: [
          "AI可以快速聚合同类错误，帮助教师看到班级的共性问题。这样一来，批改就不只是判断对错，而是判断学生卡在了哪里。",
          "当评价变成诊断，后续讲评课和补救练习也会更精准。"
        ]
      },
      {
        heading: "反馈文本要短，但要能行动",
        paragraphs: [
          "AI很擅长生成完整建议，但学生真正需要的是可执行反馈。反馈越具体，改进成本越低。",
          "教师可以要求AI把建议压缩成一句判断加一个下一步行动，例如“先重写第二步推理，再对照例题补全结论”。"
        ],
        bullets: [
          "明确指出问题位置。",
          "给出下一步动作。",
          "避免泛泛而谈的鼓励语堆砌。"
        ]
      },
      {
        heading: "评价数据应回流到教学设计",
        paragraphs: [
          "批改结束后，AI还可以帮助汇总错因、能力短板和高频问题，回流到下一轮教学。",
          "这样评价才不只是终点，而是教学循环里真正有价值的一环。"
        ]
      }
    ]
  },
  {
    slug: "ai-literacy-curriculum",
    title: "校本课程如何嵌入AI素养",
    date: "2026-06-04",
    minutes: 6,
    category: "课程建设",
    excerpt: "AI素养不应被放在“附加知识”里，而要进入真实任务、真实场景和真实判断。",
    tags: ["课程设计", "AI素养", "项目学习"],
    cover: ["#8d4f2f", "#d07a4a"],
    note: "AI素养的关键，不是会不会用工具，而是会不会判断信息与结果。",
    sections: [
      {
        heading: "从任务出发，而不是从概念出发",
        paragraphs: [
          "校本课程最怕内容空转。与其讲很多抽象概念，不如围绕一个任务展开：信息检索、事实核查、提示词优化、结果验证。",
          "学生在真实操作中更容易理解AI的能力边界，也更容易建立负责任的使用习惯。"
        ]
      },
      {
        heading: "把“判断”设计成课程核心动作",
        paragraphs: [
          "AI课程不应只教输出，还要教判断：哪些结果可信，哪些结果需要核实，哪些结果不能直接使用。",
          "教师可以把判断能力拆成几个小目标，让学生在比较、修正和复盘中逐步建立标准。"
        ]
      },
      {
        heading: "课程成果最好能被看见",
        paragraphs: [
          "学生的成果可以是知识卡片、项目海报、过程日志或演示稿。只要能体现“思考过程”，就比单纯成品更有教学价值。",
          "课程收束时，最好让学生回到一个问题：我在使用AI时，哪里仍然需要人来判断？"
        ]
      }
    ]
  },
  {
    slug: "teacher-knowledge-base",
    title: "教师的AI协作工作流：把零散灵感变成稳定方法",
    date: "2026-05-28",
    minutes: 8,
    category: "教师发展",
    excerpt: "个人知识库不是“收藏夹”，而是把重复劳动沉淀成方法，把经验变成可复用资产。",
    tags: ["工作流", "知识库", "成长记录"],
    cover: ["#274d7f", "#4d7fd1"],
    note: "稳定的方法，比一次性灵感更值钱。",
    sections: [
      {
        heading: "提示词也需要版本管理",
        paragraphs: [
          "很多教师第一次用AI时，会写很多临时问题，但用过几次后就找不到了。与其靠记忆，不如把常用提示词整理成库。",
          "每次迭代都记录输入、输出和修改理由，久而久之就能看出哪类提示最稳定，哪类提示最容易失真。"
        ]
      },
      {
        heading: "知识库应该服务于再创作",
        paragraphs: [
          "真正有用的知识库，不是存资料，而是方便再创作。你需要能快速找到一个模板、一段案例和一份总结，再把它们拼回当前任务。",
          "因此分类方式最好贴近工作场景，例如备课、课堂、评价、家校沟通、课程建设。"
        ]
      },
      {
        heading: "让复盘成为固定动作",
        paragraphs: [
          "AI协作最容易被忽略的一步是复盘。没有复盘，提示词只会越来越多，却不会越来越好。",
          "每周花十分钟回看一次输出，常常比再换一个新工具更有效。"
        ]
      }
    ]
  },
  {
    slug: "ai-ethics-school",
    title: "生成式AI进入校园后，边界应该怎么画",
    date: "2026-05-18",
    minutes: 10,
    category: "治理与伦理",
    excerpt: "学校使用AI，最终要落到三个问题：能不能用、怎么用、谁来判断用得是否合适。",
    tags: ["伦理", "治理", "安全"],
    cover: ["#6d3a63", "#a54d8b"],
    note: "边界不是限制创新，而是让创新可持续。",
    sections: [
      {
        heading: "先明确可用场景，再讨论工具选择",
        paragraphs: [
          "不同场景对AI的要求完全不同。备课可以辅助检索，课堂可以辅助提问，评价环节则要更严格地审视结果。",
          "学校若先把场景划清，再讨论工具，就更容易形成统一而清晰的使用规范。"
        ]
      },
      {
        heading: "数据、隐私和学术诚信要放在前面",
        paragraphs: [
          "学生信息、试题内容和评价数据都需要谨慎处理。教师在使用AI前，应该先确认哪些材料可以上传，哪些必须留在本地。",
          "同时，要把诚信规范讲清楚，避免学生把生成结果直接当成自己的思考。"
        ]
      },
      {
        heading: "规则要能被理解，不能只写在文件里",
        paragraphs: [
          "真正有效的边界，不是办公室里的一页纸，而是师生都能理解并执行的做法。",
          "学校可以把规则拆成可操作的清单，让教师和学生知道什么能做、什么要审批、什么必须人工复核。"
        ]
      }
    ]
  }
];

const state = {
  search: "",
  focusTag: "",
  route: "home",
  slug: ""
};

const app = document.getElementById("app");
const searchInput = document.getElementById("global-search");

function getArticleBySlug(slug) {
  return articles.find((item) => item.slug === slug);
}

function getRoute() {
  const hash = (location.hash || "#/home").replace(/^#/, "");
  const [path, query = ""] = hash.split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(query);

  if (parts[0] === "article" && parts[1]) {
    return { route: "article", slug: parts[1], params };
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
    day: "numeric"
  }).format(new Date(date));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getAllTags() {
  const map = new Map();
  for (const article of articles) {
    for (const tag of article.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

function getCategories() {
  const map = new Map();
  for (const article of articles) {
    map.set(article.category, (map.get(article.category) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
}

function filterArticles() {
  const keyword = state.search.trim().toLowerCase();
  return articles.filter((article) => {
    const text = [
      article.title,
      article.excerpt,
      article.category,
      article.tags.join(" "),
      article.sections.map((section) => [section.heading, ...(section.paragraphs || []), ...(section.bullets || [])].join(" ")).join(" ")
    ].join(" ").toLowerCase();

    const matchesSearch = !keyword || text.includes(keyword);
    const matchesTag = !state.focusTag || article.tags.includes(state.focusTag);
    return matchesSearch && matchesTag;
  });
}

function renderTags(tags) {
  return `<div class="tag-list">${tags.map((tag) => `<span class="tag-pill">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function renderArticleCard(article) {
  return `
    <article class="article-card">
      <div class="article-strip" style="--c1:${article.cover[0]}; --c2:${article.cover[1]};"></div>
      <div class="article-body">
        <div class="article-meta">
          <span>${escapeHtml(article.category)}</span>
          <span>${formatDate(article.date)}</span>
          <span>${article.minutes} 分钟</span>
        </div>
        <h3><a href="#/article/${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h3>
        <p>${escapeHtml(article.excerpt)}</p>
        ${renderTags(article.tags)}
        <div class="link-row">
          <a class="button primary" href="#/article/${encodeURIComponent(article.slug)}">阅读全文</a>
          <a class="button" href="#/tags/${encodeURIComponent(article.tags[0])}">查看同类标签</a>
        </div>
      </div>
    </article>
  `;
}

function homeView() {
  const filtered = filterArticles();
  const tags = getAllTags();
  const categories = getCategories();
  const featured = filtered[0] || articles[0];
  const activeTag = state.focusTag || "全部";

  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">个人博客 / 教育科技 / 教学实践</p>
        <h1>AI赋能教育</h1>
        <p class="hero-lead">记录教师如何把 AI 变成备课助手、课堂协作者和评价伙伴，让技术回到学习本身。</p>
        <div class="hero-actions">
          <a class="button primary" href="#/tags">浏览标签分类</a>
          <a class="button" href="#/about">了解本站</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><strong>${articles.length} 篇专题文章</strong><span>覆盖备课、课堂、评价与伦理</span></div>
          <div class="stat"><strong>${tags.length} 个常用标签</strong><span>快速找到对应主题</span></div>
          <div class="stat"><strong>${categories.length} 个分类方向</strong><span>结构化整理阅读路径</span></div>
        </div>
      </div>
      <div class="hero-visual">
        <canvas id="heroCanvas" aria-hidden="true"></canvas>
      </div>
    </section>

    <section class="section-grid">
      <div>
        <div class="section-head">
          <div>
            <h2>最新文章</h2>
            <p>围绕备课、课堂、评价与治理展开，强调可操作的方法。</p>
          </div>
          <div class="chip is-active">当前筛选：${escapeHtml(activeTag)}</div>
        </div>

        <div class="chips" id="filter-chips">
          <button class="chip ${!state.focusTag ? "is-active" : ""}" data-tag="">全部</button>
          ${tags.slice(0, 8).map((tag) => `<button class="chip ${state.focusTag === tag.name ? "is-active" : ""}" data-tag="${escapeHtml(tag.name)}">${escapeHtml(tag.name)} · ${tag.count}</button>`).join("")}
        </div>

        <div class="article-grid">
          ${filtered.length ? filtered.map(renderArticleCard).join("") : `<div class="empty-state">没有找到匹配的内容，换个关键词试试。</div>`}
        </div>
      </div>

      <aside class="sidebar">
        <section class="panel">
          <div class="panel-inner">
            <h3>精选专题</h3>
            <p>先从最常用的教学场景入手，再慢慢沉淀自己的工作流。</p>
            <div class="aside-list">
              <div class="aside-item">
                <strong>${escapeHtml(featured.title)}</strong>
                <span>${escapeHtml(featured.excerpt)}</span>
              </div>
              <div class="aside-item">
                <strong>阅读顺序</strong>
                <span>建议先看「备课」「课堂」两类文章，再进入「评价」「伦理」专题。</span>
              </div>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <h3>标签分类</h3>
            <p>点击任一标签即可进入对应分类页。</p>
            <div class="tag-cloud">
              ${tags.map((tag) => `<a class="chip" href="#/tags/${encodeURIComponent(tag.name)}">${escapeHtml(tag.name)} · ${tag.count}</a>`).join("")}
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <h3>快速入口</h3>
            <div class="aside-list">
              ${categories.map((category) => `<div class="aside-item"><strong>${escapeHtml(category.name)}</strong><span>${category.count} 篇文章</span></div>`).join("")}
            </div>
          </div>
        </section>
      </aside>
    </section>
  `;
}

function tagsView(selectedTag) {
  const tags = getAllTags();
  const categories = getCategories();
  const matched = selectedTag ? articles.filter((article) => article.tags.includes(selectedTag)) : articles;

  return `
    <section class="archive-hero">
      <h1>标签分类</h1>
      <p>按主题组织文章，快速找到备课、课堂、评价和治理相关内容。</p>
    </section>

    <section class="tag-layout">
      <div class="panel">
        <div class="panel-inner">
          <div class="section-head">
            <div>
              <h2>热门标签</h2>
              <p>点击标签后，右侧会更新对应文章列表。</p>
            </div>
            <button class="button" id="clear-tag">查看全部</button>
          </div>
          <div class="tag-cloud">
            ${tags.map((tag) => `<button class="chip ${selectedTag === tag.name ? "is-active" : ""}" data-tag="${escapeHtml(tag.name)}">${escapeHtml(tag.name)} · ${tag.count}</button>`).join("")}
          </div>
        </div>
      </div>

      <aside class="panel">
        <div class="panel-inner">
          <h3>分类归档</h3>
          <div class="taxonomy-list">
            ${categories.map((category) => `<div class="taxonomy-item"><strong><span>${escapeHtml(category.name)}</span><span>${category.count}</span></strong><span>${category.count} 篇文章</span></div>`).join("")}
          </div>
        </div>
      </aside>
    </section>

    <section class="section-grid">
      <div>
        <div class="section-head">
          <div>
            <h2>${selectedTag ? `标签「${escapeHtml(selectedTag)}」` : "全部文章"}</h2>
            <p>${selectedTag ? "只显示与该标签相关的文章。" : "展示所有可阅读内容。"}</p>
          </div>
        </div>
        <div class="article-grid">
          ${matched.length ? matched.map(renderArticleCard).join("") : `<div class="empty-state">这个标签下暂时没有文章。</div>`}
        </div>
      </div>

      <aside class="sidebar">
        <section class="panel">
          <div class="panel-inner">
            <h3>标签说明</h3>
            <p>标签用于横向关联文章。你可以从“备课”“课堂”“评价”这条主线开始阅读。</p>
          </div>
        </section>
      </aside>
    </section>
  `;
}

function aboutView() {
  return `
    <section class="about-hero">
      <p class="eyebrow">About</p>
      <h1>关于这个博客</h1>
      <p>这里记录我对 AI 赋能教育的观察、实验和复盘，重点不是追热点，而是把工具变成稳定的方法。</p>
    </section>

    <section class="about-grid">
      <div class="panel">
        <div class="panel-inner">
          <h2>我关注什么</h2>
          <div class="aside-list">
            <div class="aside-item">
              <strong>备课提效</strong>
              <span>利用 AI 进行资料聚合、结构梳理与教案初稿编排。</span>
            </div>
            <div class="aside-item">
              <strong>课堂互动</strong>
              <span>围绕分层提问、即时追问和活动设计，提升课堂密度。</span>
            </div>
            <div class="aside-item">
              <strong>评价与治理</strong>
              <span>关注反馈质量、数据边界与学校规则落地。</span>
            </div>
          </div>
        </div>
      </div>

      <aside class="sidebar">
        <section class="panel">
          <div class="panel-inner">
            <h3>写作原则</h3>
            <p>每篇文章尽量回答三个问题：能做什么、怎么做、边界在哪里。</p>
          </div>
        </section>

        <section class="panel">
          <div class="panel-inner">
            <h3>更新节奏</h3>
            <p>优先围绕真实教学场景持续补充，逐步形成可复用的教育实践库。</p>
          </div>
        </section>
      </aside>
    </section>
  `;
}

function articleView(article) {
  if (!article) {
    return `
      <section class="archive-hero">
        <h1>文章不存在</h1>
        <p>你访问的内容没有找到。</p>
        <p><a class="button primary" href="#/home">返回首页</a></p>
      </section>
    `;
  }

  const related = articles
    .filter((item) => item.slug !== article.slug && item.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);
  const outline = article.sections.map((section, index) => ({
    id: `${article.slug}-section-${index + 1}`,
    heading: section.heading
  }));

  return `
    <div class="detail-shell">
      <section class="article-hero">
        <div class="article-hero-copy">
          <a class="back-link" href="#/home">返回首页</a>
          <div class="article-meta">
            <span>${escapeHtml(article.category)}</span>
            <span>${formatDate(article.date)}</span>
            <span>${article.minutes} 分钟阅读</span>
          </div>
          <h1>${escapeHtml(article.title)}</h1>
          <p>${escapeHtml(article.excerpt)}</p>
          ${renderTags(article.tags)}
        </div>
        <div class="article-hero-cover" style="--c1:${article.cover[0]}; --c2:${article.cover[1]};">
          <canvas class="cover-canvas" data-cover="${escapeHtml(article.slug)}" aria-hidden="true"></canvas>
        </div>
      </section>

      <section class="detail-grid">
        <article class="panel">
          <div class="article-content">
            <div class="article-note">${escapeHtml(article.note)}</div>
            ${article.sections.map((section, index) => `
              <section id="${escapeHtml(outline[index].id)}">
                <h2>${escapeHtml(section.heading)}</h2>
                ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                ${section.bullets && section.bullets.length ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
              </section>
            `).join("")}
          </div>
        </article>

        <aside class="detail-side">
          <section class="panel">
            <div class="panel-inner">
              <h3>文章导航</h3>
              <div class="detail-toc">
                ${outline.length ? outline.map((item) => `<a href="#${escapeHtml(item.id)}">${escapeHtml(item.heading)}</a>`).join("") : `<div class="empty-state">暂无目录。</div>`}
              </div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-inner detail-meta">
              <h3>文章信息</h3>
              <div class="detail-meta-row"><span>分类</span><strong>${escapeHtml(article.category)}</strong></div>
              <div class="detail-meta-row"><span>发布时间</span><strong>${formatDate(article.date)}</strong></div>
              <div class="detail-meta-row"><span>预计阅读</span><strong>${article.minutes} 分钟</strong></div>
              <div class="detail-meta-row"><span>标签</span><strong>${article.tags.length} 个</strong></div>
            </div>
          </section>

          <section class="panel">
            <div class="panel-inner">
              <h3>相关阅读</h3>
              <div class="related-list">
                ${related.length ? related.map((item) => `
                  <div class="related-item">
                    <strong><a href="#/article/${encodeURIComponent(item.slug)}">${escapeHtml(item.title)}</a></strong>
                    <p>${escapeHtml(item.excerpt)}</p>
                  </div>
                `).join("") : `<div class="empty-state">暂无相关推荐。</div>`}
              </div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  `;
}

function setActiveNav(route) {
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const active =
      (route.route === "home" && href === "#/home") ||
      (route.route === "tags" && href === "#/tags") ||
      (route.route === "about" && href === "#/about");
    link.classList.toggle("is-active", active);
  });
}

function bindGlobalSearch() {
  searchInput.value = state.search;
  searchInput.oninput = () => {
    state.search = searchInput.value;
    render();
  };
}

function bindFilters() {
  document.querySelectorAll("[data-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.getAttribute("data-tag") || "";
      state.focusTag = tag;
      if (state.route === "tags") {
        location.hash = tag ? `#/tags/${encodeURIComponent(tag)}` : "#/tags";
      } else if (state.route === "article") {
        location.hash = tag ? `#/tags/${encodeURIComponent(tag)}` : "#/home";
      } else {
        render();
      }
    });
  });

  const clearTag = document.getElementById("clear-tag");
  if (clearTag) {
    clearTag.addEventListener("click", () => {
      state.focusTag = "";
      render();
    });
  }
}

function drawHeroCanvas(ts = 0) {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#0b3144");
  background.addColorStop(0.46, "#115b70");
  background.addColorStop(1, "#2c8194");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const halo = ctx.createRadialGradient(width * 0.22, height * 0.18, 0, width * 0.22, height * 0.18, width * 0.42);
  halo.addColorStop(0, "rgba(242, 159, 5, 0.26)");
  halo.addColorStop(1, "rgba(242, 159, 5, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, width, height);

  const lineAlpha = 0.12;
  ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`;
  ctx.lineWidth = 1;
  for (let x = 20; x < width; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x, height - 16);
    ctx.stroke();
  }
  for (let y = 20; y < height; y += 36) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(width - 16, y);
    ctx.stroke();
  }

  const drift = Math.sin(ts / 2400) * 4;
  const panelX = width * 0.25;
  const panelY = height * 0.24;
  const panelW = width * 0.54;
  const panelH = height * 0.42;

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundRect(ctx, panelX - 16, panelY - 10, panelW + 32, panelH + 26, 22);
  ctx.fill();

  ctx.fillStyle = "rgba(10, 30, 40, 0.28)";
  roundRect(ctx, panelX + 10, panelY + 18, panelW - 20, panelH - 22, 18);
  ctx.fill();

  const screenGradient = ctx.createLinearGradient(panelX, panelY, panelX + panelW, panelY + panelH);
  screenGradient.addColorStop(0, "rgba(255,255,255,0.26)");
  screenGradient.addColorStop(1, "rgba(255,255,255,0.08)");
  ctx.fillStyle = screenGradient;
  roundRect(ctx, panelX + 18, panelY + 26, panelW - 36, panelH - 40, 14);
  ctx.fill();

  // left notebook block
  ctx.fillStyle = "rgba(255,255,255,0.17)";
  roundRect(ctx, width * 0.08, height * 0.56, width * 0.18, height * 0.18, 16);
  ctx.fill();
  ctx.fillStyle = "rgba(242, 159, 5, 0.9)";
  roundRect(ctx, width * 0.11, height * 0.58, width * 0.12, 12, 999);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let i = 0; i < 5; i++) {
    roundRect(ctx, width * 0.11, height * 0.62 + i * 18, width * 0.13 - i * 4, 6, 999);
    ctx.fill();
  }

  // central AI nodes
  const nodes = [
    [width * 0.43, height * 0.35],
    [width * 0.57, height * 0.31],
    [width * 0.66, height * 0.48],
    [width * 0.48, height * 0.54],
    [width * 0.36, height * 0.47]
  ];

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < nodes.length; i++) {
    const [x, y] = nodes[i];
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();

  for (let i = 0; i < nodes.length; i++) {
    const [x, y] = nodes[i];
    const radius = 6 + Math.sin(ts / 500 + i) * 1.3;
    ctx.fillStyle = i % 2 ? "#f29f05" : "#d7fbff";
    ctx.beginPath();
    ctx.arc(x, y + Math.sin(ts / 1300 + i) * 2 + drift, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // floating cards
  const cards = [
    { x: width * 0.67, y: height * 0.16, w: width * 0.16, h: height * 0.11, c: "rgba(255,255,255,0.18)" },
    { x: width * 0.16, y: height * 0.18, w: width * 0.14, h: height * 0.09, c: "rgba(242,159,5,0.18)" },
    { x: width * 0.72, y: height * 0.63, w: width * 0.16, h: height * 0.11, c: "rgba(255,255,255,0.16)" }
  ];

  cards.forEach((card, index) => {
    ctx.fillStyle = card.c;
    roundRect(ctx, card.x, card.y + Math.sin(ts / 900 + index) * 4, card.w, card.h, 14);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.36)";
    roundRect(ctx, card.x + 12, card.y + 14 + Math.sin(ts / 900 + index) * 4, card.w * 0.62, 8, 999);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    roundRect(ctx, card.x + 12, card.y + 32 + Math.sin(ts / 900 + index) * 4, card.w * 0.84, 6, 999);
    ctx.fill();
  });

  // sparkles
  const sparks = [
    [width * 0.82, height * 0.2],
    [width * 0.22, height * 0.62],
    [width * 0.74, height * 0.74],
    [width * 0.52, height * 0.18]
  ];
  sparks.forEach(([x, y], index) => {
    const pulse = 2 + Math.sin(ts / 600 + index) * 0.9;
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x - pulse, y);
    ctx.lineTo(x + pulse, y);
    ctx.moveTo(x, y - pulse);
    ctx.lineTo(x, y + pulse);
    ctx.stroke();
  });

}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawCoverCanvas() {
  document.querySelectorAll(".cover-canvas").forEach((canvas, index) => {
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width * 0.3, height * 0.2, 0, width * 0.3, height * 0.2, width * 0.85);
    glow.addColorStop(0, "rgba(255,255,255,0.20)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const x = (width / 8) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const offset = 0.5 + index * 0.18;
    ctx.fillStyle = "rgba(255,255,255,0.13)";
    roundRect(ctx, width * 0.16, height * 0.22 + offset * 6, width * 0.52, height * 0.28, 18);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.21)";
    roundRect(ctx, width * 0.22, height * 0.28 + offset * 6, width * 0.26, 10, 999);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    roundRect(ctx, width * 0.22, height * 0.4 + offset * 6, width * 0.38, 8, 999);
    ctx.fill();

    ctx.fillStyle = "rgba(242,159,5,0.86)";
    ctx.beginPath();
    ctx.arc(width * 0.7, height * 0.28, 16, 0, Math.PI * 2);
    ctx.fill();
  });
}

function render() {
  const route = getRoute();
  state.route = route.route;
  state.slug = route.slug || "";

  if (route.route === "article") {
    document.title = `${getArticleBySlug(route.slug)?.title || "文章"} · AI赋能教育`;
  } else if (route.route === "tags") {
    document.title = `${route.slug ? `${route.slug} · ` : ""}标签分类 · AI赋能教育`;
  } else if (route.route === "about") {
    document.title = "关于 · AI赋能教育";
  } else {
    document.title = "AI赋能教育 · 个人博客";
  }

  app.innerHTML =
    route.route === "article"
      ? articleView(getArticleBySlug(route.slug))
      : route.route === "tags"
        ? tagsView(route.slug || state.focusTag)
        : route.route === "about"
          ? aboutView()
          : homeView();

  setActiveNav(route);
  bindFilters();
  bindGlobalSearch();
  drawCoverCanvas();

  if (route.route === "home") {
    drawHeroCanvas();
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("resize", () => {
  drawHeroCanvas();
  drawCoverCanvas();
});

if (!location.hash) {
  location.hash = "#/home";
}

render();
