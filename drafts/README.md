# 草稿区

把尚未审核的文章保存为 `drafts/<slug>.json`。`drafts/*.json` 已加入 Git 忽略规则，不会随提交发布。

本地校验并晋级一篇草稿：

```powershell
node scripts/promote-draft.js drafts/your-article-slug.json
```

晋级后文件会复制到 `content/posts/`，并重建 `content/posts-index.json`；草稿原件保留。检查内容后，再按 `发布与维护.md` 提交分支并创建 Pull Request。
