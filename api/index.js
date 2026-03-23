export const config = { runtime: 'edge' };

export default async function handler(req) {
  const version = Date.now();
  return Response.redirect(
    `https://sunsu-board-context.vercel.app/?v=${version}`, 302
  );
}
