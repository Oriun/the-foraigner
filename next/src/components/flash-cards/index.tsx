import styles from "./flash-cards.module.scss";
import { FlashcardsData } from "@/services/Games";
import { useState } from "react";
import { useRouter } from "next/router";
import Logo from "@/assets/logo.svg";

export type FlashCardProps = {
  game: FlashcardsData;
};

const FlashCard: React.FC<FlashCardProps> = ({ game }) => {
  const [index, setIndex] = useState(0);
  const [choosen, setChoosen] = useState<number | null>(null);
  const router = useRouter();
  if (!game.content[index]) {
    router.back;
    return <></>;
  }
  const current = game.content[index];

  function validate() {
    if (choosen === current.answer) {
      alert("Bonne réponse");
      setIndex(index + 1);
      return;
    }
    alert("Mauvaise réponse");
  }
  return (
    <div>
      <div className={styles.flashcardPage}>
        <div>
          <div className={styles.triangleG}></div>
        </div>
        <div>
          <div className={styles.triangleD}></div>
        </div>
        <div className={styles.bandeau}>
          <div>
            <Logo className={styles.logoTop} />
          </div>
          <div className={styles.hautDroite}>
            <p className={styles.buttonCustom}>X</p>
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
        </div>

        <div className={styles.game}>
          <div className={styles.divImg}>
            <img src={current.image} alt="" className={styles.imgGame} />
          </div>
          <div className={styles.divButton}>
            <div className={styles.buttonChoose}>
              {current.options.map((opt, idx) => (
                <button key={opt} onClick={() => setChoosen(idx)}>
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
