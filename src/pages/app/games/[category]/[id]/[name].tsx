import CrossWords from "@/components/crosswords/cross-words";
import FillInTheGaps from "@/components/fill-in-the-gaps/fill-in-the-gaps";
import FlashCard from "@/components/flash-cards";

import {
  CrosswordsData,
  FillInTheGapsData,
  FlashcardsData,
} from "@/services/Games";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

export type GameProps = {
  category: string;
  id: string;
  name: string;
  game: any;
};
const Game: React.FC<GameProps> = () => {
  const router = useRouter();
  const { category, id } = router.query;
  const game = useQuery({
    queryKey: ["game", category, id],
    queryFn: async () => {
      if (!category || !id) throw new Error("Missing category or id");
      const response = await fetch(`/api/games/${category}/${id}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    },
    retry(failureCount, error) {
      return failureCount < 3;
    },
  });
  if (game.isLoading) return <div>Loading...</div>;
  if (game.isError) return <div>Error: {(game.error as any).message}</div>;

  const { data } = game;

  const next = () => {
    router.push(`/games/${category}`);
  };
  const reset = () => {
    router.reload();
  };

  switch (data.type) {
    case "cross-words":
      return <CrossWords data={data as CrosswordsData} />;
    case "fill-in-the-gaps":
      return (
        <FillInTheGaps
          game={data as FillInTheGapsData}
          reset={reset}
          next={next}
        />
      );
    case "flash-cards":
      return <FlashCard game={data as FlashcardsData} />;
    default:
      return <div>Game {data.name}</div>;
  }
};

export default Game;
