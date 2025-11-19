const fs = require('fs');
const path = require('path');

const basePath = '/Volumes/ext-data/github/mental-health-education-platform/github-deployment';

// Find all course directories
const courseDirs = fs.readdirSync(basePath).filter(dir =>
  dir.startsWith('course-') && fs.statSync(path.join(basePath, dir)).isDirectory()
);

courseDirs.forEach(courseDir => {
  const coursePath = path.join(basePath, courseDir);
  const indexPath = path.join(coursePath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log(`⚠ Skipping ${courseDir} - no index.html`);
    return;
  }

  // Find the actual image file in this directory
  const files = fs.readdirSync(coursePath);
  const imageFile = files.find(f => f.endsWith('.jpg') || f.endsWith('.png'));

  if (!imageFile) {
    console.log(`⚠ ${courseDir} - No image found`);
    return;
  }

  // Update the index.html to use the correct image filename
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace any existing image src patterns
  html = html.replace(
    /src="[^"]*\.(jpg|png)"/g,
    `src="${imageFile}"`
  );

  fs.writeFileSync(indexPath, html);
  console.log(`✓ ${courseDir} -> ${imageFile}`);
});

console.log('\n✅ All image paths fixed!');
