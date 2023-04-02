import { GetServerSideProps } from "next";
import React from "react";

export type GameProps = {
  category: string;
  id: string;
  name: string;
  game: any;
};
const Game: React.FC<GameProps> = ({ category, id, name, game }) => {
  return (
    <div>
      Game {id} {name}
    </div>
  );
};

export default Game;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category, id, name } = query;
  return {
    props: {
      category,
      id,
      name,
      game: {},
    },
  };
};
