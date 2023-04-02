import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export type GamesPerCategoryProps = {
  category: string;
  games: { id: string; title: string; slug: string }[];
};
const GamesPerCategory: React.FC<GamesPerCategoryProps> = ({
  category,
  games,
}) => {
  const router = useRouter();
  return (
    <div>
      <h1>Toutes les {category} sont visibles ici</h1>
      <h2>Design à faire</h2>
      <br />
      <br />
      <br />
      <h2>Exemple de Navigation</h2>
      <ul>
        {games.map(({ id, title, slug }) => (
          <li key={id}>
            <Link href={`/app/games/fill-in-the-gaps/${id}/${slug}`}>
              {title}
            </Link>
          </li>
        ))}

        <li>
          <a onClick={() => router.back()}>Retour</a>
        </li>
      </ul>
    </div>
  );
};

export default GamesPerCategory;

const sampleGamesByCategory: Record<
  string,
  { id: string; title: string; slug: string }[]
> = {
  "fill-in-the-gaps": [
    {
      id: "t3JC0yolSgH2bdTkBRTLm",
      title: "Past Simple 1",
      slug: "past-simple-1",
    },
  ],
  "flash-cards": [
    {
      id: "OFLByxSY_EodeP56pRgEy",
      title: "Everyday Objects 1",
      slug: "everyday-objects-1",
    },
  ],
  "cross-words": [
    {
      id: "9DkcqCWKEDjEsSKm7_z_l",
      title: "Colors 1",
      slug: "colors-1",
    },
  ],
};
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category } = query;
  return {
    props: {
      category,
      games: sampleGamesByCategory[category as string] ?? [],
    },
  };
};
