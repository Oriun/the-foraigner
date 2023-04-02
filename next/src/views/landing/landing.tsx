import { useRouter } from "next/router";
import React from "react";
import IphoneMockUp from "../../components/IphoneMockUp";
import LanguageBadge from "../../components/language_badge";
import StandardButton from "../../components/standard_button";
import styles from "./landing.module.scss";

const Landing: React.FC = () => {
  const router = useRouter();
  return (
    <div className={styles.landing}>
      <div className={styles.head}>
        <h6>Apprendre :</h6>
        <LanguageBadge
          lang="fr"
          onClick={() =>
            alert(
              "Ce sont les 3 langues qui seront omplémentées sur la version de base !"
            )
          }
        />
        <LanguageBadge
          lang="jp"
          onClick={() =>
            alert(
              "Ce sont les 3 langues qui seront omplémentées sur la version de base !"
            )
          }
        />
        <LanguageBadge
          lang="en"
          onClick={() =>
            alert(
              "Ce sont les 3 langues qui seront omplémentées sur la version de base !"
            )
          }
        />
      </div>
      <div className={styles.hero}>
        <IphoneMockUp width={524} className={styles.iphone_mockup}>
          <img src="/img/chat-preview-en.png" alt="chat with an ai" />
          <img src="/img/chat-preview-jp.png" alt="chat with an ai" />
        </IphoneMockUp>
        <div className={styles.hero_content}>
          <img src="/img/logo.svg" alt="" />
          <h4>
            Apprenez une langue et entrainez-vous à parler avec votre{" "}
            <strong>IA</strong> personalisée
          </h4>
          <StandardButton
            text="Essayer maintenant"
            onClick={() => router.push("/auth")}
          />
        </div>
      </div>
      <div className={styles.block_2}>
        <p>
          Apprenez la théorie avec des lessons dans de noumbreux domaines et
          gagnez en vocabulaire grace à des jeux.
        </p>
        <IphoneMockUp width={524}>
          <img
            src="/img/Mobile_FlashCard_Game.png"
            alt="mobile flashcard game"
          />
        </IphoneMockUp>
      </div>
      <div className={styles.block_3}>
        <img src="/img/ai.png" alt="ai" />
        <p>
          Boostez votre apprentissage en conversant avec votre{" "}
          <strong>IA</strong> sur le sujet de votre choix.
          <br />
          Entrainée avec des <strong>natifs</strong> et mise à jour constamment.
        </p>
      </div>
    </div>
  );
};

export default Landing;
