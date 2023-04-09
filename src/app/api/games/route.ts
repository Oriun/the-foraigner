export async function GET() {
  const categories = ["fill-in-the-gaps", "cross-words", "flash-cards"];
  return new Response(JSON.stringify(categories), { status: 200 });
}
