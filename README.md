# OBS Cyber Glitch Overlay

[English](#english) | [中文说明](#中文说明)

An advanced, cyberpunk-themed OBS overlay with high customizability, dynamic visual effects, and multiple layout modes. Designed for streamers who want a futuristic, glitch-aesthetic look.

## <a name="english"></a>English

### Features

-   **Cyberpunk Aesthetic**: Glitch effects, neon glows, data streams, and futuristic fonts.
-   **Multiple Layout Modes**:
    -   **21:9 (Ultrawide)**: Full-width overlay for ultrawide gaming.
    -   **16:9 (Standard)**: Centered 16:9 gaming window with "Cyber Side Fillers" to fill empty space.
    -   **Just Chatting**: A dedicated layout for chatting, with a large cam/content area, vertical data stacks, and optimized readability.
-   **Visual Configuration Page**: easily customize your overlay without touching code.
    -   Live preview of changes.
    -   Toggle modules (Music, Copyright, Homepage).
    -   Customize texts (Announcement, Game Name).
    -   Adjust colors (Neon Green/Purple theme).
-   **Performance Optimized**: Pure HTML/CSS/JS. No heavy frameworks.
-   **OBS Integration**: Runs directly as a Browser Source.

### Quick Start

1.  **Deployment (Recommended)**:
    -   Deploy this repository to **Cloudflare Pages** (or GitHub Pages/Netlify).
    -   This ensures you have a stable URL to use in OBS across different devices.

2.  **Configuration**:
    -   Open the deployed site (e.g., `https://your-site.pages.dev/`).
    -   You will see the **Configuration Panel**.
    -   Adjust the settings (Text, Layout, Colors) to your liking.
    -   Click the **"Copy Overlay URL"** (复制覆盖层链接) button.

3.  **Add to OBS**:
    -   In OBS Studio, add a new **Browser Source**.
    -   Paste the URL you just copied.
    -   Set Width: `1920`, Height: `1080`.
    -   Enable "Shutdown source when not visible" and "Refresh browser when scene becomes active" for best performance.

### URL Parameters

The overlay is controlled entirely via URL parameters, making it stateless and easy to share.

| Parameter      | Description                                      | Example                    |
| :------------- | :----------------------------------------------- | :------------------------- |
| `ratio`        | Layout mode (`21:9`, `16:9`, `chat`)             | `?ratio=chat`              |
| `announcement` | Text for the scrolling marquee                   | `?announcement=Hello`      |
| `game`         | Text for the Game Name label                     | `?game=Valorant`           |
| `speed`        | Scroll speed for announcement (seconds)          | `?speed=20`                |
| `music`        | Show music module (`true`/`false`)               | `?music=true`              |
| `homepage`     | Show homepage URL (`true`/`false`)               | `?homepage=false`          |
| `copyright`    | Show copyright text (`true`/`false`)             | `?copyright=false`         |
| `neon`         | Toggle global neon effects (`true`/`false`)      | `?neon=true`               |
| `flowType`     | Neon animation style (`beam` or `glow`)          | `?flowType=beam`           |
| `color1`       | Primary Neon Color (Green replacement)           | `?color1=00ff00`           |
| `color2`       | Secondary Neon Color (Purple replacement)        | `?color2=ff00ff`           |

### License & Usage

This project is licensed under the [MIT License](LICENSE).
-   ✅ **Free to use** for personal or commercial streaming.
-   ✅ **Modifiable** to fit your brand.
-   ✅ **Open Source**.

Attribution to the original author (Keita) is appreciated but not mandatory.

---

## <a name="中文说明"></a>中文说明

### 主要功能

-   **赛博朋克美学**：故障效果、霓虹发光、数据流和科技感字体。
-   **多种布局模式**：
    -   **21:9**：专为超宽屏游戏设计的全宽覆盖层。
    -   **16:9**：居中的 16:9 游戏窗口，两侧带有装饰以填补空白。
    -   **杂谈模式**：专用的杂谈布局，拥有更大的展示区域。
-   **可视化配置页面**：无需修改代码即可轻松定制。
    -   实时预览修改效果。
    -   开关模块（音乐、版权、主页）。
    -   自定义文本（公告、游戏名称）。
    -   调整颜色（霓虹绿/紫主题色）。
-   **性能优化**：纯 HTML/CSS/JS 编写，无繁重框架。
-   **OBS集成**：直接作为浏览器源运行，完美支持。

### 使用指南

1.  **部署 (推荐)**：
    -   将此仓库部署到 Cloudflare Pages （或 GitHub Pages / Netlify）。
    -   这样可以确保你在任何设备上都有一个稳定的 URL 在 OBS 中使用。

2.  **配置**：
    -   打开部署后的网站首页 (例如 `https://your-site.pages.dev/`).
    -   你会看到 **配置面板**。
    -   根据喜好调整设置（文本、布局模式、颜色）。
    -   点击底部的 **"复制覆盖层链接"** 按钮。

3.  **添加到 OBS**：
    -   在 OBS Studio 中，添加一个新的 **浏览器源 (Browser Source)**。
    -   粘贴刚刚复制的 URL。
    -   设置宽度: `1920`, 高度: `1080`。
    -   勾选 "源不可见时关闭" 和 "场景激活时刷新浏览器" 以获得最佳性能。

### URL 参数说明

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
| `color1`       | 主霓虹色 (替换绿色)                             | `?color1=00ff00`           |
| `color2`       | 副霓虹色 (替换紫色)                             | `?color2=ff00ff`           |

### 许可证与使用权限

本项目采用 [MIT 许可证](LICENSE)。
-   ✅ **免费使用**：可自由用于个人或商业直播项目。
-   ✅ **自由修改**：您可以根据需要修改代码以适应您的形象。
