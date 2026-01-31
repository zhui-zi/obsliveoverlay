/**
 * config.js
 * Logic for the OBS Overlay Configurator
 */

// --- State Management ---
const CONFIG_KEY_PREFIX = 'obs_overlay_';
const DEFAULTS = {
    announcement: "没啥好说的，都来我家喝酒吧！",
    speed: 25,
    ratio: 'chat',
    game: '周末杂谈',
    music: false,
    homepage: false,
    copyright: false,
    neon: true,
    flowType: 'beam',
    color1: '#8BC34A',
    color2: '#9C6ADE'
};

// UI Elements Map
const ui = {
    inputs: {
        announcement: document.getElementById('input-announcement'),
        speed: document.getElementById('input-speed'),
        ratio: document.getElementById('input-ratio'),
        game: document.getElementById('input-game'),
        flowType: document.getElementById('input-flow-type'),
        music: document.getElementById('input-music'),
        homepage: document.getElementById('input-homepage'),
        copyright: document.getElementById('input-copyright'),
        neon: document.getElementById('input-neon'),
        color1: document.getElementById('color-picker-1'),
        color2: document.getElementById('color-picker-2')
    },
    labels: {
        speed: document.getElementById('val-speed'),
        color1: document.getElementById('val-color1'),
        color2: document.getElementById('val-color2'),
        gameGroup: document.getElementById('label-game')
    },
    sections: {
        flowType: document.getElementById('row-flow-type'),
        neon: document.getElementById('row-neon')
    },
    preview: {
        frame: document.getElementById('preview-frame'),
        container: document.getElementById('preview-container'),
        area: document.getElementById('preview-area'),
        urlText: document.getElementById('url-text')
    },
    actions: {
        copy: document.getElementById('btn-copy'),
        open: document.getElementById('btn-open'),
        resetColors: document.getElementById('btn-reset-colors')
    },
    toast: document.getElementById('toast')
};

/**
 * Initialize the Configurator
 */
function init() {
    loadConfig();
    setupEventListeners();
    updateUI();
    
    // Initial resize
    setTimeout(resizePreview, 100);
    window.addEventListener('resize', resizePreview);
}

/**
 * Load configuration from LocalStorage or fallback to defaults
 */
function loadConfig() {
    Object.keys(DEFAULTS).forEach(key => {
        const saved = localStorage.getItem(CONFIG_KEY_PREFIX + key);
        const el = ui.inputs[key];
        
        if (!el) return;

        if (saved !== null) {
            if (el.type === 'checkbox') {
                el.checked = (saved === 'true');
            } else {
                el.value = saved;
            }
        } else {
            // Apply defaults if no saved data
            if (el.type === 'checkbox') {
                el.checked = DEFAULTS[key];
            } else {
                el.value = DEFAULTS[key];
            }
        }
    });

    // Validations for visual state (color styling etc)
    updateColorPreviews();
}

/**
 * Save current state to LocalStorage
 */
function saveConfig() {
    Object.keys(ui.inputs).forEach(key => {
        const el = ui.inputs[key];
        if (!el) return;
        
        const val = el.type === 'checkbox' ? el.checked : el.value;
        localStorage.setItem(CONFIG_KEY_PREFIX + key, val);
    });
}

/**
 * Attach listeners
 */
function setupEventListeners() {
    // Inputs
    Object.values(ui.inputs).forEach(el => {
        if(!el) return;
        el.addEventListener('input', () => handleInput(el));
        el.addEventListener('change', () => handleInput(el, true));
    });

    // Buttons
    ui.actions.copy.addEventListener('click', copyURL);
    ui.actions.open.addEventListener('click', () => {
        window.open(generateURL(), '_blank');
    });
    ui.actions.resetColors.addEventListener('click', resetColors);
    
    // Color inputs specific: Update background of the card immediately
    ui.inputs.color1.addEventListener('input', updateColorPreviews);
    ui.inputs.color2.addEventListener('input', updateColorPreviews);
}

/**
 * Handle input changes
 */
function handleInput(target, isChange = false) {
    updateUI();
    updateColorPreviews();
    saveConfig();
    
    // Post message to iframe for real-time updates
    const qs = generateQueryString();
    ui.preview.frame.contentWindow.postMessage({
        type: 'updateConfig',
        queryString: qs
    }, '*');
}

/**
 * Update UI Visuals (Conditionals, Labels)
 */
function updateUI() {
    // 1. Update Labels
    ui.labels.speed.textContent = `${ui.inputs.speed.value}s`;
    
    // 2. Logic: Chat Mode ? "Chat Topic" : "Game Name"
    const isChat = ui.inputs.ratio.value === 'chat';
    ui.labels.gameGroup.textContent = isChat ? '话题 Topic' : '游戏名 Game';
    
    // 3. Logic: Neon Toggle visibility
    // In Chat mode, neon might be handled differently, but based on previous logic:
    // If Chat mode -> Hide neon toggle (it's always on or handled by layout) -> NO, previous code hid it.
    // Let's keep logic: Hide Neon Toggle and Flow Type in Chat Mode if that was the intent,
    // OR just hide Flow Type if Neon is off.
    
    const isNeonOn = ui.inputs.neon.checked;
    
    // Logic from previous file: 
    // neonToggleRow.style.display = isChatMode ? 'none' : 'flex';
    // flowTypeRow.style.display = (isChatMode || !isNeonOn) ? 'none' : 'flex';

    if (ui.sections.neon) {
        ui.sections.neon.style.display = isChat ? 'none' : 'flex';
    }
    
    if (ui.sections.flowType) {
        // If chat mode, hide flow type. If neon off, hide flow type.
        ui.sections.flowType.style.display = (isChat || !isNeonOn) ? 'none' : 'flex';
    }

    // 4. Update URL Text
    ui.preview.urlText.textContent = generateURL();
}

/**
 * Generate the Query String
 */
function generateQueryString() {
    const params = new URLSearchParams();
    
    const add = (k, v) => params.set(k, v);
    
    // Texts
    add('announcement', ui.inputs.announcement.value);
    add('game', ui.inputs.game.value);
    
    // Numbers
    add('speed', ui.inputs.speed.value);
    
    // Selects
    add('ratio', ui.inputs.ratio.value);
    add('flowType', ui.inputs.flowType.value);
    
    // Toggles
    add('music', ui.inputs.music.checked);
    add('homepage', ui.inputs.homepage.checked);
    add('copyright', ui.inputs.copyright.checked);
    add('neon', ui.inputs.neon.checked);
    
    // Colors
    add('color1', ui.inputs.color1.value);
    add('color2', ui.inputs.color2.value);
    
    return params.toString();
}

function generateURL() {
    let path = window.location.pathname;
    if (path.endsWith('.html') || path.endsWith('/')) {
        path = path.substring(0, path.lastIndexOf('/'));
    }
    if (!path.endsWith('/')) path += '/';
    return `${window.location.protocol}//${window.location.host}${path}overlay.html?${generateQueryString()}`;
}


/**
 * Helper: Update Color Card Backgrounds
 */
function updateColorPreviews() {
    const c1 = ui.inputs.color1.value;
    const c2 = ui.inputs.color2.value;
    
    document.getElementById('card-color-1').style.background = `linear-gradient(135deg, ${c1}33, rgba(0,0,0,0.2))`;
    document.getElementById('card-color-1').style.borderColor = c1;
    ui.labels.color1.textContent = c1.toUpperCase();

    document.getElementById('card-color-2').style.background = `linear-gradient(135deg, ${c2}33, rgba(0,0,0,0.2))`;
    document.getElementById('card-color-2').style.borderColor = c2;
    ui.labels.color2.textContent = c2.toUpperCase();
}

function resetColors() {
    ui.inputs.color1.value = DEFAULTS.color1;
    ui.inputs.color2.value = DEFAULTS.color2;
    handleInput(ui.inputs.color1);
}

function resizePreview() {
    const { container, area } = ui.preview;
    if (!container || !area) return;
    
    const targetW = 1920;
    const targetH = 1080;
    const padding = 60;
    
    const availableW = area.clientWidth - padding;
    const availableH = area.clientHeight - padding;
    
    const scale = Math.min(availableW / targetW, availableH / targetH);
    
    // CSS handle centering via flexbox, we just set scale
    // Note: We need to handle the fact that scale affects layout space.
    // Ideally we use transform: scale() and let parent center it.
    // Parent is flex-center. 
    container.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function copyURL() {
    const url = generateURL();
    navigator.clipboard.writeText(url).then(() => {
        showToast("✅ Copied Overlay URL!");
    });
}

function showToast(msg) {
    const t = ui.toast;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => {
        t.classList.remove('show');
    }, 2000);
}

// Start
document.addEventListener('DOMContentLoaded', init);