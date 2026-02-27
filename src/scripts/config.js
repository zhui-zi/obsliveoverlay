import { DEFAULT_OVERLAY_CONFIG, normalizeFlowType, normalizeHexColor, normalizeMode, readConfigFromParams, serializeConfigToParams } from './shared/overlay-schema.js';
import { getAvailableThemeIds } from './shared/overlay-presets.js';

const iframe = document.getElementById('preview-frame');
const urlDisplay = document.getElementById('url-text');
const LOCAL_STORAGE_KEY = 'cyber_config_v3';

const COLOR_PRESETS = Object.freeze({
    yellowOrange: { color1: '#FACC15', color2: '#FB923C' },
    bluePurple: { color1: '#8BC34A', color2: '#9C6ADE' }
});

let currentState = { ...DEFAULT_OVERLAY_CONFIG };

const inputs = {
    announcement: document.getElementById('input-announcement'),
    game: document.getElementById('input-game'),
    speed: document.getElementById('input-speed'),
    ratio: document.getElementById('input-ratio'),
    leftAlign169: document.getElementById('input-left-align-169'),
    music: document.getElementById('input-music'),
    homepage: document.getElementById('input-homepage'),
    copyright: document.getElementById('input-copyright'),
    neon: document.getElementById('input-neon'),
    flowType: document.getElementById('input-flow-type'),
    color1: document.getElementById('color-picker-1'),
    color2: document.getElementById('color-picker-2'),
    colorPreset: document.getElementById('input-color-preset'),
    theme: document.getElementById('input-theme')
};

const labels = {
    speed: document.getElementById('val-speed'),
    color1: document.getElementById('val-color1'),
    color2: document.getElementById('val-color2')
};

const gameLabel = document.getElementById('label-game');

const btns = {
    resetColors: document.getElementById('btn-reset-colors'),
    copy: document.getElementById('btn-copy'),
    open: document.getElementById('btn-open')
};

function ensureThemeOptions() {
    if (!inputs.theme) return;
    const supportedThemeIds = getAvailableThemeIds();
    const themeLabels = {
        cyberpunk: '⚡ Cyberpunk Glitch'
    };
    inputs.theme.innerHTML = '';
    supportedThemeIds.forEach((themeId) => {
        const option = document.createElement('option');
        option.value = themeId;
        option.textContent = themeLabels[themeId] || themeId;
        inputs.theme.appendChild(option);
    });
}

function loadSettings() {
    try {
        const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const seedParams = serializeConfigToParams(parsed, DEFAULT_OVERLAY_CONFIG);
        currentState = readConfigFromParams(seedParams, {
            defaults: DEFAULT_OVERLAY_CONFIG,
            availableThemes: getAvailableThemeIds()
        });
    } catch (error) {
        console.error('Failed to load settings', error);
    }
}

function saveSettings() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
}

function resolveColorPresetKey(color1, color2) {
    const normalizedColor1 = String(color1 || '').toUpperCase();
    const normalizedColor2 = String(color2 || '').toUpperCase();

    const matchedPreset = Object.entries(COLOR_PRESETS).find(([, preset]) => {
        return preset.color1.toUpperCase() === normalizedColor1
            && preset.color2.toUpperCase() === normalizedColor2;
    });

    return matchedPreset ? matchedPreset[0] : 'custom';
}

function syncColorPresetInput() {
    if (!inputs.colorPreset) return;
    inputs.colorPreset.value = resolveColorPresetKey(currentState.color1, currentState.color2);
}

function applyColorPreset(presetKey) {
    const preset = COLOR_PRESETS[presetKey];
    if (!preset) return;

    currentState.color1 = preset.color1;
    currentState.color2 = preset.color2;

    if (inputs.color1) inputs.color1.value = currentState.color1;
    if (inputs.color2) inputs.color2.value = currentState.color2;
    syncColorPresetInput();
}

function updateGameInputMode() {
    const isChatMode = currentState.ratio === 'chat';
    if (gameLabel) gameLabel.textContent = isChatMode ? '杂谈主题 Chat Topic' : '游戏名 Game Name';
    if (inputs.game) inputs.game.value = isChatMode ? currentState.chatTopic : currentState.game;
}

function syncStateToForm() {
    if (inputs.announcement) inputs.announcement.value = currentState.announcement;
    if (inputs.speed) inputs.speed.value = String(currentState.speed);
    if (inputs.ratio) inputs.ratio.value = currentState.ratio;
    if (inputs.leftAlign169) inputs.leftAlign169.checked = !!currentState.leftAlign169;
    if (inputs.music) inputs.music.checked = currentState.music;
    if (inputs.homepage) inputs.homepage.checked = currentState.homepage;
    if (inputs.copyright) inputs.copyright.checked = currentState.copyright;
    if (inputs.neon) inputs.neon.checked = currentState.neon;
    if (inputs.flowType) inputs.flowType.value = currentState.flowType;
    if (inputs.color1) inputs.color1.value = currentState.color1;
    if (inputs.color2) inputs.color2.value = currentState.color2;
    syncColorPresetInput();
    if (inputs.theme) inputs.theme.value = currentState.theme;
    updateGameInputMode();
}

function updateUI() {
    if (labels.speed && inputs.speed) labels.speed.textContent = `${inputs.speed.value}s`;
    if (labels.color1 && inputs.color1) labels.color1.textContent = inputs.color1.value.toUpperCase();
    if (labels.color2 && inputs.color2) labels.color2.textContent = inputs.color2.value.toUpperCase();

    const card1 = document.getElementById('card-color-1');
    const card2 = document.getElementById('card-color-2');
    if (card1 && inputs.color1) card1.style.borderColor = inputs.color1.value;
    if (card2 && inputs.color2) card2.style.borderColor = inputs.color2.value;

    const isChatMode = currentState.ratio === 'chat';
    const is16x9Mode = currentState.ratio === '16:9';
    const neonRow = document.getElementById('row-neon');
    const flowRow = document.getElementById('row-flow-type');
    const leftAlignRow = document.getElementById('row-left-align-169');
    if (neonRow) neonRow.style.display = isChatMode ? 'none' : 'flex';
    if (flowRow) flowRow.style.display = isChatMode ? 'none' : 'flex';
    if (leftAlignRow) leftAlignRow.style.display = is16x9Mode ? 'flex' : 'none';
}

function updatePreview() {
    const params = serializeConfigToParams(currentState, DEFAULT_OVERLAY_CONFIG);
    const queryString = params.toString();

    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ type: 'updateConfig', queryString }, '*');
    }

    const fullUrl = new URL('overlay.html', window.location.href);
    fullUrl.search = queryString;
    if (urlDisplay) urlDisplay.textContent = fullUrl.href;
}

function applyInputChange(target) {
    if (!target) return;

    if (target === inputs.ratio) {
        currentState.ratio = normalizeMode(target.value, DEFAULT_OVERLAY_CONFIG.ratio);
        updateGameInputMode();
    } else if (target === inputs.game) {
        if (currentState.ratio === 'chat') {
            currentState.chatTopic = target.value;
        } else {
            currentState.game = target.value;
        }
    } else if (target === inputs.announcement) {
        currentState.announcement = target.value;
    } else if (target === inputs.speed) {
        currentState.speed = Number(target.value) || DEFAULT_OVERLAY_CONFIG.speed;
    } else if (target === inputs.leftAlign169) {
        currentState.leftAlign169 = !!target.checked;
    } else if (target === inputs.flowType) {
        currentState.flowType = normalizeFlowType(target.value, DEFAULT_OVERLAY_CONFIG.flowType);
    } else if (target === inputs.color1) {
        currentState.color1 = normalizeHexColor(target.value, DEFAULT_OVERLAY_CONFIG.color1);
        syncColorPresetInput();
    } else if (target === inputs.color2) {
        currentState.color2 = normalizeHexColor(target.value, DEFAULT_OVERLAY_CONFIG.color2);
        syncColorPresetInput();
    } else if (target === inputs.colorPreset) {
        if (target.value === 'custom') {
            syncColorPresetInput();
        } else {
            applyColorPreset(target.value);
        }
    } else if (target === inputs.theme) {
        currentState.theme = target.value || DEFAULT_OVERLAY_CONFIG.theme;
    } else if (target === inputs.music) {
        currentState.music = !!target.checked;
    } else if (target === inputs.homepage) {
        currentState.homepage = !!target.checked;
    } else if (target === inputs.copyright) {
        currentState.copyright = !!target.checked;
    } else if (target === inputs.neon) {
        currentState.neon = !!target.checked;
    }

    saveSettings();
    updateUI();
    updatePreview();
}

function bindInputs() {
    Object.values(inputs)
        .filter(Boolean)
        .forEach((element) => {
            element.addEventListener('input', (event) => applyInputChange(event.target));
            element.addEventListener('change', (event) => applyInputChange(event.target));
        });
}

function resetColors() {
    currentState.color1 = DEFAULT_OVERLAY_CONFIG.color1;
    currentState.color2 = DEFAULT_OVERLAY_CONFIG.color2;
    if (inputs.color1) inputs.color1.value = currentState.color1;
    if (inputs.color2) inputs.color2.value = currentState.color2;
    syncColorPresetInput();
    saveSettings();
    updateUI();
    updatePreview();
}

function copyURL() {
    const fullUrl = urlDisplay?.textContent || '';
    navigator.clipboard.writeText(fullUrl).then(() => showToast('✅ URL已复制 (Copied)!'));
}

function openFullscreen() {
    const fullUrl = urlDisplay?.textContent;
    if (fullUrl) window.open(fullUrl, '_blank');
}

function showToast(message) {
    const element = document.getElementById('toast');
    if (!element) return;
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => element.classList.remove('show'), 2000);
}

function fitPreview() {
    const container = document.getElementById('preview-container');
    const area = document.getElementById('preview-area');
    if (!container || !area) return;

    const baseWidth = 1920;
    const baseHeight = 1080;
    const availableWidth = area.clientWidth - 40;
    const availableHeight = area.clientHeight - 40;
    const scale = Math.min(availableWidth / baseWidth, availableHeight / baseHeight);
    container.style.transform = `scale(${scale})`;
}

function init() {
    ensureThemeOptions();
    loadSettings();
    syncStateToForm();
    updateUI();
    updatePreview();
    bindInputs();

    if (btns.resetColors) btns.resetColors.addEventListener('click', resetColors);
    if (btns.copy) btns.copy.addEventListener('click', copyURL);
    if (btns.open) btns.open.addEventListener('click', openFullscreen);

    window.addEventListener('resize', fitPreview);
    setTimeout(fitPreview, 100);
}

init();
