# OBS Live Overlay - 样式与DOM编写指南缓存

本文档基于官方 Notion 指南进行的本地精简缓存，包含主要的 DOM 结构、CSS 类名和重要设计。
方便 AI 或开发者在本项目中快速查阅。

## 1. 整体设计说明

- 所有的弹幕与事件都在一个 `event-list` 中。每个事件容器的基础类是 `.event`。
- **页面标记**：如果要区分 OBS 特供和 控制台特供，使用 `.in-obs .event` 或 `.in-dashboard .event`。如果不区分，直接写 `.event--[事件类型]`。
- **CSS 层级 (@layer)**：组件基础样式在 `@layer components`，具体事件覆盖或默认样式在普通层，自定义或模板覆盖应当统一。

## 2. 核心 DOM 列表结构

```html
<div class="events-list-wrap">
  <!-- 礼物置顶栏区域 -->
  <div class="gift-sticky-bar">
     <div class="event event--gift event-show-as--sticky">...</div>
     <!-- ... 其他如SC、大航海、天选置顶 ... -->
  </div>
  
  <!-- 弹幕列表主区域 -->
  <div class="event-list">
     <div class="event event--message">...</div>
     <div class="event event--gift">...</div>
     <div class="event event--superchat">...</div>
     <!-- ... 其他事件卡片 ... -->
  </div>
</div>
```

## 3. 各大核心元素的类名及含义

### 3.1 弹幕核心修饰符
- `.event--message`: 普通弹幕
- `.event--superchat`: SC（醒目留言）
- `.event--toast`: 大航海上舰/续费
- `.event--gift`: 礼物、盲盒等
- `.event--interaction`: 关注/进场等互动
- `.event--system`: 系统消息
- `.event--lottery-start`: 天选时刻
- `.event--red-envelope-start` : 红包

### 3.2 角色修饰符 (作用于 `.event`)
- `.guard-level--1`: 大航海 - 舰长
- `.guard-level--2`: 大航海 - 提督
- `.guard-level--3`: 大航海 - 总督
- `.user-type--streamer`: 主播本人发送
- `.user-type--mod`: 房管发送

### 3.3 布局级修饰符 (作用于 `.event`)
- `.event-show-as--normal`: 正常列表区域显示
- `.event-show-as--sticky`: 置顶栏区域显示
- `.event-size--normal`: 礼物/红包等（普通档）
- `.event-size--highlight`: 礼物/红包等（高亮高价值档次，结构可能变成 Grid 且带有巨大气泡等）

---

## 4. 单条 Event 内部具体结构 (以普通弹幕为例)

```html
<div class="event event--message event-type--message guard-level--1 user-type--user">
  <!-- 头像备用位置 (部分结构用到) -->
  <div class="avatar-wrap avatar--sender avatar-alt-outer" hidden></div>
  
  <!-- 元信息区域 (头像、时间、名称标签等) -->
  <div class="meta">
    <!-- 头像包裹 -->
    <div class="avatar-wrap sender-avatar avatar--sender">
       <picture class="avatar-img-wrap"><img class="avatar"></picture>
       <!-- <div class="avatar-frame"></div> -->
    </div>
    
    <!-- 牌子和等级 (可选) -->
    <div class="fans-medal">...</div>
    <div class="user-level">...</div>
    
    <!-- 房管/主播标识等 (可选) -->
    <div class="mod-badge"></div>

    <!-- 用户名 -->
    <div class="username"><span class="username-text line-clamp-1">张三</span></div>
  </div>

  <!-- 弹幕正文/文本区域 -->
  <span class="message">
    普通弹幕文本的内容，可能附带表情包：
    <picture class="emote-wrap"><img class="emote"></picture>
  </span>
</div>
```

---

## 5. SC (Wake Up Message) 与大航海事件特征

SC 和 大航海由于视觉呈现比较特殊，内部结构有一些微调：

### 5.1 SC `.event--superchat`
- SC 事件分为 `.top` (包含头像、名称、价格) 和 `.message` (SC文字正文和翻译区)。
- 有特殊的 `.username-wrap` 包裹。

### 5.2 礼物 `.event--gift`
- `.content` 包含 `.top` (发送者信息和礼物名称缩略) 与 `.message` (具体数量或者高亮区域)。
- 高亮档 `.event-size--highlight` 价格在 `.top .price` 内显式可见；普通档 `.event-size--normal` 则是内嵌在 `.message .gift-details-price` 处。
- 礼物图标为 `.gift-icon-wrap img`。

---

## 6. CSS 变量使用指南与自定义

为了保证高兼容性，推荐修改以下官方预设的 CSS 变量：
*(您也可以直接在 `:root` 或者特定 `[data-theme]` 内硬覆写)*

- 文字相关： `--event-font-size`, `--text-color`
- 头像相关： `--avatar-size`, 可以直接在 `.event--gift { --avatar-size: ... }` 中重写
- SC 主题色：
  - 各金额档次会有 `.event-superchat-rank--[1~6]`。
  - SC头部分背景颜色变数 `--event-superchat-top-bg-1` ...
  - SC身体部分背景颜色变数 `--event-superchat-bg-1` ...
- 礼物 主题色：
  - `.event-gift-rank--[1~6]` 同样存在。
- 大航海 (.event--toast) 背景色：
  - `.guard-level--1`： `--event-toast-bg-1`
  - `.guard-level--2`： `--event-toast-bg-2`
  - `.guard-level--3`： `--event-toast-bg-3`

直接结合 `@layer template` 重写上述 class，可以最快实现完整的皮肤。

## 7. 重要参考链接 (可点击源查阅)

- [样式编写参考指南总览](https://www.notion.so/orangeeee/33f6066f65fe8094bfc1ddaf433285c5?v=00ed1fc5e40e44cc864d558a4c2ee38c)
- [CSS 选择器大全](https://www.notion.so/orangeeee/CSS-33f6066f65fe80abbe0ee4ad14ff0dab?v=00ed1fc5e40e44cc864d558a4c2ee38c)
- [DOM 树结构大全](https://www.notion.so/orangeeee/DOM-33f6066f65fe805bb386cfd0e3ada3e4?v=00ed1fc5e40e44cc864d558a4c2ee38c)
