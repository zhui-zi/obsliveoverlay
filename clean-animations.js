
const fs = require('fs');
const fileCSS = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/src/styles/main-macos.css';
let css = fs.readFileSync(fileCSS, 'utf8');

css = css.replace(/@keyframes glass-shimmer\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.bar-section::before\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.bar-section > \*\s*\{[\s\S]*?\}/g, '');
css = css.replace(/@keyframes soft-breathe\s*\{[\s\S]*?\}/g, '');
css = css.replace(/@keyframes soft-bounce\s*\{[\s\S]*?\}/g, '');
css = css.replace(/#musicModule \.section-icon svg\s*\{[\s\S]*?\}/g, '');
css = css.replace(/\.music-section \.section-icon\s*\{[\s\S]*?\}/g, '');
css = css.replace(/position: relative; overflow: hidden;/g, '');

const cinematicLightEffects = '\\n/* --- Cinematic Light & Shadow Effects for OBS --- */\\n@keyframes dynamic-glass-shadow {\\n  0%, 100% {\\n    box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2);\\n    border-color: rgba(255,255,255,0.15);\\n  }\\n  50% {\\n    box-shadow: 0 25px 50px rgba(0,0,0,0.6), 0 0 15px rgba(255,255,255,0.08), inset 0 1px 3px rgba(255,255,255,0.35);\\n    border-color: rgba(255,255,255,0.3);\\n  }\\n}\\n@keyframes icon-radiance {\\n  0%, 100% {\\n    filter: brightness(1) drop-shadow(0 0 4px rgba(0,0,0,0.3));\\n  }\\n  50% {\\n    filter: brightness(1.15) drop-shadow(0 0 12px currentColor);\\n  }\\n}\\n@keyframes text-aurora {\\n  0%, 100% { text-shadow: 0 1px 3px rgba(0,0,0,0.4); opacity: 0.9; }\\n  50% { text-shadow: 0 1px 3px rgba(0,0,0,0.6), 0 0 12px rgba(255,255,255,0.25); opacity: 1; }\\n}\\n\\n.bar-section {\\n  animation: dynamic-glass-shadow 5s infinite ease-in-out;\\n}\\n.section-icon {\\n  animation: icon-radiance 4s infinite ease-in-out;\\n}\\n.section-text {\\n  animation: text-aurora 6s infinite ease-in-out;\\n}\\n';

css += '\\n' + cinematicLightEffects;
fs.writeFileSync(fileCSS, css, 'utf8');

