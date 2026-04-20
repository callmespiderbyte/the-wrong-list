// Generate Instagram-portrait (1080x1350) share images for each profile.
// Usage:
//   node scripts/generate-share-cards.mjs              -> generates all
//   node scripts/generate-share-cards.mjs alley-marsh  -> generates one
//
// Requires the dev server to be running on http://localhost:3000

import puppeteer from 'puppeteer'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT_DIR = resolve(ROOT, 'public/share-cards')
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

async function main() {
  const peopleData = JSON.parse(
    await readFile(resolve(ROOT, 'data/people.json'), 'utf-8')
  )

  const filterId = process.argv[2]
  const targets = filterId
    ? peopleData.filter((p) => p.id === filterId)
    : peopleData.filter((p) => p.id !== 'jomiro')

  if (targets.length === 0) {
    console.error(`No matching profile for id "${filterId}"`)
    process.exit(1)
  }

  await mkdir(OUT_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    defaultViewport: { width: 1080, height: 1350, deviceScaleFactor: 2 },
  })
  const page = await browser.newPage()

  for (const person of targets) {
    const url = `${BASE_URL}/share/${person.id}`
    console.log(`→ ${person.id}  ${url}`)

    await page.goto(url, { waitUntil: 'networkidle0' })

    // Hide page-level chrome we don't want in the capture
    await page.addStyleTag({
      content: `
        footer, [class*="PageTransition"], div[style*="position: fixed"][style*="bottom"][style*="left"] { display: none !important; }
      `,
    })

    // Wait for fonts to settle
    await page.evaluateHandle('document.fonts.ready')
    await new Promise((r) => setTimeout(r, 250))

    const buf = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1080, height: 1350 },
    })
    const outPath = resolve(OUT_DIR, `${person.id}.png`)
    await writeFile(outPath, buf)
    console.log(`   saved → public/share-cards/${person.id}.png`)
  }

  await browser.close()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
