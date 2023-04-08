import React from "react";
import { useState, useEffect } from "react";
import Text from "@/components/Inputs/Text";
import LockIcon from "@/assets/lock.svg";
import styles from "./auth.module.scss";
import Carousel from "./atoms/carousel/Carousel";
import Button from "@/components/Inputs/button";
import { useRouter } from "next/router";
import clsx from "clsx";

function Second() {
  const router = useRouter();
  const startingMinutes = 10;
  const startingSeconds = 0;
  const [verif, setVerif] = React.useState("");
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });
  const submit = async () => {
    if (verif === "admin") {
      // Call API send email
      router.push("/onboarding/notification");
    } else {
      window.alert("Code invalid");
    }
    // try {
    //   await register(email, password);
    //   navigate('/app')
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
        <h1 className={clsx("grand-title", styles.notif)}>
          Vérfication du compte
        </h1>
        <br />
        <div>
          <p className={styles.decompte}>
            {" "}
            {mins}:{secs < 10 ? `0${secs}` : secs}
          </p>
        </div>
        <br />
        <p className={styles.decompte_text}>
          Le code ne sera valide que pendant 10 minutes veuillez le taper avant
          que le temps soit écoulé
        </p>
        <br />
        <br />
        <form>
          <Text
            placeholder="Code"
            value={verif}
            onChange={setVerif}
            icon={<LockIcon />}
          />
          <br />
          <br />
          <br />
          <Button onClick={submit} text="Submit" />
        </form>
      </div>
      <div className={styles.carousel_side}>
        <Carousel />
      </div>
    </main>
  );
}

export default Second;
