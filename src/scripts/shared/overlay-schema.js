const DEFAULT_OVERLAY_CONFIG = Object.freeze({
  announcement: '没啥好说的，都来我家喝酒吧！',
  game: 'Cities Skylines 2',
  chatTopic: 'Just Chatting / 杂谈',
  speed: 25,
  ratio: 'chat',
  music: false,
  homepage: false,
  copyright: false,
  neon: true,
  flowType: 'glow',
  color1: '#FACC15',
  color2: '#FB923C',
  theme: 'cyberpunk'
});

const LAYOUT_MODES = Object.freeze(['chat', '21:9', '16:9']);
const FLOW_TYPES = Object.freeze(['beam', 'glow']);

function clampNumber(value, min, max, fallback) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return fallback;
  return Math.min(max, Math.max(min, numberValue));
}

function parseBoolean(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (value == null) return fallback;
  const normalized = String(value).toLowerCase();
  if (['1', 'true', 'on', 'yes', 'y', 'flex'].includes(normalized)) return true;
  if (['0', 'false', 'off', 'no', 'n', 'none'].includes(normalized)) return false;
  return fallback;
}

function normalizeHexColor(value, fallback) {
  if (!value) return fallback;
  const source = String(value).trim();
  const withHash = source.startsWith('#') ? source : `#${source}`;
  const shortHex = /^#[0-9a-fA-F]{3}$/;
  const fullHex = /^#[0-9a-fA-F]{6}$/;
  if (fullHex.test(withHash)) return withHash.toUpperCase();
  if (shortHex.test(withHash)) {
    const r = withHash[1];
    const g = withHash[2];
    const b = withHash[3];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }
  return fallback;
}

function normalizeMode(value, fallback = DEFAULT_OVERLAY_CONFIG.ratio) {
  if (!value) return fallback;
  const mode = String(value);
  return LAYOUT_MODES.includes(mode) ? mode : fallback;
}

function normalizeFlowType(value, fallback = DEFAULT_OVERLAY_CONFIG.flowType) {
  if (!value) return fallback;
  const flowType = String(value);
  return FLOW_TYPES.includes(flowType) ? flowType : fallback;
}

function normalizeTheme(value, availableThemes, fallback = DEFAULT_OVERLAY_CONFIG.theme) {
  if (!value) return fallback;
  const theme = String(value);
  if (!Array.isArray(availableThemes) || availableThemes.length === 0) return theme;
  return availableThemes.includes(theme) ? theme : fallback;
}

function readConfigFromParams(params, options = {}) {
  const { defaults = DEFAULT_OVERLAY_CONFIG, availableThemes = [] } = options;
  const base = { ...defaults };

  if (!params) return base;

  const ratio = normalizeMode(params.get('ratio'), base.ratio);

  return {
    ...base,
    announcement: params.has('announcement') ? params.get('announcement') : base.announcement,
    game: params.has('game') ? params.get('game') : base.game,
    chatTopic: params.has('chatTopic') ? params.get('chatTopic') : base.chatTopic,
    speed: clampNumber(params.get('speed'), 5, 120, base.speed),
    ratio,
    music: parseBoolean(params.get('music'), base.music),
    homepage: parseBoolean(params.get('homepage'), base.homepage),
    copyright: parseBoolean(params.get('copyright'), base.copyright),
    neon: parseBoolean(params.get('neon'), base.neon),
    flowType: normalizeFlowType(params.get('flowType'), base.flowType),
    color1: normalizeHexColor(params.get('color1'), base.color1),
    color2: normalizeHexColor(params.get('color2'), base.color2),
    theme: normalizeTheme(params.get('theme'), availableThemes, base.theme)
  };
}

function serializeConfigToParams(config, defaults = DEFAULT_OVERLAY_CONFIG) {
  const state = { ...defaults, ...(config || {}) };
  const params = new URLSearchParams();

  if (state.announcement !== defaults.announcement) params.set('announcement', state.announcement);

  params.set('speed', String(clampNumber(state.speed, 5, 120, defaults.speed)));
  params.set('ratio', normalizeMode(state.ratio, defaults.ratio));

  params.set('music', state.music ? '1' : '0');
  params.set('homepage', state.homepage ? '1' : '0');
  params.set('copyright', state.copyright ? '1' : '0');
  params.set('neon', state.neon ? '1' : '0');
  params.set('flowType', normalizeFlowType(state.flowType, defaults.flowType));

  params.set('color1', normalizeHexColor(state.color1, defaults.color1));
  params.set('color2', normalizeHexColor(state.color2, defaults.color2));
  params.set('theme', state.theme || defaults.theme);

  const mainText = state.ratio === 'chat' ? state.chatTopic : state.game;
  const defaultMainText = state.ratio === 'chat' ? defaults.chatTopic : defaults.game;
  if (mainText !== defaultMainText) params.set('game', mainText);

  return params;
}

export {
  DEFAULT_OVERLAY_CONFIG,
  LAYOUT_MODES,
  FLOW_TYPES,
  parseBoolean,
  normalizeHexColor,
  normalizeMode,
  normalizeFlowType,
  normalizeTheme,
  readConfigFromParams,
  serializeConfigToParams
};
