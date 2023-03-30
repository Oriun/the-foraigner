import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../../services/Auth";
import { APIError } from "../../../../services/Utils";
import Form from "./from/Form";

const Register = () => {
  const navigate = useNavigate();
  const submit = async (email: string, password: string) => {
    console.log("register", { email, password });
    try {
      //await register(email, password);
      navigate('/first')
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
      title={"Inscription"}
      head={
        "Avec The Foraigner, vous trouverez des leçons pratiques et un partenaire de conversation dédié. Votre apprentissage commence dès aujourd’hui !"
      }
      tail={
        <Link to="?mode=login" className="section-head">
          Déjà un compte ? Connectez-vous ici
        </Link>
      }
    />
  );
};

export default Register;
