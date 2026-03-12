
const fs = require('fs');
const file = 'c:/Users/keita/Documents/VSCode/obsliveoverlay/src/scripts/shared/overlay-schema.js';
let content = fs.readFileSync(file, 'utf8');

const replacementGame = 'game: (ratio !== \\'chat\\' ? (params.has(\\'game\\') ? params.get(\\'game\\') : base.game) : base.game),';
content = content.replace(/game:\s*params\.has\('game'\)\s*\?\s*params\.get\('game'\)\s*:\s*base\.game,/, replacementGame);

const replacementChat = 'chatTopic: params.has(\\'chatTopic\\') ? params.get(\\'chatTopic\\') : (ratio === \\'chat\\' ? (params.has(\\'game\\') ? params.get(\\'game\\') : base.chatTopic) : base.chatTopic),';
content = content.replace(/chatTopic:\s*params\.has\('chatTopic'\)\s*\?\s*params\.get\('chatTopic'\)\s*:\s*base\.chatTopic,/, replacementChat);

fs.writeFileSync(file, content, 'utf8');

