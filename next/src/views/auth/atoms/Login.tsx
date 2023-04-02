import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { login } from "../../../services/Auth";
import { APIError } from "../../../services/Utils";
import Form from "./from/Form";

const Login: React.FC<{ switchMode: () => void }> = ({ switchMode }) => {
  const router = useRouter();
  const submit = async (email: string, password: string) => {
    console.log("register", { email, password });
    try {
      await login(email, password);
      router.push("/app");
    } catch (err) {
      const e = err as APIError;
      /**
       * Implement error handling
       */
      window.alert(e.message);
    }
  };
  return (
    <Form
      onSubmit={submit}
      title={"Connexion"}
      head={
        "Quels nouveaux mots allez-vous apprendre aujourd’hui ? Quels concepts maitriserez-vous demain ? Connectez-vous pour le savoir !"
      }
      tail={
        <a className="section-head" onClick={switchMode}>
          Pas de compte ? Inscrivez-vous ici
        </a>
      }
    />
  );
};

export default Login;
