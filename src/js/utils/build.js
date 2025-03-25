const fs = require('fs');
const path = require('path');

// CSS files to concatenate in order
const cssFiles = [
  'src/css/base/reset.css',
  'src/css/components/header.css',
  'src/css/components/footer.css',
  'src/css/components/auth.css',
  'src/css/components/services.css'
];

// Function to read CSS files
function readCSSFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
    console.log(`Successfully read ${filePath}`);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

// Concatenate CSS files
const combinedCSS = cssFiles
  .map(file => {
    try {
      return readCSSFile(file);
    } catch (err) {
      console.log(`Skipping ${file} - file not found`);
      return '';
    }
  })
  .join('\n\n');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Write the combined CSS
try {
  // During transition, write to both locations
  fs.writeFileSync('components.css', combinedCSS);
  fs.writeFileSync('dist/components.css', combinedCSS);
  console.log('CSS files successfully combined and written');
} catch (error) {
  console.error('Error writing combined CSS:', error);
} 