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

## Project Structure

```
.
├── index.html          # Configuration Dashboard (Entry point for users)
├── overlay.html        # Overlay View (Entry point for OBS Browser Source)
├── src/
│   ├── scripts/
│   │   ├── config.js   # Logic: Dashboard UI & URL Generation
│   │   └── overlay.js  # Logic: URL Parsing, DOM Manipulation, Effects
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
| `theme` | `neon`, `default` | Toggles extra glow effects. |
| `game` | *string* | Text for the "Game" footer module. |
| `topic` | *string* | Text for the "Topic" module (Chat mode). |
| `announcement` | *string* | Text for the top scrolling marquee. |
| `color1` | *hex* | Primary accent color (no `#`). |
| `color2` | *hex* | Secondary accent color (no `#`). |

## License

MIT
