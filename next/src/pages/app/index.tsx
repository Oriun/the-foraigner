import Link from "next/link";
import React from "react";

const App = () => {
  return (
    <div>
      <h1>Home page de l&apos;app</h1>
      <h2>Design à faire</h2>
      <br />
      <br />
      <br />
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link href="/app/lessons">Cours</Link>
        </li>
        <li>
          <Link href="/app/exercises">Exercices</Link>
        </li>
        <li>
          <Link href="/app/games">Mini Jeux</Link>
        </li>
        <li>
          <Link href="/app/chat">Chat</Link>
        </li>
        <li>
          <Link href="/app/settings">Parametres</Link>
        </li>
      </ul>
    </div>
  );
};

export default App;
