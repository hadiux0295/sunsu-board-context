// v2 - DuckDNS domain
export const config = { runtime: 'edge' };

export default async function(request) {
  const url = 'http://sunsu-board.duckdns.org:7000/api/ai/context-view/sunsu-nexus-2026';
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.text();
    const ts = new Date().toISOString();
    return new Response(
      `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Sunsu Board Context</title>
</head>
<body>
<pre style="white-space:pre-wrap;font-family:monospace;">
[FETCHED AT: ${ts}]

${data}
</pre>
</body>
</html>`,
      { headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*'
      }}
    );
  } catch (e) {
    return new Response('OCI fetch failed: ' + e.message, { status: 502 });
  }
}
