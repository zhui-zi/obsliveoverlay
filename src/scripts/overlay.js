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
  frameRects: ['rect-bg', 'rect-main', 'rect-glitch'].map((id) => document.getElementById(id))
};

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

function applyLayout(mode) {
  const preset = resolveLayoutPreset(mode);

  refs.body.classList.remove('mode-chat');
  if (preset.bodyClass) refs.body.classList.add(preset.bodyClass);

  applyCssVariables(refs.root, preset.cssVars);

  if (refs.gameLabel) refs.gameLabel.textContent = preset.gameLabel;
  if (refs.sideFillers) refs.sideFillers.style.display = preset.showSideFillers ? 'block' : 'none';

  refs.frameRects.forEach((rect) => {
    if (!rect) return;
    rect.style.display = preset.showFrame ? 'block' : 'none';
    rect.setAttribute('width', preset.frameRect.width);
    rect.setAttribute('x', preset.frameRect.x);
  });
}

function applyTheme(themeId, color1, color2) {
  const themePreset = resolveThemePreset(themeId);
  refs.body.dataset.theme = themePreset.id;
  applyCssVariables(refs.root, themePreset.tokens);
  applyCssVariables(refs.root, buildColorTokens(color1, color2));
}

function applyToggleState(config) {
  refs.root.style.setProperty('--music-display', config.music ? 'flex' : 'none');
  refs.root.style.setProperty('--homepage-display', config.homepage ? 'flex' : 'none');
  refs.root.style.setProperty('--copyright-display', config.copyright ? 'flex' : 'none');
  refs.root.style.setProperty('--neon-visibility', config.neon ? 'visible' : 'hidden');

  refs.body.classList.toggle('music-hidden', !config.music);
  refs.body.classList.toggle('neon-enabled', !!config.neon);
}

function applyFlowEffect(flowType) {
  if (!refs.beamSvg) return;
  refs.beamSvg.classList.remove('effect-beam', 'effect-glow');
  refs.beamSvg.classList.add(`effect-${flowType}`);
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
  applyLayout(config.ratio);
  applyTheme(config.theme, config.color1, config.color2);
  applyToggleState(config);
  applyFlowEffect(config.flowType);

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
}

window.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'updateConfig') return;
  const params = new URLSearchParams(event.data.queryString || '');
  applyConfig(params);
});

applyConfig();
updateClock();
setInterval(updateClock, 1000);
