import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
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
      const response = await fetch(`/api/games/${category}/${id}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    },
  });
  if (game.isLoading) return <div>Loading...</div>;
  if (game.isError) return <div>Error: {(game.error as any).message}</div>;
  return <div>Game {game.data.name}</div>;
};

export default Game;
