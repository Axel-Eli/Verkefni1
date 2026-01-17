import fs from 'node:fs/promises'
import { parseQuestions } from './lib/parse.js'


const MAX_QUESTIONS_PER_CATEGORY = 100

  function generateIndexnHtml(categories){
    const links = Object.entries(categories).map(([slug, category]) =>
        `<li><a href="${slug}.html">${category.name}</a></li>`).join('\n')
  
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
    <article class="question">
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

    for(const q of qualityQuestions){

      if(!q.category){
        continue
      }
      
      const slug = q.category.toLowerCase().replace(/\s+/g, '-')

      if(!categories[slug]){
        categories[slug] = {
          name: q.category,
          questions: []
        }
      }

      if(categories[slug].questions.length < MAX_QUESTIONS_PER_CATEGORY){
        categories[slug].questions.push(q)
      }
    }

  const indexHtml = generateIndexnHtml(categories)

  await fs.mkdir('./dist', { recursive: true })
  await fs.writeFile('./dist/index.html', indexHtml, 'utf8')

  for(const [slug, category] of Object.entries(categories)){
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
    await fs.writeFile(`./dist/${slug}.html`, output, 'utf8')
    
  }
}

main().catch((error) => {
  console.error('error generating', error);
});
