const THEME_PRESETS = Object.freeze({
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tokens: {
      '--panel-bg': 'rgba(8, 8, 12, 0.98)',
      '--panel-bg-solid': 'rgb(12, 12, 18)'
    }
  }
});

const LAYOUT_PRESETS = Object.freeze({
  chat: {
    id: 'chat',
    gameLabel: '📌 CHAT TOPIC',
    bodyClass: 'mode-chat',
    showFrame: false,
    showSideFillers: false,
    frameRect: { x: 10, width: 1920 },
    cssVars: {
      '--top-bar-height': '129px',
      '--bottom-bar-height': '128px',
      '--game-height': '823px'
    }
  },
  '21:9': {
    id: '21:9',
    gameLabel: '🎮 GAME NAME',
    bodyClass: '',
    showFrame: true,
    showSideFillers: false,
    frameRect: { x: 10, width: 1920 },
    cssVars: {
      '--top-bar-height': '129px',
      '--bottom-bar-height': '128px',
      '--game-height': '823px'
    }
  },
  '16:9': {
    id: '16:9',
    gameLabel: '🎮 GAME NAME',
    bodyClass: '',
    showFrame: true,
    showSideFillers: true,
    frameRect: { x: 238.5, width: 1463 },
    cssVars: {
      '--top-bar-height': '129px',
      '--bottom-bar-height': '128px',
      '--game-height': '823px'
    }
  }
});

function getAvailableThemeIds() {
  return Object.keys(THEME_PRESETS);
}

function resolveThemePreset(themeId) {
  return THEME_PRESETS[themeId] || THEME_PRESETS.cyberpunk;
}

function resolveLayoutPreset(mode) {
  return LAYOUT_PRESETS[mode] || LAYOUT_PRESETS.chat;
}

function applyCssVariables(root, tokenMap = {}) {
  if (!root || !tokenMap) return;
  Object.entries(tokenMap).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? `${normalized[0]}${normalized[0]}${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}`
    : normalized;
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return { r, g, b, hex: `#${value}`.toUpperCase() };
}

function buildColorTokens(color1, color2) {
  const primary = hexToRgb(color1);
  const accent = hexToRgb(color2);

  return {
    '--neon-green': primary.hex,
    '--primary-green': primary.hex,
    '--light-green': primary.hex,
    '--glow-green': `0 0 15px rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.8), 0 0 40px rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.4)`,
    '--neon-purple': accent.hex,
    '--primary-purple': accent.hex,
    '--light-purple': accent.hex,
    '--glow-purple': `0 0 15px rgba(${accent.r}, ${accent.g}, ${accent.b}, 0.8), 0 0 40px rgba(${accent.r}, ${accent.g}, ${accent.b}, 0.4)`
  };
}

export {
  THEME_PRESETS,
  LAYOUT_PRESETS,
  getAvailableThemeIds,
  resolveThemePreset,
  resolveLayoutPreset,
  applyCssVariables,
  buildColorTokens
};
