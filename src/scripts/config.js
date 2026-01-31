// Cyber Configurator Script

const iframe = document.getElementById('preview-frame');
const urlDisplay = document.getElementById('url-text');
const LOCAL_STORAGE_KEY = 'cyber_config_v2';

// Default Configuration
const defaults = {
    announcement: "没啥好说的，都来我家喝酒吧！",
    game: "Cities Skylines 2", 
    chatTopic: "Just Chatting / 杂谈", // Separate storage for chat
    speed: 25,
    ratio: 'chat', // Default to Chat
    music: false,
    homepage: false,
    copyright: false,
    neon: true,
    flowType: 'glow', // Default to Glow
    color1: '#8BC34A',
    color2: '#9C6ADE'
};

// Current State
let currentState = { ...defaults };

// DOM Elements
const inputs = {
    announcement: document.getElementById('input-announcement'),
    game: document.getElementById('input-game'),
    speed: document.getElementById('input-speed'),
    ratio: document.getElementById('input-ratio'),
    music: document.getElementById('input-music'),
    homepage: document.getElementById('input-homepage'),
    copyright: document.getElementById('input-copyright'),
    neon: document.getElementById('input-neon'),
    flowType: document.getElementById('input-flow-type'),
    color1: document.getElementById('color-picker-1'),
    color2: document.getElementById('color-picker-2')
};

// Label for dynamic text "Game" vs "Topic"
const gameLabel = document.getElementById('label-game');

const labels = {
    speed: document.getElementById('val-speed'),
    color1: document.getElementById('val-color1'),
    color2: document.getElementById('val-color2')
};

const btns = {
    resetColors: document.getElementById('btn-reset-colors'),
    copy: document.getElementById('btn-copy'),
    open: document.getElementById('btn-open')
};

// Initialize
function init() {
    // Load from LocalStorage
    loadSettings();

    // Set initial values
    inputs.announcement.value = currentState.announcement;
    inputs.speed.value = currentState.speed;
    inputs.ratio.value = currentState.ratio;
    
    // Initial Text Logic
    updateGameInputMode();
    
    inputs.music.checked = currentState.music;
    inputs.homepage.checked = currentState.homepage;
    inputs.copyright.checked = currentState.copyright;
    inputs.neon.checked = currentState.neon;
    inputs.flowType.value = currentState.flowType;

    inputs.color1.value = currentState.color1;
    inputs.color2.value = currentState.color2;

    updateUI();
    updatePreview();

    // Attach Listeners
    Object.values(inputs).forEach(el => {
        // Special handler for game input to sync state
        if (el === inputs.game) {
             el.addEventListener('input', (e) => {
                 if (currentState.ratio === 'chat') {
                     currentState.chatTopic = e.target.value;
                 } else {
                     currentState.game = e.target.value;
                 }
                 saveSettings();
                 updatePreview();
             });
        } 
        // Special handler for ratio change
        else if (el === inputs.ratio) {
            el.addEventListener('change', (e) => {
                currentState.ratio = e.target.value;
                updateGameInputMode();
                handleInput(); 
            });
        }
        else {
            el.addEventListener('input', handleInput);
            el.addEventListener('change', handleInput);
        }
    });

    btns.resetColors.addEventListener('click', resetColors);
    btns.copy.addEventListener('click', copyURL);
    btns.open.addEventListener('click', openFullscreen);
}

function loadSettings() {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            currentState = { ...defaults, ...parsed };
        }
    } catch(e) {
        console.error("Failed to load settings", e);
    }
}

function saveSettings() {
    // For game/topic, we need to ensure we save the raw values, not just what's in input
    // The currentState object is the source of truth for saving.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentState));
}

function updateGameInputMode() {
    const isChat = (currentState.ratio === 'chat');
    if (isChat) {
        if (gameLabel) gameLabel.textContent = "杂谈主题 Chat Topic";
        inputs.game.value = currentState.chatTopic;
    } else {
        if (gameLabel) gameLabel.textContent = "游戏名 Game Name";
        inputs.game.value = currentState.game;
    }
}

function handleInput(e) {
    // Update State from Inputs
    if (e && e.target) {
        const t = e.target;
        if (t === inputs.ratio) {
            // Handled separately
        } else if (t.type === 'checkbox') {
            currentState[t.id.replace('input-', '')] = t.checked;
        } else if (t === inputs.announcement || t === inputs.speed || t === inputs.flowType) {
             currentState[t.id.replace('input-', '')] = t.value;
        } else if (t.type === 'color') {
             // Handled visually in updateUI, but save state here
             if (t === inputs.color1) currentState.color1 = t.value;
             if (t === inputs.color2) currentState.color2 = t.value;
        }
    }
    
    saveSettings();
    updateUI();
    updatePreview();
}

// Auto-scale Preview
function fitPreview() {
    const container = document.getElementById('preview-container');
    const area = document.getElementById('preview-area');
    if (!container || !area) return;

    // Target dimensions
    const baseW = 1920;
    const baseH = 1080;
    
    // Available space (with padding)
    const availW = area.clientWidth - 40;
    const availH = area.clientHeight - 40;

    const scale = Math.min(availW / baseW, availH / baseH);
    
    // Apply
    container.style.transform = `scale(${scale})`;
}

// Hook resize
window.addEventListener('resize', fitPreview);

function updateUI() {
    labels.speed.textContent = inputs.speed.value + 's';
    labels.color1.textContent = inputs.color1.value.toUpperCase();
    labels.color2.textContent = inputs.color2.value.toUpperCase();

    // Visual feedback for cards
    const card1 = document.getElementById('card-color-1');
    const card2 = document.getElementById('card-color-2');
    if (card1) card1.style.borderColor = inputs.color1.value;
    if (card2) card2.style.borderColor = inputs.color2.value;

    // Logic: Hide Neon toggle group in Chat mode (and maybe Flow Type)
    // Actually, user wants 'Chat Effect' background logic maybe?
    // User request: stream effect visible in chat? No, user requested 'Chat Mode Dynamic BG' separate from Neon line.
    // The Neon switch controls the 'beam/glow' line on Game Frame. Game Frame is hidden in Chat Mode.
    // So hiding Neon switch in Chat Mode is correct.
    const isChatMode = (currentState.ratio === 'chat');
    const neonRow = document.getElementById('row-neon');
    const flowRow = document.getElementById('row-flow-type');
    
    if (isChatMode) {
        if(neonRow) neonRow.style.display = 'none';
        if(flowRow) flowRow.style.display = 'none';
    } else {
        if(neonRow) neonRow.style.display = 'flex';
        if(flowRow) flowRow.style.display = 'flex';
    }
}

function generateParams() {
    const params = new URLSearchParams();

    if (currentState.announcement !== defaults.announcement) 
        params.set('announcement', currentState.announcement);
    
    // Logic: Send 'game' param based on mode. 
    // Overlay only knows 'game', so we send whichever text is appropriate.
    if (currentState.ratio === 'chat') {
        params.set('game', currentState.chatTopic);
    } else {
        if (currentState.game !== defaults.game)
            params.set('game', currentState.game);
    }

    // Speed always set to ensure JS calculation works
    params.set('speed', currentState.speed);

    // Mode
    params.set('ratio', currentState.ratio);

    // Toggles - Explicitly send '1' or '0' to ensure state updates correctly
    params.set('music', currentState.music ? '1' : '0');
    params.set('homepage', currentState.homepage ? '1' : '0');
    params.set('copyright', currentState.copyright ? '1' : '0');
    params.set('neon', currentState.neon ? '1' : '0');
    
    // Flow Type
    params.set('flowType', currentState.flowType);

    // Colors
    params.set('color1', currentState.color1);
    params.set('color2', currentState.color2);

    return params;
}

function updatePreview() {
    const params = generateParams();
    const queryString = params.toString();
    
    // Send to iframe
    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            type: 'updateConfig',
            queryString: queryString
        }, '*');
    }

    // Update URL Text
    const fullUrl = new URL('overlay.html', window.location.href);
    fullUrl.search = queryString;
    urlDisplay.textContent = fullUrl.href;
}

function resetColors() {
    currentState.color1 = defaults.color1;
    currentState.color2 = defaults.color2;
    // Update inputs visual
    inputs.color1.value = defaults.color1;
    inputs.color2.value = defaults.color2;
    handleInput(); 
}

function copyURL() {
    const fullUrl = urlDisplay.textContent;
    navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('✅ URL已复制 (Copied)!');
    });
}

function openFullscreen() {
    const fullUrl = urlDisplay.textContent;
    window.open(fullUrl, '_blank');
}

function showToast(msg) {
    const el = document.getElementById('toast');
    if(el) {
        el.textContent = msg;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 2000);
    }
}

// Start
init();
// Initial fit
setTimeout(fitPreview, 100);
