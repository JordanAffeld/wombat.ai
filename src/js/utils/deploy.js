const fs = require('fs');
const path = require('path');

// Deployment configuration
const config = {
  sourceDir: '.',
  buildDir: 'dist',
  assets: ['assets', 'components', 'css'],
  htmlFiles: ['index.html', 'about-us.html', 'login.html', 'contact.html']
};

// Create build directory if it doesn't exist
if (!fs.existsSync(config.buildDir)) {
  fs.mkdirSync(config.buildDir);
}

// Copy assets
config.assets.forEach(asset => {
  if (fs.existsSync(asset)) {
    fs.cpSync(asset, path.join(config.buildDir, asset), { recursive: true });
  }
});

// Copy and process HTML files
config.htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Update asset paths for production
    content = content.replace(/components\.css/g, 'components.min.css');
    content = content.replace(/loadComponents\.js/g, 'bundle.min.js');
    fs.writeFileSync(path.join(config.buildDir, file), content);
  }
});

console.log('Deployment files prepared in dist/'); 