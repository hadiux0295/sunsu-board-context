export const config = { runtime: 'edge' };

export default async function(request) {
  const url = 'http://158.179.175.254:7000/api/ai/context-view/sunsu-nexus-2026';
  try {
    const res = await fetch(url);
    const data = await res.text();
    return new Response(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sunsu Board Context</title></head><body><pre style="white-space:pre-wrap;font-family:monospace;">${data}</pre></body></html>`,
      { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (e) {
    return new Response('OCI fetch failed: ' + e.message, { status: 502 });
  }
}
