export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const v = searchParams.get('v') || Date.now();

    const targetUrl = `https://sharp-establishing-lines-committed.trycloudflare.com/api/ai/context-view/sunsu-nexus-2026?t=${v}`;
    const res = await fetch(targetUrl, {
      cache: "no-store",
      headers: {
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      }
    });

    if (!res.ok) throw new Error(`OCI Fetch Error: ${res.status}`);
    const md = await res.text();

    const blocks = md.replace(/\r\n/g, '\n').split('\n\n');

    const processedBlocks = blocks.map(block => {
      block = block.trim();
      if (!block) return '';

      const firstLine = block.split('\n')[0];

      if (firstLine.startsWith('### ')) {
        return `<h3>${firstLine.replace(/^### /, '')}</h3>`;
      }
      if (firstLine.startsWith('## ')) {
        const title = firstLine.replace(/^## /, '');
        const id = title.toLowerCase().replace(/[^a-z0-9가-힣]/gi, '-').replace(/-+/g, '-');
        return `<h2 id="${id}"><a href="#${id}">${title}</a></h2>`;
      }
      if (firstLine.startsWith('# ')) {
        return `<h1>${firstLine.replace(/^# /, '')}</h1>`;
      }

      if (block.startsWith('- ')) {
        const items = block.split('\n').map(line => {
          let content = line.replace(/^- /, '');
          content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return `<li>${content}</li>`;
        }).join('');
        return `<ul>${items}</ul>`;
      }

      let pContent = block.replace(/\n/g, '<br>');
      pContent = pContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return `<p>${pContent}</p>`;
    });

    const htmlContent = processedBlocks.join('\n');
    const now = new Date().toISOString();

    const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Sunsu Context</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <article>
      <p><strong>FETCHED AT:</strong> ${now}</p>
      ${htmlContent}
    </article>
  </body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "no-store, max-age=0, must-revalidate"
      }
    });

  } catch (err) {
    return new Response(`
      <html><body><h1>Fallback Mode</h1><p>Context fetch failed: ${err.message}</p></body></html>
    `, { status: 500, headers: { "Content-Type": "text/html" } });
  }
}
