import React from "react";
import styles from "./auth.module.scss";
import Button from "@/components/Inputs/button";
import ClocheIcon from "@/assets/cloche.svg";
import Carousel from "./atoms/carousel/Carousel";
import { useRouter } from "next/router";
import clsx from "clsx";

function NotificationStep() {
  const router = useRouter();
  const submit = async () => {
    window.alert("Activer");
    router.push("/onboarding/languages");
    // try {
    //
    // } catch (err) {
    //   const e = err as APIError;
    //   /**
    //    * Implement error handling
    //    */
    //   window.alert(e.message);
    // }
  };
  return (
    <main className={styles.auth}>
      <div className={styles.logo}>
        <img src="/img/logo.svg" alt="logo" />
      </div>
      <div className={styles.form_side}>
        <div className="ClocheIcon">
          <ClocheIcon />
        </div>
        <br />
        <h1 className={clsx(styles.notif, "grand-title")}>
          Activer les notifications
        </h1>
        <br />
        <p className={styles.decompte_text}>
          L’activation des notifications vous permets d’avoir un rappel pour
          faire vos leçons pour que vous atteignez vos objectifs.
        </p>
        <br />
        <br />
        <Button onClick={submit} text="Activer" />
      </div>
      <div className={styles.carousel_side}>
        <Carousel />
      </div>
    </main>
  );
}

export default NotificationStep;
