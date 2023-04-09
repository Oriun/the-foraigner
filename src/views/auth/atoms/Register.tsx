import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { register } from "../../../services/Auth";
import { APIError } from "../../../services/Utils";
import Form from "./from/Form";

const Register: React.FC<{ switchMode: () => void }> = ({ switchMode }) => {
  const router = useRouter();
  const submit = async (email: string, password: string) => {
    try {
      //await register(email, password);
      router.push("/auth/verification");
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
      cta="S'inscrire"
      title={"Inscription"}
      head={
        "Avec The Foraigner, vous trouverez des leçons pratiques et un partenaire de conversation dédié. Votre apprentissage commence dès aujourd’hui !"
      }
      tail={
        <a className="section-head" onClick={switchMode}>
          Déjà un compte ? Connectez-vous ici
        </a>
      }
    />
  );
};

export default Register;
