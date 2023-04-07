import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss"
import Image from 'next/image';


import theforaigner from './../../../assets/accueil/Group 95.png'; // Tell webpack this JS file uses this image
import logo from './../../../assets/accueil/Illustration_sans_titre 1.png'; // Tell webpack this JS file uses this image

import cours from './../../../assets/accueil/image 2.png'
import reglage from './../../../assets/accueil/image 4.png'


const Lessons = () => {
  const router = useRouter();
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


      <div className={styles.headerStyle}>
        <div className={styles.centerImage }>
          <Image src={logo} alt="logo" />
        </div>
        <div className={styles.circle}>
            <div className={styles.imgcircle}>
              <Image src={cours} alt="cours"></Image>
            </div>
          <div>
          </div>
        </div>
        <div className={styles.title}>
          <div className={styles.foraigner}>
            <Image src={theforaigner} alt="theforaigner" />
          </div>
        </div>
      </div>

      <a onClick={() => router.back()}>  Retour</a>


      <ul>
        <li>
          <Link href="/app/lessons/conjugaison/7o3HF5nEoaHx29yCQrux1/past-simple-1">
            Past Simple 1
          </Link>
        </li>
        <li>...</li>
        <li>
        </li>
      </ul>
    </div>
  );
};

export default Lessons;
