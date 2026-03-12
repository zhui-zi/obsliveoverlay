
const fs = require('fs');
const fileCSS = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/src/styles/main-macos.css';
let css = fs.readFileSync(fileCSS, 'utf8');

css = css.replace(/font-size:\s*22px;/, 'font-size: 28px;');
css = css.replace(/\.mac-panel-float.*?\{[\s\S]*?\}/g, '');
css = css.replace(/@keyframes fadeInSlideUp\s*\{[\s\S]*?(?=\.(mac-panel|mode-chat))/, '');
css = css.replace(/\.mac-panel\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.mac-panel:hover\s*\{[\s\S]*?\}/g, '');

fs.writeFileSync(fileCSS, css, 'utf8');

const fileHTML = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/overlay-macos.html';
let html = fs.readFileSync(fileHTML, 'utf8');
html = html.replace(/width="22" height="22"/g, 'width="28" height="28"');
fs.writeFileSync(fileHTML, html, 'utf8');

