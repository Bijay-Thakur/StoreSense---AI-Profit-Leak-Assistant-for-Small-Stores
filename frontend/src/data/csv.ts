import { readFile } from "node:fs/promises";
import path from "node:path";

function parseCsvLine(line: string): string[] {
  const cols: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      cols.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  cols.push(current);
  return cols.map((v) => v.trim());
}

export function parseCsv<T extends Record<string, string>>(raw: string): T[] {
  const lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return [];

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] ?? "";
    });
    return obj as T;
  });
}

export async function readMockCsv<T extends Record<string, string>>(filename: string): Promise<T[]> {
  const filePath = path.join(process.cwd(), "public", "mock-data", filename);
  const raw = await readFile(filePath, "utf8");
  return parseCsv<T>(raw);
}
