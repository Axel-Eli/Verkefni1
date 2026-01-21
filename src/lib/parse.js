let skippedRowCount = 0
const MAX_SKIPPED_WARNINGS = 10
export function parseQuestions(line) {
  if (!line) {
    return null
  }

  // Split CSV line while respecting quoted commas
  const parts = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) ?? []

  while (parts.length < 6) {
    parts.push('')
  }

  const categoryNumber = Number(parts[0].trim()) || null
  const subcategory = parts[1].trim() || null
  const diff = Number(parts[2])

  // quality is optional and often missing; default to 1 if not numeric
  const quality = Number.isNaN(Number(parts[3])) ? 1 : Number(parts[3])

  // Extract potential text fields (everything except numeric metadata)
  const textFields = parts
    .slice(3)
    .map(p => p.trim())
    .filter(Boolean)

  let question = textFields[0] ?? ''
  let answer = textFields[1] ?? ''

  if (
    !categoryNumber ||
    Number.isNaN(diff) ||
    !question ||
    !answer
  ) {
    if (skippedRowCount < MAX_SKIPPED_WARNINGS) {
      console.warn('⚠️ Skipped row:', {
        raw: line,
        categoryNumber,
        subcategory,
        diff,
        quality,
        question,
        answer,
        parts
      })
    }
    skippedRowCount++
    return null
  }

  return {
    categoryNumber,
    subcategory,
    diff,
    quality,
    question,
    answer,
  }
}
