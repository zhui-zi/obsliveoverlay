// 初始化配置 - 从URL参数读取设置
// paramsSource: URLSearchParams 对象 (可选，默认读取当前URL)
function initConfiguration(paramsSource) {
  const params = paramsSource || new URLSearchParams(window.location.search);
  const root = document.documentElement;

  // Helper: Set CSS Variable
  const setVar = (name, val) => root.style.setProperty(name, val);

  // 1. 公告文字
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

  /**
   * 1.5 公告速度优化 (Smart Scroll Speed)
   * 之前的逻辑是固定时间跑完全程，导致长文本飞快。
   * 新逻辑: 基于文本长度动态计算时间，保持视觉速度恒定。
   * 基准: 设定 params.speed 为 "滚动 500px 长度所需的时间".
   */
  const updateMarqueeSpeed = () => {
      const el = document.querySelector('.announcement-text');
      if (!el) return;

      // 获取用户设置的基础速度 (默认 25s)
      let baseSpeed = 25;
      if (params.has('speed')) {
          baseSpeed = parseFloat(params.get('speed'));
      }

      // 等待下一帧以确保内容已渲染并能获取宽度
      requestAnimationFrame(() => {
          // scrollWidth 包含 ::after 伪元素的内容吗？
          // marquee scroll 是 translateX(-50%)，意味着全程跑完一半的宽度
          // 我们需要衡量单段文本的宽度。
          // 更好的方法是测量 offsetWidth 并除以 2 (因为 ::after 复制了一份)
          // 但考虑到 padding 等因素，我们直接用 scrollWidth / 2 近似视作“行程距离”
          
          let totalWidth = el.offsetWidth; 
          // 如果 offsetWidth 还没渲染出来 (例如 display:none)，则给个保底
          if (totalWidth < 100) totalWidth = 500; 

          // 假设基准宽度为 600px (约20个中文字)
          const refWidth = 600;
          
          // 行程距离 (translateX -50%)
          const distance = totalWidth / 2;
          
          // 计算实际时长: UserTime * (ActualDist / RefDist)
          // 限制最小倍率为 0.5，避免极短文本太慢（虽然通常不会）
          const factor = Math.max(0.5, distance / refWidth);
          const realDuration = baseSpeed * factor;

          el.style.setProperty('--scroll-speed', `${realDuration}s`);
      });
  };

  if (params.has('speed') || params.has('announcement')) {
      // 这里的调用可能获取不到宽度(因为还在init中)，所以用 setTimeout 延后一点
      setTimeout(updateMarqueeSpeed, 100);
      // 同时也监听可能的图片加载或字体加载
      window.addEventListener('load', updateMarqueeSpeed);
  } else {
     // 默认情况
     setTimeout(updateMarqueeSpeed, 100);
  }

  // 1.6 画面布局配置 (Layout Mode)
  // options: 21:9 (default), 16:9, chat
  const updateLayout = (mode) => {
      const body = document.body;
      const rects = ['rect-bg', 'rect-main', 'rect-glitch'].map(id => document.getElementById(id));
      const fillers = document.getElementById('sideFillers');
      const gameLabel = document.querySelector('.game-label');

      // Reset base states
      body.classList.remove('mode-chat');
      if(fillers) fillers.style.display = 'none';
      if(gameLabel) gameLabel.textContent = '🎮 GAME NAME';
      
      // Show/Reset Frame (hidden in CSS for mode-chat, but here reset attributes)
      rects.forEach(r => { if(r) { r.style.display = 'block'; } });

      if (mode === 'chat') {
          // Chat Mode Logic
          body.classList.add('mode-chat');
          if(gameLabel) gameLabel.textContent = '📌 CHAT TOPIC';
          // Frame hidden by CSS
      } else if (mode === '16:9') {
          // 16:9 Logic
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
          // Default 21:9 Logic
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

  // 2. 游戏名称
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

  // 3. 显示开关
  const setDisplay = (paramKey, cssVar) => {
    if (params.has(paramKey)) {
      const val = params.get(paramKey).toLowerCase();
      const isShow = (val === 'true' || val === '1' || val === 'on' || val === 'flex');
      setVar(cssVar, isShow ? 'flex' : 'none');

      // Special handling for music module layout shift
      if (paramKey === 'music') {
        if (!isShow) document.body.classList.add('music-hidden');
        else document.body.classList.remove('music-hidden');
      }
    }
  };

  setDisplay('music', '--music-display');
  
  // Neon Flow
  if (params.has('neon')) {
      const val = params.get('neon').toLowerCase();
      const isShow = (val === 'true' || val === '1' || val === 'on');
      setVar('--neon-visibility', isShow ? 'visible' : 'hidden');
      
      // Control 3D Background Visibility via CSS var if needed, or JS
      const bg = document.getElementById('three-bg');
      if (bg) bg.style.display = isShow ? 'block' : 'none';
  }

  // 3.5 Flow Effect Type
  // flowType: 'beam' (default) | 'glow'
  const flowType = params.get('flowType') || 'beam';
  const beamSvg = document.querySelector('.beam-svg');
  if (beamSvg) {
      // Remove all effect classes first
      beamSvg.classList.remove('effect-beam', 'effect-glow');
      // Add the selected one
      beamSvg.classList.add(`effect-${flowType}`);
  }

  setDisplay('homepage', '--homepage-display');
  setDisplay('copyright', '--copyright-display');

  // 4. 颜色
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

// 监听来自配置页面的实时预览消息
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'updateConfig') {
    const newParams = new URLSearchParams(event.data.queryString);
    initConfiguration(newParams);
    
    // 配置更新后，可能文字变了，需要重新计算速度
    // 给一点时间让DOM更新
    setTimeout(() => {
        // 由于 initConfiguration 内部已经包含了 updateMarqueeSpeed 的逻辑 (尽管是 setTimeout)，
        // 但那是基于 params.has 的条件。
        // 为了保险，我们可以再次显式触发一次逻辑，或者依赖 initConfiguration 内部的改进
        // 为了方便，我们在 initConfiguration 外部访问不到 updateMarqueeSpeed。
        // 但 initConfiguration 中每次执行都会重新定义并执行它。
    }, 200);
  }
});

// 时间更新
function updateClock() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  
  // 赛博模式时钟
  const cyberClock = document.getElementById("clock");
  if (cyberClock) cyberClock.textContent = timeStr;
  
}

// 启动
initConfiguration();
updateClock();
setInterval(updateClock, 1000);
