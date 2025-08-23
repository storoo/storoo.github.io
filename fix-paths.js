// Fix asset paths for GitHub Pages subdirectory deployment
const fs = require('fs');
const path = require('path');

function fixPathsInFile(filePath, basePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixedContent = content
    .replace(/href="\/_next\//g, `href="${basePath}/_next/`)
    .replace(/src="\/_next\//g, `src="${basePath}/_next/`)
    .replace(/"\/profile\.jpg"/g, `"${basePath}/profile.jpg"`);
  
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent);
    console.log(`Fixed paths in ${filePath}`);
  }
}

function fixAllPaths(dir, basePath) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixAllPaths(fullPath, basePath);
    } else if (file.endsWith('.html')) {
      fixPathsInFile(fullPath, basePath);
    }
  }
}

// Run the fix
const basePath = '/math.storoo';
const outDir = './out';
fixAllPaths(outDir, basePath);
console.log('Asset paths fixed for GitHub Pages deployment!');
