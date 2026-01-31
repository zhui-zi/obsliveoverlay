# OBS Cyber Glitch Overlay

![Version](https://img.shields.io/badge/version-1.0.0-cyan) ![License](https://img.shields.io/badge/license-MIT-purple) ![Tech](https://img.shields.io/badge/tech-Three.js%20%7C%20Vite-green)

[English](#english) | [中文说明](#中文说明)

An advanced, cyberpunk-themed OBS overlay with high customizability, dynamic visual effects, and multiple layout modes. Designed for streamers who want a futuristic, glitch-aesthetic look.

---

## <a name="english"></a>English

### ✨ Features

-   **Cyberpunk Aesthetic**: Glitch effects, neon glows, scrolling data streams, and futuristic fonts properly styled.
-   **Multiple Layout Modes**:
    -   **21:9 (Ultrawide)**: Full-width overlay designed for ultrawide gaming capture.
    -   **16:9 (Standard)**: Centered 16:9 gaming window with "Cyber Side Fillers" to fill empty space aesthetically.
    -   **Just Chatting**: A dedicated layout for chatting/intermission, featuring a large cam/content area and vertical data stacks.
-   **Visual Configuration Page**: Customize your overlay without touching a single line of code.
    -   **Live Preview**: See changes instantly as you adjust settings.
    -   **Toggle Modules**: Show/hide Music, Copyright, Homepage modules.
    -   **Customize Text**: Update Announcement marquee and Game Name.
    -   **Theme Colors**: Adjust the two primary neon colors (Green/Purple) to match your brand.
-   **Performance Optimized**: Built with pure HTML5/CSS3/Three.js. Lightweight and efficient.
-   **OBS Integration**: Runs native as a Browser Source with excellent transparency support.

### 🚀 Quick Start

#### 1. Deployment (Recommended)
Host this repository on **Cloudflare Pages**, **GitHub Pages**, or **Netlify**. This ensures a stable, accessible URL for OBS to load.

#### 2. Configuration
1.  Open your deployed site (e.g., `https://your-site.pages.dev/`).
2.  Use the **Configuration Panel** on the homepage.
3.  Adjust settings (Layout, Text, Colors, Effects).
4.  Click **"Copy Overlay URL"** at the bottom.

#### 3. Add to OBS
1.  In OBS Studio, add a new **Browser Source**.
2.  Paste the URL you just copied.
3.  Set **Width**: `1920` and **Height**: `1080`.
4.  Enable **"Shutdown source when not visible"** and **"Refresh browser when scene becomes active"** for best performance.

### ⚙️ URL Parameters

The overlay is stateless and controlled entirely via URL parameters.

| Parameter      | Description                                      | Example                    |
| :------------- | :----------------------------------------------- | :------------------------- |
| `ratio`        | Layout mode (`21:9`, `16:9`, `chat`)             | `?ratio=chat`              |
| `announcement` | Text for the top scrolling marquee               | `?announcement=Live Now!`  |
| `game`         | Text for the Game Name label                     | `?game=Valorant`           |
| `speed`        | Scroll speed for announcement (seconds)          | `?speed=20`                |
| `music`        | Show music module (`true`/`false`)               | `?music=true`              |
| `homepage`     | Show homepage URL (`true`/`false`)               | `?homepage=false`          |
| `copyright`    | Show copyright text (`true`/`false`)             | `?copyright=false`         |
| `neon`         | Toggle global neon effects (`true`/`false`)      | `?neon=true`               |
| `flowType`     | Neon animation style (`beam` or `glow`)          | `?flowType=beam`           |
| `color1`       | Primary Neon Color (Hex without #)               | `?color1=00ff00`           |
| `color2`       | Secondary Neon Color (Hex without #)             | `?color2=ff00ff`           |

### 🛠️ Development

To run this project locally for development/modification:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### License & Usage

This project is licensed under the [MIT License](LICENSE).
-   ✅ **Free to use** for personal or commercial streaming.
-   ✅ **Modifiable** to fit your brand.
-   ✅ **Open Source**.

Attribution to the original author (Keita) is appreciated but not mandatory.

---

## <a name="中文说明"></a>中文说明

### ✨ 主要功能

-   **赛博朋克美学**：包含故障艺术 (Glitch) 效果、霓虹发光、数据流动画和科技感字体。
-   **多种布局模式**：
    -   **21:9 (超宽屏)**：专为 21:9 超宽屏游戏设计的全宽覆盖层。
    -   **16:9 (标准)**：居中的 16:9 游戏窗口，两侧带有赛博装饰以美观地填补空白。
    -   **杂谈模式 (Just Chatting)**：专用的杂谈布局，拥有更大的展示区域，适合聊天或非游戏内容。
-   **可视化配置页面**：无需修改代码即可轻松定制。
    -   **实时预览**：调整参数时立即看到效果。
    -   **模块开关**：自由开启/关闭音乐、版权、主页显示模块。
    -   **自定义文本**：修改顶部公告栏和游戏/直播标题。
    -   **颜色主题**：自定义主/副霓虹色（覆盖默认的绿/紫配色）。
-   **性能优化**：基于 Three.js 和原生 Web 技术，轻量且高效。
-   **OBS 完美集成**：直接作为浏览器源运行，支持透明通道。

### 🚀 使用指南

#### 1. 部署 (推荐)
建议将此仓库部署到 **Cloudflare Pages**、**GitHub Pages** 或 **Netlify**。这样可以确保你在任何设备上都有一个稳定的 URL 在 OBS 中使用。

#### 2. 配置
1.  打开部署后的网站首页 (例如 `https://your-site.pages.dev/`).
2.  你会看到 **可视化配置面板**。
3.  根据喜好调整设置（文本、布局模式、颜色、特效）。
4.  点击底部的 **"复制覆盖层链接" (Copy Overlay URL)** 按钮。

#### 3. 添加到 OBS
1.  在 OBS Studio 中，添加一个新的 **浏览器源 (Browser Source)**。
2.  粘贴刚刚复制的 URL。
3.  设置 **宽度**: `1920`, **高度**: `1080`。
4.  勾选 **"源不可见时关闭"** 和 **"场景激活时刷新浏览器"** 以获得最佳性能。

### ⚙️ URL 参数说明

该覆盖层完全通过 URL 参数控制，无状态且易于分享配置。

| 参数             | 说明                                           | 示例                        |
| :------------- | :------------------------------------------- | :------------------------- |
| `ratio`        | 布局模式 (`21:9`, `16:9`, `chat`)              | `?ratio=chat`              |
| `announcement` | 顶部滚动公告栏文字                               | `?announcement=直播开始啦`   |
| `game`         | 游戏名称标签文字                                 | `?game=APEX`               |
| `speed`        | 公告滚动速度 (秒)，越小越快                         | `?speed=25`                |
| `music`        | 显示音乐模块 (`true`/`false`)                   | `?music=true`              |
| `homepage`     | 显示个人主页网址 (`true`/`false`)                 | `?homepage=false`          |
| `copyright`    | 显示版权信息 (`true`/`false`)                   | `?copyright=false`         |
| `neon`         | 全局霓虹灯效开关 (`true`/`false`)                | `?neon=true`               |
| `flowType`     | 霓虹动画风格 (`beam` 光束 / `glow` 呼吸)          | `?flowType=beam`           |
| `color1`       | 主霓虹色 (十六进制颜色，不带#)                     | `?color1=00ff00`           |
| `color2`       | 副霓虹色 (十六进制颜色，不带#)                     | `?color2=ff00ff`           |

### 🛠️ 开发指南

如果您想在本地运行或修改代码：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 许可证与使用权限

本项目采用 [MIT 许可证](LICENSE)。
-   ✅ **免费使用**：可自由用于个人或商业直播项目。
-   ✅ **自由修改**：您可以根据需要修改代码以适应您的形象。
