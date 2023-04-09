import Link from "next/link";
import React from "react";
import styles from "./index.module.scss"
import Image from 'next/image';


//img import 
import theforaigner from './../../assets/accueil/Group 95.png'; // Tell webpack this JS file uses this image
import logo from './../../assets/accueil/Illustration_sans_titre 1.png'; // Tell webpack this JS file uses this image

import cours from './../../assets/accueil/image 2.png'
import exercices from './../../assets/accueil/image 3.png'
import minijeu from './../../assets/accueil/MicrosoftTeams-image 1.png'
import chat from './../../assets/accueil/MicrosoftTeams-image (2) 1.png'
import reglage from './../../assets/accueil/image 4.png'

const App = () => {
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
        <Link href="/app/settings">Parametres</Link>
      </div>

      <div className={styles.centerImage}>
        <Image src={theforaigner} alt="theforaigner" />
      </div>
      <div className={styles.centerImage}>
        <Image src={logo} alt="logo" />
      </div>
      <ul className={styles.list}>
        <li>
          <Link href="/app/lessons">
            <div className={styles.imgcircle}>
              <Image src={cours} alt="cours"></Image>
            </div>
          </Link>
          <div>
            <Link href="/app/lessons">Cours</Link>
          </div>
        </li>
        <li>
          <Link href="/app/exercises">
            <div className={styles.imgcircle}>
              <Image src={exercices} alt="exercices"></Image>
            </div>
          </Link>
          <div>
            <Link href="/app/exercises">Exercices</Link>
          </div>
        </li>
        <li>
          <Link href="/app/games">
            <div className={styles.imgcircle}> 
              <Image src={minijeu} alt="minijeu"></Image>
            </div>
          </Link>
          <div>
            <Link href="/app/games">Mini Jeux</Link>
          </div>
        </li>
        <li>
          <Link href="/app/chat">
            <div className={styles.imgcircle}>
              <Image src={chat} alt="chat"></Image>
            </div>
          </Link>
          <div>
            <Link href="/app/chat">Chat</Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default App;
