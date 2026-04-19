import { DEFAULT_OVERLAY_CONFIG, readConfigFromParams } from './shared/overlay-schema.js';
import { applyCssVariables, buildColorTokens, getAvailableThemeIds, resolveLayoutPreset, resolveThemePreset } from './shared/overlay-presets.js';

let loadListenerAttached = false;

const refs = {
  root: document.documentElement,
  body: document.body,
  announcementText: document.querySelector('.announcement-text'),
  gameName: document.getElementById('gameName'),
  gameLabel: document.querySelector('.game-label'),
  beamSvg: document.querySelector('.beam-svg'),
  sideFillers: document.getElementById('sideFillers'),
  clock: document.getElementById('clock'),
  minimalClock: document.getElementById('minimalClock'),
  minimalDate: document.getElementById('minimalDate'),
  frameRects: ['rect-bg', 'rect-main', 'rect-glitch'].map((id) => document.getElementById(id))
};

const DEFAULT_GRADIENT_STOPS = Object.freeze([
  { offset: '0%', color: 'var(--primary-green)' },
  { offset: '50%', color: 'var(--primary-purple)' },
  { offset: '100%', color: 'var(--primary-green)' }
]);

const MINIMAL_RAINBOW_STOPS = Object.freeze([
  { offset: '0%', color: '#FFA500' },
  { offset: '25%', color: '#FFFF00' },
  { offset: '50%', color: '#E0E0E0' },
  { offset: '75%', color: '#FFFF00' },
  { offset: '100%', color: '#FFA500' }
]);

const CENTERED_16_9 = Object.freeze({
  frameRect: { x: 238.5, y: 10, width: 1463, height: 823 },
  fillerLeftWidth: '230px',
  fillerRightWidth: '230px'
});

const LEFT_ALIGNED_16_9 = Object.freeze({
  frameRect: { x: 28.5, y: 10, width: 1463, height: 823 },
  fillerLeftWidth: '18px',
  fillerRightWidth: '440px'
});

function updateAnnouncement(text) {
  refs.root.style.setProperty('--announcement-text', `"${text}"`);
  if (!refs.announcementText) return;
  refs.announcementText.textContent = text;
  refs.announcementText.setAttribute('data-text', text);
}

function updateMarqueeSpeed(baseSpeed) {
  if (!refs.announcementText) return;
  requestAnimationFrame(() => {
    let totalWidth = refs.announcementText.offsetWidth;
    if (totalWidth < 100) totalWidth = 500;
    const factor = Math.max(0.5, totalWidth / 2 / 600);
    refs.announcementText.style.setProperty('--scroll-speed', `${baseSpeed * factor}s`);
  });
}

function applyLayout(mode, leftAlign169 = false) {
  const preset = resolveLayoutPreset(mode);
  const isMinimalLightTheme = refs.body?.dataset?.theme === 'minimal-light';
  const useLeftAligned16x9 = mode === '16:9' && leftAlign169;
  const layout16x9 = useLeftAligned16x9 ? LEFT_ALIGNED_16_9 : CENTERED_16_9;

  refs.body.classList.remove('mode-chat', 'mode-169-left');
  if (preset.bodyClass) refs.body.classList.add(preset.bodyClass);
  if (useLeftAligned16x9) refs.body.classList.add('mode-169-left');

  applyCssVariables(refs.root, preset.cssVars);
  refs.root.style.setProperty('--filler-left-width', mode === '16:9' ? layout16x9.fillerLeftWidth : '230px');
  refs.root.style.setProperty('--filler-right-width', mode === '16:9' ? layout16x9.fillerRightWidth : '230px');

  if (refs.gameLabel) refs.gameLabel.textContent = preset.gameLabel;
  if (refs.sideFillers) {
    refs.sideFillers.style.display = (!isMinimalLightTheme && preset.showSideFillers) ? 'block' : 'none';
  }

  let frameRect = mode === '16:9' ? layout16x9.frameRect : preset.frameRect;
  if (isMinimalLightTheme) {
    if (refs.beamSvg) refs.beamSvg.setAttribute('viewBox', '0 0 1920 1080');
    frameRect = { x: 152, y: 24, width: 1728, height: 972 };
  } else if (refs.beamSvg) {
    refs.beamSvg.setAttribute('viewBox', '0 0 1940 843');
  }

  refs.frameRects.forEach((rect) => {
    if (!rect) return;
    rect.style.display = (isMinimalLightTheme || preset.showFrame) ? 'block' : 'none';
    rect.setAttribute('width', frameRect.width);
    rect.setAttribute('x', frameRect.x);
    rect.setAttribute('y', frameRect.y);
    rect.setAttribute('height', frameRect.height);
    rect.setAttribute('rx', isMinimalLightTheme ? '0' : '30');
    rect.setAttribute('ry', isMinimalLightTheme ? '0' : '30');
  });

  if (isMinimalLightTheme) {
    refs.root.style.setProperty('--minimal-clock-left', `${frameRect.x}px`);
    refs.root.style.setProperty('--minimal-clock-right', `${1920 - (frameRect.x + frameRect.width)}px`);
    refs.root.style.setProperty('--minimal-clock-top', `${frameRect.y + frameRect.height + 8}px`);
  }
}

function applyBeamGradient(themeId) {
  const gradient = document.getElementById('beamGradient');
  if (!gradient) return;

  const stopPalette = themeId === 'minimal-light' ? MINIMAL_RAINBOW_STOPS : DEFAULT_GRADIENT_STOPS;
  gradient.replaceChildren();

  stopPalette.forEach((stopDef) => {
    const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop.setAttribute('offset', stopDef.offset);
    stop.style.stopColor = stopDef.color;
    stop.style.stopOpacity = '1';
    gradient.appendChild(stop);
  });
}

function applyTheme(themeId, color1, color2) {
  const themePreset = resolveThemePreset(themeId);
  refs.body.dataset.theme = themePreset.id;
  applyCssVariables(refs.root, themePreset.tokens);
  applyCssVariables(refs.root, buildColorTokens(color1, color2));
  applyBeamGradient(themeId);
}

function applyToggleState(config) {
  refs.root.style.setProperty('--music-display', config.music ? 'flex' : 'none');
  refs.root.style.setProperty('--homepage-display', config.homepage ? 'flex' : 'none');
  refs.root.style.setProperty('--copyright-display', config.copyright ? 'flex' : 'none');
  refs.root.style.setProperty('--neon-visibility', config.neon ? 'visible' : 'hidden');

  refs.body.classList.toggle('music-hidden', !config.music);
  refs.body.classList.toggle('neon-enabled', !!config.neon);
  refs.body.classList.toggle('no-text', !!config.noText);
}

function applyFlowEffect(flowType, themeId) {
  if (!refs.beamSvg) return;
  const finalFlowType = themeId === 'minimal-light' ? 'glow' : flowType;
  refs.beamSvg.classList.remove('effect-beam', 'effect-glow');
  refs.beamSvg.classList.add(`effect-${finalFlowType}`);
}

function applyGameText(text) {
  refs.root.style.setProperty('--game-name-text', `"${text}"`);
  if (refs.gameName) refs.gameName.textContent = text;
}

function applyConfig(paramsSource) {
  const params = paramsSource || new URLSearchParams(window.location.search);
  const config = readConfigFromParams(params, {
    defaults: DEFAULT_OVERLAY_CONFIG,
    availableThemes: getAvailableThemeIds()
  });

  const gameText = config.ratio === 'chat' ? config.chatTopic : config.game;

  updateAnnouncement(config.announcement);
  applyGameText(gameText);
  applyTheme(config.theme, config.color1, config.color2);
  applyLayout(config.ratio, config.leftAlign169);
  applyToggleState(config);
  applyFlowEffect(config.flowType, config.theme);

  setTimeout(() => updateMarqueeSpeed(config.speed), 100);
  if (!loadListenerAttached) {
    window.addEventListener('load', () => updateMarqueeSpeed(config.speed));
    loadListenerAttached = true;
  }
}

function updateClock() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  if (refs.clock) refs.clock.textContent = time;

  if (refs.minimalClock) {
    refs.minimalClock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  if (refs.minimalDate) {
    const jpDays = ['🌞 日', '🌙 月', '🔥 火', '💧 水', '🌲 木', '🌟 金', '🌍 土'];
    const weekday = jpDays[now.getDay()];
    refs.minimalDate.textContent = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} ${weekday}`;
  }
}

window.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'updateConfig') return;
  const params = new URLSearchParams(event.data.queryString || '');
  applyConfig(params);
});

applyConfig();
updateClock();
setInterval(updateClock, 1000);
