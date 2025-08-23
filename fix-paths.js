// Minimal path adjustments for GitHub Pages after static export.
// With basePath + assetPrefix configured in next.config.mjs most paths are correct.
// This script now only patches any remaining hard-coded absolute root href="/" that
// Next might serialize in preloaded data (defensive) to avoid accidental double-prefixing.
const fs = require('fs')
const path = require('path')

const basePath = '/math.storoo'
const outDir = path.join(__dirname, 'out')

function maybeFix(file) {
  const original = fs.readFileSync(file, 'utf8')
  let updated = original
  if (file.endsWith('.html') || file.endsWith('.js')) {
    // Replace href="/" with href="/math.storoo/" ONLY when not already followed by repo name
    updated = updated.replace(/href="\/(?!math\.storoo)/g, `href="${basePath}/`)
  }
  if (updated !== original) {
    fs.writeFileSync(file, updated)
    console.log('Patched', file)
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walk(full)
    else if (/\.(html|js)$/.test(entry)) maybeFix(full)
  }
}

if (fs.existsSync(outDir)) {
  walk(outDir)
  console.log('Post-export path patch complete.')
} else {
  console.warn('No out directory found to patch.')
}
