import { GetServerSideProps } from "next";
import React from "react";

export type LessonProps = {
  category: string;
  id: string;
  name: string;
  game: any;
};
const Lesson: React.FC<LessonProps> = ({ category, id, name, game }) => {
  return (
    <div>
      Lesson {id} {name}
    </div>
  );
};

export default Lesson;

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
