import React, { useState } from "react";
import Carousel from "./atoms/carousel/Carousel";
import Login from "./atoms/Login";
import Register from "./atoms/Register";
import styles from "./auth.module.scss";
import Form from "./atoms/from/Form";
import { useRouter } from "next/router";
import clsx from "clsx";

export type AuthProps = {
  defaultMode?: "login" | "register";
};

const Auth: React.FC<AuthProps> = ({ defaultMode }) => {
  const router = useRouter();
  const [mode, setMode] = useState<boolean>(defaultMode === "login");
  React.useEffect(() => {
    setMode(router.query.mode === "login");
  }, [router.query.mode]);
  React.useEffect(() => {
    window.history.pushState({}, "", mode ? "/auth/login" : "/auth/register");
  }, [mode]);
  function switchMode() {
    setMode(!mode);
  }
  return (
    <main className={clsx(styles.auth, styles[mode ? "login" : "register"])}>
      <div className={styles.logo}>
        <img src="/img/logo.svg" alt="logo" />
      </div>
      <div className={styles.form_side}>
        <Register switchMode={switchMode} />
        <Login switchMode={switchMode} />
      </div>
      <div className={styles.carousel_side} key="carousel_wrapper">
        <Carousel key="carousel" />
      </div>
    </main>
  );
};

export default Auth;
