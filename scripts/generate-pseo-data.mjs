import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const sourcePath =
  process.env.PSEO_SOURCE ??
  "/Users/jairusotiko/Downloads/pSEO - getpestpros.com.xlsx";
const outputPath = path.resolve(projectRoot, "src/data/pseo-pages.json");

function normalizeSlug(slug) {
  const value = String(slug ?? "").trim();
  return value.startsWith("/") ? value : `/${value}`;
}

function toNumber(value) {
  if (value === "" || value == null) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function inferSection(title) {
  const text = cleanText(title);
  if (!text) return "General";
  if (/emergency/i.test(text)) return "Emergency";
  if (/commercial/i.test(text)) return "Commercial";
  if (/city/i.test(text)) return "Cities";
  if (/near me/i.test(text)) return "Near Me";
  if (/cost|price/i.test(text)) return "Cost Guides";
  if (/wildlife|animal|rodent|bed bug|cockroach|ant|wasp|spider|mosquito|silverfish|termite/i.test(text))
    return "Pest Services";
  return "General";
}

function parseWorkbook(filePath) {
  const workbook = XLSX.readFile(filePath, { cellDates: false });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, blankrows: false });

  const header = rows[1] ?? [];
  const records = [];

  for (const row of rows.slice(2)) {
    const slug = cleanText(row[2]);
    const priority = cleanText(row[11]);
    const firstCell = cleanText(row[0]);
    const pageType = cleanText(row[6]);

    if (!slug || !slug.startsWith("/")) {
      continue;
    }

    records.push({
      index: firstCell || null,
      title: cleanText(row[1]),
      slug: normalizeSlug(slug),
      primaryKeyword: cleanText(row[3]),
      secondaryKeywords: cleanText(row[4])
        .split(",")
        .map((item) => cleanText(item))
        .filter(Boolean),
      targetArea: cleanText(row[5]),
      pageType,
      searchIntent: cleanText(row[7]),
      volume: toNumber(row[8]),
      keywordDifficulty: toNumber(row[9]),
      cpc: toNumber(row[10]),
      priority: priority || null,
      cta: cleanText(row[12]),
      section: inferSection(row[1]),
    });
  }

  return {
    sourcePath,
    sheetName: workbook.SheetNames[0],
    generatedAt: new Date().toISOString(),
    header,
    records,
  };
}

async function main() {
  const payload = parseWorkbook(sourcePath);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${payload.records.length} pages to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

