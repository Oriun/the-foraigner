import styles from "./flash-cards.module.scss";
import { FlashcardsData } from "@/services/Games";
import { useState } from "react";
import { useRouter } from "next/router";
import Logo from "@/assets/logo.svg";

export type FlashCardProps = {
  game: FlashcardsData;
};

import Image from "next/image";


import logo from "./../../assets/accueil/Group 95.png"; // Tell webpack this JS file uses this image


const FlashCard: React.FC<FlashCardProps> = ({ game }) => {
  const [index, setIndex] = useState(0);
  const [choosen, setChoosen] = useState<number | null>(null);

  const [classStyles, setclassStyles] = useState('')

  const [result, setresult] = useState(0)


  const router = useRouter();
  if (!game.content[index]) {
    router.back;
    return <></>;
  }
  const current = game.content[index];

  const longueur = game.content.length;



  function validate() {
    if (choosen === current.answer) {
      alert("Bonne réponse");
      setresult(result => result + 1)
      console.log(result)
      if(index + 1 == longueur)
      {
        alert("Bravo vous avez fini ce petit jeux")
        router.back()
        return;
      }
      else
      {
        setIndex(index + 1);
        return;
      }
    }
    alert("Mauvaise réponse");
  }

  function ChooseResponse(opt : any , idx : any)
  {
    setChoosen(idx);
    setclassStyles(opt)
  }
  return (
    <div>

      <div className={styles.triangletopright}></div>
      <div className={styles.trianglebottomleft}></div>

      <div className={styles.flashcardPage}>
        <div className={styles.bandeau}>
          <div>
            {/* <Image src={logo} alt="logo"  className={styles.logoTop}/> */}
            <Logo className={styles.logoTop} />
          </div>
          <div className={styles.hautDroite}>
            <a className={styles.buttonCustom2} onClick={() => router.back()}>X</a>
          </div>
        </div>

        <div className={styles.title}>
          <p>{game.name}</p>
        </div>

        <div className={styles.titleContain}>
          <div className={styles.texte}>
            <p className={styles.texte1}>{game.description}</p>
          </div>
          <div className={styles.buttonInt}>
            <p className={styles.buttonCustom}>?</p>
          </div>

          <div>
            {index + 1} / {longueur}
          </div>
        </div>

        <div className={styles.game}>
          <div className={styles.divImg}>
            <img src={current.image} alt="" className={styles.imgGame} />
          </div>
          <div className={styles.divButton}>
            <div className={styles.buttonChoose}>
              {current.options.map((opt, idx) => (
                <button key={opt} onClick={() => ChooseResponse(opt , idx)} className={opt == classStyles ? styles.currentChoose : ""}>
                  {opt}
                </button>
              ))}
              <div className={styles.validate}>
                <button onClick={validate}>Validate answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
