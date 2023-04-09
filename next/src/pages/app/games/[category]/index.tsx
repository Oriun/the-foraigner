import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "@/services/Games";
import slugify from "slugify";

import Image from "next/image";

import logo from "./../../../../assets/accueil/Illustration_sans_titre 1.png"; // Tell webpack this JS file uses this image


import styles from "./index.module.scss";

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
      console.log(data)
      return data;
    },
  });
  if (games.isLoading) return <div>Loading...</div>;
  if (games.isError) return <div>Error: {(games.error as any).message}</div>;

  return (
    <div>

      <div className={styles.triangletopright}></div>
      <div className={styles.trianglebottomleft}></div>

      <h1 className={styles.title}>Toutes les {category} sont visibles ici</h1>

      
      <div className={styles.centerImage}>
          <Image src={logo} alt="logo" />
      </div>

      <div className={styles.game}>
        <p className={styles.helper}>{games.data[0].category}</p>
        <p className={styles.helper}>{games.data[0].description}</p>

        <div className={styles.card}>
          {games.data.map(({ id, name }) => (
            <Link href={`/app/games/${category}/${id}/${slugify(name)}`}>
              <div className={styles.cards} key={id}>
                <p>{name}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className={styles.return}>
          <a onClick={() => router.back()}>Retour</a>
        </div>
        
      </div>

    </div>
  );
};

export default GamesPerCategory;
