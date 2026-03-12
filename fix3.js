
const fs = require('fs');
const fileCSS = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/src/styles/main-macos.css';
let css = fs.readFileSync(fileCSS, 'utf8');

css = css.replace(/\.info-row\s*\{\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*8px;/g, '.info-row {\n    display: flex; align-items: center; gap: 12px;');
css = css.replace(/gap:\s*8px;(?=\s*border-radius)/, 'gap: 12px;');

fs.writeFileSync(fileCSS, css, 'utf8');

