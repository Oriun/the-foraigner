import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../../services/Auth";
import { APIError } from "../../../services/Utils";
import Form from "./from/Form";

const Login = () => {
  
  const submit = async (email: string, password: string) => {
    console.log("register", { email, password });
    try {
      await login(email, password);
      window.alert("authenticated");
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
        <Link to="?mode=register" className="section-head">
          Pas de compte ? Inscrivez-vous ici
        </Link>
      }
    />
  );
};

export default Login;
