import cheerio from 'cheerio'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('./', import.meta.url))

;(async () => {
  const result = await fetch('https://bing.com/translator', {
    headers: {
      'Accept-Language': 'en-US,en'
    }
  })
  const body = await result.text()
  const $ = cheerio.load(body)
  const options = $('#t_tgtAllLang').children('option')
  const langMap = {}
  for (let i = 0, len = options.length, option; i < len; i++) {
    option = $(options[i])
    langMap[option.attr('value')] = option.text().trim()
  }
  console.log('✔️ Generated language map', langMap)
  fs.writeFileSync(
    path.resolve(__dirname, '../src/lang-list.js'),
    `export default JSON.parse(\`${JSON.stringify(langMap, null, 2)}\`)`,
    { charset: 'utf-8' }
  )

  // update ts definition
  await import('./generate-dts.js')
})()
