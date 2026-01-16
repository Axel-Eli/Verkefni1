export function parseQuestions(line) {
  if (!line) {
    return null
  }

  // Split CSV line while respecting quoted commas
  const parts = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)

  if (!parts || parts.length < 6) {
    console.warn('Ógild lína', line)
    return null
  }

  const categoryNumber = parts[0].trim()
  const category = parts[1].trim()
  const quality = parts[2].trim()
  const question = parts[4]?.trim()
  const answer = parts[5]?.trim()

  if (!category || !question || !answer || !quality) {
    console.warn('Ógild lína', line)
    return null
  }

  return {
    categoryNumber,
    category,
    quality,
    question,
    answer,
  }
}
