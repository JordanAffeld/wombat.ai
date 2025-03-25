const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');

// Optimize CSS
function optimizeCSS(cssContent) {
  const output = new CleanCSS({
    level: 2,
    sourceMap: true
  }).minify(cssContent);
  
  return output.styles;
}

// Optimize JavaScript
function optimizeJS(jsContent) {
  const result = UglifyJS.minify(jsContent, {
    compress: true,
    mangle: true
  });
  
  return result.code;
}

// Process files
async function optimizeFiles() {
  // Optimize CSS
  const cssContent = fs.readFileSync('dist/components.css', 'utf8');
  const optimizedCSS = optimizeCSS(cssContent);
  fs.writeFileSync('dist/components.min.css', optimizedCSS);

  // Optimize JS
  const jsFiles = ['src/js/utils/loadComponents.js', 'src/js/utils/config.js'];
  const jsContents = {};
  
  jsFiles.forEach(file => {
    jsContents[file] = fs.readFileSync(file, 'utf8');
  });
  
  const optimizedJS = optimizeJS(jsContents);
  fs.writeFileSync('dist/bundle.min.js', optimizedJS);
}

optimizeFiles().catch(console.error); 