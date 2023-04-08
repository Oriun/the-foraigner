import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "@/services/Games";
import slugify from "slugify";

export type GamesPerCategoryProps = {
  category: string;
  games: { id: string; title: string; slug: string }[];
};
const GamesPerCategory: React.FC<GamesPerCategoryProps> = () => {
  const router = useRouter();
  const { category } = router.query;
  const games = useQuery<Exercise[]>({
    queryKey: ["games", category],
    queryFn: async () => {
      const response = await fetch(`/api/games/${category}`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data;
    },
  });
  if (games.isLoading) return <div>Loading...</div>;
  if (games.isError) return <div>Error: {(games.error as any).message}</div>;

  return (
    <div>
      <h1>Toutes les {category} sont visibles ici</h1>
      <br />
      <br />
      <br />
      <ul>
        {games.data.map(({ id, name }) => (
          <li key={id}>
            <Link href={`/app/games/${category}/${id}/${slugify(name)}`}>
              {name}
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
