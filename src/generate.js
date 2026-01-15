import { generateKey } from 'node:crypto'
import fs from 'node:fs/promises'

function parseLine(line){


  const questions = []

    const split = line.split(',')

    // 
    // 
    //
    const categoryNumber = split[0]
    const subNumber = split[1]
    const diff = split[2]
    const quality = split[3]
    const question = split[4]
    const answer = split[5]

    const q = {
      categoryNumber,
      subNumber,
      diff,
      quality,
      question,
      answer
    }
    return q
  }

  function generateQuestionHtml(q){
    const html = `
      <section>
      <h3>${q.question}</h3>
      <p>${q.answer}</p>

    
    `


  }

async function main() {
  const content = await fs.readFile('./questions.csv', 'utf8')
    const lines = content.split('\n').slice(0, 10)

    const questions = lines.map(parseLine)

    const qualityHistoryQuestions = questions.filter((q) => q.categoryNumber === '4' && q.quality === '3');
    console.log(qualityHistoryQuestions)

    const output = qualityHistoryQuestions.map(generateQuestionHtml).join
    const path = './dist/saga.html'
    fs.writeFile(path, output, 'utf8')
}

main().catch((error) => {
  console.error('error generating', error);
});
