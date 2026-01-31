let loadListenerAttached = false;

function initConfiguration(paramsSource) {
  const params = paramsSource || new URLSearchParams(window.location.search);
  const root = document.documentElement;

  const setVar = (name, val) => root.style.setProperty(name, val);

  if (params.has('announcement')) {
    const text = params.get('announcement');
    setVar('--announcement-text', `"${text}"`);
    const el = document.querySelector('.announcement-text');
    if (el) {
      el.textContent = text;
      el.setAttribute('data-text', text);
    }
  } else if (!paramsSource) {
    const style = getComputedStyle(root);
    const text = style.getPropertyValue('--announcement-text').trim().replace(/^"|"$/g, '');
    const el = document.querySelector('.announcement-text');
    if (el && text) {
         el.textContent = text;
         el.setAttribute('data-text', text);
    }
  }

  const updateMarqueeSpeed = () => {
      const el = document.querySelector('.announcement-text');
      if (!el) return;

      let baseSpeed = 25;
      if (params.has('speed')) {
          baseSpeed = parseFloat(params.get('speed'));
      }

      requestAnimationFrame(() => {
          let totalWidth = el.offsetWidth; 
          if (totalWidth < 100) totalWidth = 500; 

          const refWidth = 600;
          const distance = totalWidth / 2;
          const factor = Math.max(0.5, distance / refWidth);
          const realDuration = baseSpeed * factor;

          el.style.setProperty('--scroll-speed', `${realDuration}s`);
      });
  };

    setTimeout(updateMarqueeSpeed, 100);
    if (!loadListenerAttached) {
      window.addEventListener('load', updateMarqueeSpeed);
      loadListenerAttached = true;
    }

  const updateLayout = (mode) => {
      const body = document.body;
      const rects = ['rect-bg', 'rect-main', 'rect-glitch'].map(id => document.getElementById(id));
      const fillers = document.getElementById('sideFillers');
      const gameLabel = document.querySelector('.game-label');

      body.classList.remove('mode-chat');
      if(fillers) fillers.style.display = 'none';
      if(gameLabel) gameLabel.textContent = '🎮 GAME NAME';
      
      rects.forEach(r => { if(r) { r.style.display = 'block'; } });

      if (mode === 'chat') {
          body.classList.add('mode-chat');
          if(gameLabel) gameLabel.textContent = '📌 CHAT TOPIC';
      } else if (mode === '16:9') {
          const w = 1463;
          const x = (1940 - w) / 2;
          
          rects.forEach(r => {
              if(r) { 
                  r.setAttribute('width', w); 
                  r.setAttribute('x', x); 
                  r.style.display = 'block';
              }
          });
          if(fillers) fillers.style.display = 'block';
      } else {
          rects.forEach(r => {
              if(r) { 
                  r.setAttribute('width', 1920); 
                  r.setAttribute('x', 10); 
                  r.style.display = 'block';
              }
          });
      }
  };

  if (params.has('ratio')) {
      updateLayout(params.get('ratio'));
  } else if (!paramsSource) {
      updateLayout('chat');
  }

  if (params.has('game')) {
    const text = params.get('game');
    setVar('--game-name-text', `"${text}"`);
    const el = document.getElementById('gameName');
    if(el) el.textContent = text;
  } else if (!paramsSource) {
    const style = getComputedStyle(root);
    const gameName = style.getPropertyValue('--game-name-text').trim().replace(/^"|"$/g, '');
    const el = document.getElementById('gameName');
    if (el) el.textContent = gameName;
  }

  const setDisplay = (paramKey, cssVar) => {
    if (params.has(paramKey)) {
      const val = params.get(paramKey).toLowerCase();
      const isShow = (val === 'true' || val === '1' || val === 'on' || val === 'flex');
      setVar(cssVar, isShow ? 'flex' : 'none');

      if (paramKey === 'music') {
        if (!isShow) document.body.classList.add('music-hidden');
        else document.body.classList.remove('music-hidden');
      }
    }
  };

  setDisplay('music', '--music-display');
  
  if (params.has('neon')) {
      const val = params.get('neon').toLowerCase();
      const isShow = (val === 'true' || val === '1' || val === 'on');
      setVar('--neon-visibility', isShow ? 'visible' : 'hidden');
      
      if (isShow) {
        document.body.classList.add('neon-enabled');
      } else {
        document.body.classList.remove('neon-enabled');
      }
      
      const bg = document.getElementById('three-bg');
      if (bg) bg.style.display = isShow ? 'block' : 'none';
  }

  const flowType = params.get('flowType') || 'beam';
  const beamSvg = document.querySelector('.beam-svg');
  if (beamSvg) {
      beamSvg.classList.remove('effect-beam', 'effect-glow');
      beamSvg.classList.add(`effect-${flowType}`);
  }

  setDisplay('homepage', '--homepage-display');
  setDisplay('copyright', '--copyright-display');

  const updateColor = (hex, type) => {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
      const r = parseInt(c.substring(0,2), 16);
      const g = parseInt(c.substring(2,4), 16);
      const b = parseInt(c.substring(4,6), 16);
      
      if (type === 'green') {
         setVar('--neon-green', `#${c}`);
         setVar('--primary-green', `#${c}`);
         setVar('--glow-green', `0 0 15px rgba(${r}, ${g}, ${b}, 0.8), 0 0 40px rgba(${r}, ${g}, ${b}, 0.4)`);
         setVar('--light-green', `#${c}`); 
      } else {
         setVar('--neon-purple', `#${c}`);
         setVar('--primary-purple', `#${c}`);
         setVar('--glow-purple', `0 0 15px rgba(${r}, ${g}, ${b}, 0.8), 0 0 40px rgba(${r}, ${g}, ${b}, 0.4)`);
         setVar('--light-purple', `#${c}`);
      }
  };

  if (params.has('color1')) updateColor(params.get('color1'), 'green');
  if (params.has('color2')) updateColor(params.get('color2'), 'purple');
}

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'updateConfig') {
    const newParams = new URLSearchParams(event.data.queryString);
    initConfiguration(newParams);
  }
});

function updateClock() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  
  const cyberClock = document.getElementById("clock");
  if (cyberClock) cyberClock.textContent = timeStr;
  
}

initConfiguration();
updateClock();
setInterval(updateClock, 1000);
