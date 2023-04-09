import React from "react";
import Button from "@/components/Inputs/button";
import Carousel from "./atoms/carousel/Carousel";
import styles from "./auth.module.scss";
import { useRouter } from "next/router";

function LanguagesStep() {
  const router = useRouter();
  const submit = async () => {
    window.alert("Choix des langues");
    router.push("/app");
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
        <div className="title1">
          <h1>Quelle langue veux-tu apprendre ?</h1>
        </div>
        <br />
        <br />
        <div className={styles.flex_container}>
          <input
            className={styles.input}
            type="radio"
            id="japan"
            name="choice"
            hidden
          />
          <label className={styles.label} htmlFor="japan">
            <img className={styles.flag} src="/img/japan.png" alt="Japan" />
          </label>
          <input
            className={styles.input}
            type="radio"
            id="france"
            name="choice"
            hidden
          />
          <label className={styles.label} htmlFor="france">
            <img className={styles.flag} src="/img/france.png" alt="France" />
          </label>
          <input
            className={styles.input}
            type="radio"
            id="uk"
            name="choice"
            hidden
          />
          <label className={styles.label} htmlFor="uk">
            <img
              className={styles.flag}
              src="/img/uk.png"
              alt="United-Kingdoms"
            />
          </label>
        </div>
        <br />
        <br />
        <div className="title2">
          <h1>Quelle langue parles-tu ?</h1>
        </div>
        <br />
        <br />
        <div className={styles.flex_container}>
          <input
            className={styles.input}
            type="radio"
            id="japan2"
            name="choice2"
            hidden
          />
          <label className={styles.label} htmlFor="japan2">
            <img className={styles.flag} src="/img/japan.png" alt="Japan" />
          </label>
          <input
            className={styles.input}
            type="radio"
            id="france2"
            name="choice2"
            hidden
          />
          <label className={styles.label} htmlFor="france2">
            <img className={styles.flag} src="/img/france.png" alt="France" />
          </label>
          <input
            className={styles.input}
            type="radio"
            id="uk2"
            name="choice2"
            hidden
          />
          <label className={styles.label} htmlFor="uk2">
            <img
              className={styles.flag}
              src="/img/uk.png"
              alt="United-Kingdoms"
            />
          </label>
        </div>
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

export default LanguagesStep;
