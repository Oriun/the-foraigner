import Crosswords from "@/data/cross-words.json";
import FillInTheGaps from "@/data/fill-in-the-gaps.json";
import { Exercise } from "@/services/Games";

const games: Record<string, any> = {
  "fill-in-the-gaps": FillInTheGaps,
  "cross-words": Crosswords,
};
export async function GET(
  _request: Request,
  { params }: { params: { category: string } }
) {
  if (params.category in games) {
    return new Response(
      JSON.stringify(
        games[params.category].map((a: Exercise) => ({
          id: a.id,
          name: a.name,
          type: a.type,
          category: a.category,
          description: a.description,
          language: a.language,
        }))
      ),
      {
        status: 200,
      }
    );
  }
  return new Response(JSON.stringify({}), { status: 404 });
}
