import Crosswords from "@/data/cross-words.json";
import FillInTheGaps from "@/data/fill-in-the-gaps.json";

const games: Record<string, any> = {
  "fill-in-the-gaps": FillInTheGaps,
  "cross-words": Crosswords,
};
export async function GET(
  _request: Request,
  { params }: { params: { category: string; id: string } }
) {
  const { id, category } = params;
  if (!(category in games)) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  const list = games[params.category];
  const game = list.find((item: any) => item.id === id);
  if (!game) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(game), {
    status: 200,
  });
}
