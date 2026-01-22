let skippedRowCount = 0;
const MAX_SKIPPED_WARNINGS = 10;

function splitCsvLine(line) {
  const parts = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      parts.push(current);
      current = "";
      continue;
    }

    current += ch;
  }

  parts.push(current);
  return parts;
}

export function parseQuestions(line) {
  if (!line) {
    return null;
  }

  const parts = splitCsvLine(line);

  while (parts.length < 6) {
    parts.push("");
  }

  const categoryNumber = Number(parts[0]);
  const subcategory = parts[1].trim() || null;
  const diff = Number(parts[2]);

  const quality = Number.isNaN(Number(parts[3])) ? 1 : Number(parts[3]);

  let question = parts[4]?.trim() ?? "";
  let answer = parts[5]?.trim() ?? "";

  if (question.startsWith('"') && question.endsWith('"')) {
    question = question.slice(1, -1).replace(/""/g, '"');
  }

  if (answer.startsWith('"') && answer.endsWith('"')) {
    answer = answer.slice(1, -1).replace(/""/g, '"');
  }

  if (!categoryNumber || Number.isNaN(diff) || !question || !answer) {
    if (skippedRowCount < MAX_SKIPPED_WARNINGS) {
      console.warn("Hoppaði yfir röð:", {
        raw: line,
        categoryNumber,
        subcategory,
        diff,
        quality,
        question,
        answer,
        parts,
      });
    }
    skippedRowCount++;
    return null;
  }

  return {
    categoryNumber,
    subcategory,
    diff,
    quality,
    question,
    answer,
  };
}
