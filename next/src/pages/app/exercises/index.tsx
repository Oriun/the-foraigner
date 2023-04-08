import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import styles from "./index.module.scss"
import Image from 'next/image';


import theforaigner from './../../../assets/accueil/Group 95.png'; // Tell webpack this JS file uses this image
import logo from './../../../assets/accueil/Illustration_sans_titre 1.png'; // Tell webpack this JS file uses this image

import cours from './../../../assets/accueil/image 3.png'
import reglage from './../../../assets/accueil/image 4.png'

const Lessons = () => {
  const router = useRouter();

  const acollade = "<"

  const testarray = ['1' , '2' , '1' , '2' , '1' , '2' , '1' , '2', '2' , '1' , '2' , '1' , '2' , '1' , '2'  , '2']
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

    <a className={styles.retour} onClick={() => router.back()}> {acollade} Retour</a>



    {/* Card */}

    <div className={styles.cardColums}>
    {
      testarray.map(item =>
      (
        <div className={styles.card}>
          <div className={styles.titlecard}>
            <p className={styles.uppercase}>Exercice N°1</p>
            <p className={styles.bold}>Les couleurs</p>
            <div className={styles.cardtraithaut}></div>
          </div>
          <div>
            <p className={styles.uppercase}>Complété à <b>60 %</b></p>
          </div>
        </div>
      ))
    }
    </div>
    

  </div>
  );
};

export default Lessons;
