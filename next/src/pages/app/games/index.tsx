import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import styles from "./index.module.scss";
import Image from "next/image";

import theforaigner from "./../../../assets/accueil/Group 95.png"; // Tell webpack this JS file uses this image
import logo from "./../../../assets/accueil/Illustration_sans_titre 1.png"; // Tell webpack this JS file uses this image

import cours from "./../../../assets/accueil/MicrosoftTeams-image 1.png";
import reglage from "./../../../assets/accueil/image 4.png";

import flashcard from "./../../../assets/jeux/flashcard.png";
import motcroise from "./../../../assets/jeux/motcroise.png";
import texteatrous from "./../../../assets/jeux/Texteatrous.png";

const Games = () => {
  const router = useRouter();

  const acollade = "<";
  return (
    <div>
      {/* Triangle */}
      <div className={styles.triangletopright}></div>
      <div className={styles.trianglebottomleft}></div>

      <div className={styles.setting}>
        <Link href="/app/settings">
          <div>
            <Image src={reglage} alt="reglage"></Image>
          </div>
        </Link>
        <Link href="/app/settings">Reglages</Link>
      </div>

      <div className={styles.headerStyle}>
        <div className={styles.centerImage}>
          <Image src={logo} alt="logo" />
        </div>
        <div className={styles.circle}>
          <div className={styles.imgcircle}>
            <Image src={cours} alt="cours"></Image>
          </div>
          <div></div>
        </div>
        <div className={styles.title}>
          <div className={styles.foraigner}>
            <Image src={theforaigner} alt="theforaigner" />
          </div>
        </div>
      </div>

      <a className={styles.retour} onClick={() => router.back()}>
        {" "}
        {acollade} Retour
      </a>

      {/* Card */}

      <div className={styles.cardColums}>
        <div className={styles.card}>
          <Link href="/app/games/flash-cards">
            <Image src={flashcard} alt="flashcard" />
            <p className={styles.uppercase}>flash card game</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/app/games/cross-words">
            <Image src={motcroise} alt="motcroise" />
            <p className={styles.uppercase}>Mots croisés</p>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/app/games/fill-in-the-gaps">
            <Image src={texteatrous} alt="texteatrous" />
            <p className={styles.uppercase}>text à trous</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Games;
