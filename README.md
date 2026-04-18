# OBS Live Overlay

A highly customizable, stateless web-based broadcast overlay for OBS Studio. Built purely with Vanilla JS, CSS3, and Vite. Zero heavy reactive frameworks, ensuring maximum performance and minimal OBS CPU usage.

## Features

- **Multiple Themes**: Supports specific aesthetic presets, including the glossy macOS Glassmorphism, neon Cyberpunk, and Flat Capsule.
- **Stateless Architecture**: The overlay behaves entirely as a function of its URL parameters. No backend or database required.
- **Dynamic Layouts**: Seamlessly switches between Gaming (16:9) and Just Chatting modes.
- **No-Text Mode**: Clean, icon-only, compact minimal layout.
- **Configurator Dashboard**: A built-in GUI to tweak values and generate the deployable Browser Source URL.
- **High Performance**: Heavy reliance on CSS hardware-accelerated transforms (	ranslate3d), CSS variables, and native DOM manipulation.

## Quick Start

### Installation

`ash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (outputs static files to /dist)
npm run build
`

### OBS Integration

1. Open the UI Configurator dashboard (locally via dev server or via static deployment).
2. Tweak settings (Layout, Theme, Text inputs).
3. Copy the dynamically generated Web URL.
4. In OBS Studio, add a new **Browser Source**.
5. Paste the URL. Set width to **1920** and height to **1080**.
6. (Recommended) Check "Shutdown source when not visible".

## Project Structure

`
.
©À©¤©¤ index.html            # Configuration Dashboard Entry
©À©¤©¤ overlay.html          # Core Theme Overlay Entry
©À©¤©¤ overlay-macos.html    # macOS Theme Overlay Entry
©À©¤©¤ src/
©¦   ©À©¤©¤ scripts/
©¦   ©¦   ©À©¤©¤ config.js     # Configurator Dashboard Logic
©¦   ©¦   ©À©¤©¤ overlay.js    # Overlay Payload Parser & DOM Injector
©¦   ©¦   ©¸©¤©¤ shared/       # Shared State Schemas & Theme Configuration
©¦   ©¸©¤©¤ styles/
©¦       ©À©¤©¤ config.css    # Admin Panel UI
©¦       ©À©¤©¤ main.css      # Core Styles
©¦       ©¸©¤©¤ main-macos.css# macOS Custom Layout Rules
©¸©¤©¤ vite.config.js        # Vite Build Rules
`

## Creating a New Theme

Themes are managed centrally via preset dictionaries to keep the logic modular.

1. Open src/scripts/shared/overlay-presets.js.
2. Append your theme object inside THEME_PRESETS.
3. Map any conditional UI logic in config.js (updateUI).
4. (Optional) Create a standalone overlay-{theme}.html and respective .css file if the HTML DOM structure heavily deviates from the default template.
5. Check [docs/CSS_DOM_GUIDE.md](docs/CSS_DOM_GUIDE.md) for detailed documentation on internal CSS and DOM Structures.

## URL Parameters Schema

| Parameter      | Type   | Description |
| :------------- | :----- | :---------- |
| 	heme        | String | Theme ID (macos, cyberpunk). |
| atio        | Enum   | Layout Mode: 16:9, 21:9, chat. |
| 
otext       | Enum   | 	rue or alse. Compacts layout to icons only. |
| color1/color2| Hex    | Primary/Secondary accent colors (Exclude #). |
| game         | String | Current game/category string. |
| 	opic        | String | Chat topic string. |
| nnouncement | String | Intermission scrolling text. |
| homepage     | String | Display URI for creator website. |
| copyright    | String | Broadcast stream copyright string. |

## License

MIT

