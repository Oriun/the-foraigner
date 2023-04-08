import React from "react";
import Text from "@/components/Inputs/Text";
import styles from "./form.module.scss";
import EmailIcon from "@/assets/mail.svg";
import LockIcon from "@/assets/lock.svg";
import Button from "@/components/Inputs/button";

export type FormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
  title: string;
  head: string;
  tail: React.ReactNode;
};

const Form: React.FC<FormProps> = ({ onSubmit, title, head, tail }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    /**
     * Implement real regexp validation here
     */
    let a = false;
    if (email.length > 0 && password.length > 0) {
      a = true;
    }
    if (a !== active) {
      setActive(a);
    }
  }, [email, password, active]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!active) {
      /**
       * Add error box here
       */
      return;
    }
    try {
      onSubmit(email, password);
    } catch (err) {
      /**
       * Catch error here
       */
      console.error(err);
    }
  }
  return (
    <form className={styles.auth_form} onSubmit={submit}>
      <h1 className="grand-title">{title}</h1>
      <p className="section-head">{head}</p>
      <Text
        placeholder="Email"
        value={email}
        onChange={setEmail}
        icon={<EmailIcon />}
      />
      <Text
        placeholder="Mot de passe"
        value={password}
        onChange={setPassword}
        type="password"
        icon={<LockIcon />}
      />
      <Button text="S'inscrire" active={active} />
      {tail}
    </form>
  );
};

export default Form;
