export function parseQuestions(line) {
  if (!line) {
    return null
  }

  // Split CSV line while respecting quoted commas
  const parts = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) ?? []

  while (parts.length < 6) {
    parts.push('')
  }

  const categoryNumber = parts[0].trim() || null
  const category = parts[1].trim() || 'Almennt'
  const diff = Number(parts[2])
  const quality = Number(parts[3]) || 1
  const question = parts[4]?.trim()
  const answer = parts[5]?.trim()

  if (!categoryNumber || !diff || !question || !answer) {
    return line
  }

  return {
    categoryNumber,
    category,
    diff,
    quality,
    question,
    answer,
  }
}
