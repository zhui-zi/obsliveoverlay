# 🎮 OBS Streaming Overlay - Cyber Glitch Style

A cyberpunk/glitch-style OBS streaming overlay with 21:9 game area support.

## ✨ Features

- 🎨 **Cyberpunk Color Scheme**: Green (#4D7006) + Purple (#462BA5) theme
- 📺 **21:9 Game Area**: 1920×823 transparent game zone for ultrawide content
- 🌟 **Neon Flow Border**: SVG path animation + glitch effects around game frame
- 💬 **Danmaku Panel**: Top-right tech-cut chat area with scan line and glow effects
- 🎵 **Music Module**: Toggleable music display area (CSS variable controlled)
- ⚡ **Glitch Effects**: Noise, RGB split, flicker and more dynamic effects
- 🕐 **Real-time Clock**: Auto-updating time display with Orbitron font
- 🔴 **LIVE Badge**: Parallelogram style with pulse animation
- 🔲 **Unified Tech-Cut Borders**: All panels use consistent hexagonal clip-path design
- ✨ **Top Decorations**: Floating particles, data streams, matrix rain, status indicators
- 🌊 **Bottom Decorations**: Audio visualizer, circuit traces, progress bars, tech ring
- 📐 **Corner Decorations**: L-shaped glowing corners + pulse ring effects

## 📁 File Structure

```
obsliveoverlay/
├── overlay.html    # Main overlay file
├── README.md       # Documentation
└── LICENSE         # License file
```

## 🚀 Usage

### Adding to OBS

1. Open OBS Studio
2. Add a "Browser" source to your scene
3. Check "Local file" and select `overlay.html`
4. Set width: `1920`, height: `1080`
5. Place your game/video source below the overlay

### Layout Overview

```
┌──────────────────────────────────────────────────┐
│  Top Bar (129px) - Notice, Clock, LIVE Badge     │
├──────────────────────────────────────────────────┤
│                                          ┌────┐  │
│                                          │Chat│  │
│           Game Area (1920×823)           │Panel│ │
│             Transparent Zone             └────┘  │
│                                                  │
│                                      ┌─────────┐│
│                                      │ Avatar  ││
│                                      │  Area   ││
├──────────────────────────────────────┴─────────┘│
│  Bottom Bar (128px) - Game Name, Music Module    │
└──────────────────────────────────────────────────┘
```

## ⚙️ Configuration

### Modifying Text Content

Edit CSS variables in the `:root` section of `overlay.html`:

```css
:root {
  /* Text Content */
  --announcement-text: "Your announcement here!";  /* Notice bar text */
  --game-name-text: "Game Title";                  /* Game name */
  
  /* Music Module Toggle */
  --music-display: flex;  /* Show: flex | Hide: none */
}
```

### Show/Hide Music Module

In the `:root` CSS section, modify `--music-display`:

```css
/* Show music area */
--music-display: flex;

/* Hide music area */
--music-display: none;
```

### Custom Colors

Modify these variables in `:root`:

```css
:root {
  /* Primary Colors */
  --primary-green: #4D7006;    /* Main green */
  --neon-green: #8BC34A;       /* Neon green */
  --primary-purple: #462BA5;   /* Main purple */
  --neon-purple: #9C6ADE;      /* Neon purple */
}
```

## 📍 Overlay Sources

### Danmaku/Chat Area

The danmaku panel (`#danmakuArea`) is empty inside. In OBS you can:

1. Add another "Browser" source for chat display
2. Position it over the danmaku panel area (360×240 content area)

### Song Name

The music module song area (`#musicNameArea`) is empty. Overlay with:

1. Song info plugin output
2. Spotify/music player "Now Playing" source

### Avatar Area

Bottom-right 480×128 area is reserved for avatars:

1. VTuber model
2. Webcam feed
3. Other decorative elements

## 🎯 Design Elements

| Element | Description |
|---------|-------------|
| Neon Flow Border | SVG path animation with glitch shake effect |
| Tech-Cut Borders | Unified hexagonal clip-path design |
| Matrix Rain | Binary digits falling animation (top bar) |
| Status Indicators | ONLINE/REC/SIGNAL status lights |
| Floating Particles | Green/purple alternating glow particles |
| Data Streams | Vertical flowing light beams |
| Audio Visualizer | 8 bouncing audio bars (bottom bar) |
| Circuit Traces | Animated circuit board paths |
| Progress Bars | CPU/GPU/MEM simulated progress |
| Tech Ring | Dual-layer counter-rotating ring |
| Pulse Rings | Expanding circle animations |
| Scan Line | Top-to-bottom scanning light in chat panel |
| Noise Effect | Subtle global noise layer |
| RGB Split | Occasional color shift glitch effect |
| Data Ribbons | Horizontal flowing gradient strips |

## 📐 Technical Specifications

- **Resolution**: 1920 × 1080 (1080p)
- **Game Area**: 1920 × 823 (21:9 ratio)
- **Top Bar**: 129px
- **Bottom Bar**: 128px
- **Danmaku Panel**: 384 × 292px (360×240 content area)
- **Avatar Area**: 480 × 128px
- **Notice Bar**: 450px wide, 25s seamless scroll
- **Border Style**: Unified tech-cut (12-20px angles)
- **Clock Font**: Orbitron (Google Fonts)

## 🎨 Animation Effects

- Panel border glow pulsing
- Clock digit flickering
- LIVE badge scaling + glow
- Game name rainbow gradient flow
- Music icon rotation wobble
- Decorator bar wave animation
- Corner flash effects
- Global random glitch effect

## 📝 License

MIT License - Free to use and modify

---

Made with 💚💜 for streamers