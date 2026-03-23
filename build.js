const fs = require('fs');

const files = ['core.md', 'current.md', 'architecture.md', 'agents.md', 'infra.md'];

const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
let content = `[LAST UPDATED: ${now}]\n\n`;

files.forEach(file => {
  if (fs.existsSync(`context/${file}`)) {
    const md = fs.readFileSync(`context/${file}`, 'utf-8');
    const section = file.replace('.md', '').toUpperCase();
    content += `## [SECTION: ${section}]\n${md}\n\n---\n\n`;
  }
});

const html = `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><title>Sunsu-Nexus Context</title></head>
<body><pre style="white-space:pre-wrap;font-family:monospace;">${content}</pre></body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('✅ Build complete:', now);
