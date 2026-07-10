const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
const anchor = "const articles = [";
const start = source.indexOf(anchor);

if (start < 0) {
  throw new Error("Could not find article array in app.js");
}

const firstBracket = source.indexOf("[", start);
let depth = 0;
let inString = false;
let quote = "";
let escaped = false;
let end = -1;

for (let i = firstBracket; i < source.length; i += 1) {
  const ch = source[i];

  if (inString) {
    if (escaped) {
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      escaped = true;
      continue;
    }

    if (ch === quote) {
      inString = false;
    }

    continue;
  }

  if (ch === '"' || ch === "'") {
    inString = true;
    quote = ch;
    continue;
  }

  if (ch === "[") {
    depth += 1;
  } else if (ch === "]") {
    depth -= 1;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}

if (end < 0) {
  throw new Error("Could not find the end of the article array");
}

const articles = eval(source.slice(firstBracket, end + 1)); // eslint-disable-line no-eval
const outDir = path.join(__dirname, "..", "content", "posts");

fs.mkdirSync(outDir, { recursive: true });

for (const article of articles) {
  const output = path.join(outDir, `${article.slug}.json`);
  fs.writeFileSync(output, `${JSON.stringify(article, null, 2)}\n`, "utf8");
}

const index = articles.map((article) => ({
  slug: article.slug,
  title: article.title,
  date: article.date,
  file: `${article.slug}.json`,
}));

fs.writeFileSync(
  path.join(outDir, "index.json"),
  `${JSON.stringify(index, null, 2)}\n`,
  "utf8",
);

console.log(`Wrote ${articles.length} article files.`);
