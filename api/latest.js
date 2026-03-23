export const config = { runtime: 'edge' };

export default async function handler(req) {
  const version = Date.now();
  const target = `https://sunsu-board-context.vercel.app/?v=${version}`;
  return Response.redirect(target, 302);
}
