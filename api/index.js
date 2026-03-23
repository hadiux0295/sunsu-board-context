export default async function(request) {
  const url = 'http://158.179.175.254:7000/api/ai/context-view/sunsu-nexus-2026';
  const data = await (await fetch(url)).text();
  return new Response(`<!DOCTYPE html><html><body><pre style="white-space:pre-wrap;font-family:monospace;">${data}</pre></body></html>`, {
    headers: { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*' }
  });
}
