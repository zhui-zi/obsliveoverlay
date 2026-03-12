
const fs = require('fs');
const fileCSS = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/src/styles/main-macos.css';
let css = fs.readFileSync(fileCSS, 'utf8');

css = css.replace(/padding:\s*10px 24px 10px 14px;/, 'padding: 12px 28px 12px 18px;');
css = css.replace(/gap:\s*8px;/, 'gap: 12px;');

css = css.replace(/\.info-icon\s*\{[\s\S]*?width:\s*20px;\s*height:\s*20px;/g, '.info-icon {\n    width: 26px; height: 26px;');
css = css.replace(/\.info-icon svg\s*\{\s*width:\s*12px;\s*height:\s*12px;/g, '.info-icon svg { width: 16px; height: 16px;');

css = css.replace(/\.info-text\s*\{[\s\S]*?font-size:\s*14px;/, '.info-text {\n    font-size: 18px;');

fs.writeFileSync(fileCSS, css, 'utf8');

