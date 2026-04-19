# obsliveoverlay

Minimalist, stateless OBS stream overlay built with Vanilla JS & CSS3. Zero backend, zero database, zero overhead.

## Features

- **Stateless Architecture**: Zero backend needed. All configurations are encoded in the URL.
- **Plug & Play**: Visual dashboard to generate OBS browser source URLs instantly.
- **Built-in Themes**: macOS Glass, Cyberpunk, Flat Capsule, iMessage, and Y2K Retro.
- **Performance Focused**: Lightweight Vanilla JS + CSS3 to keep OBS CPU usage to an absolute minimum.

## Quick Start

```bash
# Install dependencies
npm install

# Start local dev server & dashboard
npm run dev

# Build for production (outputs static files)
npm run build
```

## OBS Integration

1. Run `npm run dev` and open the local dashboard (`index.html`).
2. Tweak parameters (dimensions, text, themes) via the visual UI.
3. Copy the dynamically generated URL.
4. In OBS: Add Source -> **Browser**.
5. Paste the URL, set Width/Height (e.g., `1920` x `1080`), and check "Shutdown source when not visible".

## Project Structure

```text
├── index.html       # Visual dashboard (Control Panel)
├── overlay.html     # Actual overlay rendered in OBS
├── public/          # Ready-to-use CSS themes for OBS chat sources
└── src/             # Core scripts and styles
```

## License

MIT
