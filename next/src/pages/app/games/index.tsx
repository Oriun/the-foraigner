import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Games = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Toutes les mini-jeux sont visibles ici</h1>
      <h2>Design à faire</h2>
      <br />
      <br />
      <br />
      <h2>Exemple de Navigation</h2>
      <ul>
        <li>
          <Link href="/app/games/fill-in-the-gaps">Fill in the gaps</Link>
        </li>
        <li>
          <Link href="/app/games/flash-cards">Flash Cards</Link>
        </li>
        <li>
          <Link href="/app/games/cross-words">Cross Words</Link>
        </li>
        <li>
          <a onClick={() => router.back()}>Retour</a>
        </li>
      </ul>
    </div>
  );
};

export default Games;
