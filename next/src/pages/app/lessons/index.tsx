import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Lessons = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Toutes les leçons sont visibles ici</h1>
      <h2>Design à faire</h2>
      <br />
      <br />
      <br />
      <h2>Exemple de Navigation</h2>
      <ul>
        <li>
          <Link href="/app/lessons/conjugaison/7o3HF5nEoaHx29yCQrux1/past-simple-1">
            Past Simple 1
          </Link>
        </li>
        <li>...</li>
        <li>
          <a onClick={() => router.back()}>Retour</a>
        </li>
      </ul>
    </div>
  );
};

export default Lessons;
