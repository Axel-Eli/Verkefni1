import fs from 'node:fs/promises'
import { parseQuestions } from './lib/parse.js'


const MAX_QUESTIONS_PER_CATEGORY = 100

const CATEGORY_MAP = {
  1: 'Almenn kunnátta',
  2: 'Náttúra og vísindi',
  3: 'Bókmenntir og listir',
  4: 'Saga',
  5: 'Landafræði',
  6: 'Skemmtun og afþreying',
  7: 'Íþróttir og tómstundir',
}
  function generateIndexHtml(categories){
    const links = Object.values(categories).map(category =>
        `<li><a href="${category.slug}.html">${category.name}</a></li>`).join('\n')
  
    return `<!DOCTYPE html>
            <html lang = "is">
                <head>
                    <meta charset="utf8">
                    <title>Spurninga leikur</title>
                    <link rel = "stylesheet" href="./styles.css">
                </head>
                
                <body>
                    <main>
                        <h1>Spurninga, Spurninga, Spurninga...</h1>
                        <h1>LEIKURINN</h1>

                        <p>Vertu velkominn spurninga meistrinn þinn á spurningavefinn</p>
                        <p>hér finnur þú allar spurningar úr öllum mögulegum flokkum, ekki nóg með það þá 
                            hefur þessi vefur líka valmöguleika á hvaða flokkum þú vilt svara spurningum úr
                        </p>
                        <ul>
                            ${links}
                        </ul>
                    </main>
                </body>
            </html>`
    }

function cleanText(text){
    if(!text) return text
    let cleaned = text

    if (cleaned.startsWith('"') && cleaned.endsWith('"')){
      cleaned = cleaned.slice(1, -1)
    }

    cleaned = cleaned.replace(/""/g, '"')

    return cleaned

  }

function generateQuestionHtml(q) {
  
  return `
    <article 
      class="question"
      data-subcategory="${q.subcategory ?? 'all'}"
      >
      <h3>${cleanText(q.question)}</h3>

      <button class="show-answer">Sýna svar</button>

      <div class="answer hidden">
        <p>${q.answer}</p>
        <div class="actions">
          <button data-correct>Rétt</button>
          <button data-wrong>Rangt</button>
        </div>
      </div>
    </article>
  `
}

async function main() {
  const content = await fs.readFile('./questions.csv', 'utf8')
    const lines = content.split('\n')

    const questions = lines
      .map(parseQuestions)
      .filter(Boolean)

    const qualityQuestions = questions
      .filter((q) => Number(q.diff) >= 1);

    const categories = {}

    for(const [id, name] of Object.entries(CATEGORY_MAP)) {
      categories[id] = {
        id: Number(id),
        name,
        slug: name
          .toLowerCase()
          .replace(/[ðþ]/g, 'd')
          .replace(/[^a-záðéíóúýöæ\s-]/gi, '')
          .replace(/\s+/g, '-'),
        questions: []
      }
    }

    for (const q of qualityQuestions) {
  const catId = Number(q.categoryNumber)

  if (!categories[catId]) {
    continue
  }

  if (categories[catId].questions.length < MAX_QUESTIONS_PER_CATEGORY) {
    categories[catId].questions.push(q)
  }
}

  const indexHtml = generateIndexHtml(categories)

  await fs.mkdir('./dist', { recursive: true })
  await fs.writeFile('./dist/index.html', indexHtml, 'utf8')

  for (const category of Object.values(categories)) {
    const questionsHtml = category.questions
      .map(generateQuestionHtml)
      .join('\n')

    const output = `<!DOCTYPE html>
                      <html lang="is">
                        <head>
                          <meta charset="utf-8">
                          <title>${category.name}</title>
                          <link rel="stylesheet" href="./styles.css">
                        </head>
                        <body>
                          <main>
                            <a href="index.html">← Til baka</a>
                            <h1>${category.name}</h1>

                            ${questionsHtml}
                          </main>

                          <script src="./scripts.js"></script>
                        </body>
                      </html>`
    await fs.writeFile(`./dist/${category.slug}.html`, output, 'utf8')
    
  }
}

main().catch((error) => {
  console.error('error generating', error);
});
