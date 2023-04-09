import { useRouter } from "next/router";
import React from "react";

const Settings = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Settings</h1>
      <h2>Desing à faire</h2>
      <button onClick={() => router.back()}>Retour</button>
    </div>
  );
};

export default Settings;
