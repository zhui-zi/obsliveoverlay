
const fs = require('fs');
const fileCSS = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/src/styles/main-macos.css';
let css = fs.readFileSync(fileCSS, 'utf8');

css = css.replace(/@keyframes pulse-live[\s\S]*?(?=\n\s*\.menubar-icon)/, 
'@keyframes pulse-live {\\n  0% { box-shadow: 0 0 0 0 rgba(255, 95, 86, 0.6); }\\n  70% { box-shadow: 0 0 0 6px rgba(255, 95, 86, 0); }\\n  100% { box-shadow: 0 0 0 0 rgba(255, 95, 86, 0); }\\n}');

const shimmerCSS = '\\n@keyframes glass-shimmer {\\n  0% { transform: translateX(-150%) skewX(-15deg); }\\n  20%, 100% { transform: translateX(250%) skewX(-15deg); }\\n}\\n.bar-section { position: relative; overflow: hidden; }\\n.bar-section::before {\\n  content: \\'\\'; display: block; position: absolute;\\n  top: 0; left: 0; width: 50%; height: 100%;\\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);\\n  pointer-events: none; z-index: 0;\\n  animation: glass-shimmer 8s infinite linear;\\n}\\n.bar-section > * { z-index: 1; position: relative; }\\n';

css = css.replace(/(\.bar-section\s*\{[\s\S]*?\})/, '\' + shimmerCSS);

const iconAnimCSS = '\\n@keyframes soft-breathe {\\n  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(255,255,255,0)); }\\n  50% { transform: scale(1.08); filter: drop-shadow(0 0 8px rgba(255,255,255,0.3)); }\\n}\\n@keyframes soft-bounce {\\n  0%, 100% { transform: translateY(0); }\\n  50% { transform: translateY(-2px); }\\n}\\n#musicModule .section-icon svg { animation: soft-bounce 4s infinite ease-in-out; }\\n.music-section .section-icon { animation: soft-breathe 4s infinite ease-in-out; }\\n';

css += '\\n' + iconAnimCSS;

fs.writeFileSync(fileCSS, css, 'utf8');

