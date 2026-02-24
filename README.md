# OBS Cyberpunk Overlay

A lightweight, web-based broadcast overlay for OBS Studio featuring a configurable "Cyber Glitch" aesthetic. Built with Vanilla JS, CSS3 Variables, and Vite.

## Tech Stack

-   **Core**: HTML5, JavaScript (ES6+), CSS3 (Flexbox/Grid/Variables).
-   **Build**: Vite.
-   **Animation**: Pure CSS `keyframes` and `transform` for high performance/low CPU usage.
-   **No Frameworks**: Zero runtime dependencies on React/Vue for the overlay itself.

## Features

-   **Configurator Dashboard**: `index.html` provides a UI to customize settings and generates the final overlay URL.
-   **Multiple Modes**:
    -   **Standard (16:9)**: Gaming layout with "Cyber Fillers" to handle safe zones.
    -   **Chat**: Dynamic background animation for intermission scenes.
-   **State Persistence**: Configuration defaults are saved to `localStorage` for convenience.
-   **Reactive Theming**: Adjust primary/secondary styling colors via CSS variables (`--neon-green`, `--neon-purple`).
-   **Preset-Driven Core**: Theme and layout behavior are now centralized in reusable preset registries.

## Project Structure

```
.
├── index.html          # Configuration Dashboard (Entry point for users)
├── overlay.html        # Overlay View (Entry point for OBS Browser Source)
├── src/
│   ├── scripts/
│   │   ├── config.js   # Logic: Dashboard UI & URL Generation
│   │   └── overlay.js  # Logic: URL Parsing, DOM Manipulation, Effects
│   │   └── shared/
│   │       ├── overlay-schema.js  # Shared config schema/normalize/serialize
│   │       └── overlay-presets.js # Theme + layout preset registry
│   └── styles/
│       ├── config.css  # Styles: Dashboard
│       └── main.css    # Styles: Core Overlay Theme (Glitch, Neon, Layouts)
└── vite.config.js      # Build configuration
```

## Quick Start

### Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the dev server:
    ```bash
    npm run dev
    ```
3.  Navigate to `http://localhost:5173`.

### OBS Setup

1.  **Generate URL**: Open the deployed (or local) site, configure your text/colors/mode, and copy the generated URL.
2.  **Add Source**:
    -   Add a **Browser** source in OBS.
    -   Paste the URL.
    -   Set resolution to **1920x1080**.
    -   *(Optional)* Check "Shutdown source when not visible" to save resources.

## Configuration Parameters

The overlay behaves as a stateless function of the URL parameters:

| Parameter | Values | Description |
| :--- | :--- | :--- |
| `ratio` | `16-9`, `21-9`, `chat` | Layout mode. |
| `game` | *string* | Text for the "Game" footer module. |
| `topic` | *string* | Text for the "Topic" module (Chat mode). |
| `announcement` | *string* | Text for the top scrolling marquee. |
| `color1` | *hex* | Primary accent color (no `#`). |
| `color2` | *hex* | Secondary accent color (no `#`). |
| `theme` | `cyberpunk` / custom preset id | Overlay theme preset id. |

## Extending Themes & Layouts

### Add a New Theme Preset

1. Open `src/scripts/shared/overlay-presets.js`.
2. Add a new entry in `THEME_PRESETS`:
    - `id`: unique theme id.
    - `name`: human readable name.
    - `tokens`: CSS variable map (for panel/bg/base style tokens).
3. Keep color customization via `color1`/`color2` (already merged through `buildColorTokens`).

### Add a New Layout Preset

1. Open `src/scripts/shared/overlay-presets.js`.
2. Add a new entry in `LAYOUT_PRESETS`:
    - `gameLabel`: text for bottom-left module.
    - `bodyClass`: optional mode class (for custom CSS blocks).
    - `showFrame` / `showSideFillers`: visibility toggles.
    - `frameRect`: `{ x, width }` for game-frame SVG rects.
    - `cssVars`: layout-level CSS vars (e.g. `--top-bar-height`, `--game-height`).
3. Add an option in `index.html` (`#input-ratio`) if you want it selectable from dashboard.

### Why This Refactor Helps

- `config.js` and `overlay.js` now share one schema for defaults + parse + serialization.
- URL parameters remain the single source of truth.
- New themes/layouts usually only require editing preset objects rather than touching runtime logic.

## License

MIT
