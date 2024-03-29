import React, { useState, useEffect } from "react";
import styles from "./fill-in-the-gaps.module.scss";
import StandardButton from "@/components/standard_button";
import clsx from "clsx";
import { FillInTheGapsData } from "@/services/Games";

type PopUpProps = {
  isOpen: boolean;
  status: boolean;
  next: () => void;
  reset: () => void;
};
const PopUp: React.FC<PopUpProps> = ({ isOpen, status, next, reset }) => {
  if (!isOpen) return null;
  return (
    <div>
      <h1>Fin du jeu</h1>
      <div>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

type LineProps = {
  data: string[];
  value: string[];
  onChange: (value: string[]) => void;
  isCorrect: boolean[];
  idx: number;
};
const Line: React.FC<LineProps> = ({
  data,
  value,
  onChange,
  isCorrect,
  idx,
}) => {
  function update(index: number) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      const next = [...value];
      next[index] = event.target.value;
      onChange(next);
    };
  }
  return (
    <div>
      <span>{idx}. </span>
      {data.map((word, index) => {
        if (index % 2 === 1) {
          const realIndex = Math.floor(index / 2);
          return (
            <input
              key={word + index}
              className={clsx(styles.FillInput, {
                [styles.correct]: isCorrect[realIndex],
                [styles.incorrect]: isCorrect[realIndex] === false,
              })}
              type="text"
              value={value[realIndex] ?? ""}
              onChange={update(realIndex)}
            />
          );
        }
        return <span key={word + index}>{word}</span>;
      })}
    </div>
  );
};

type FillInTheGapsProps = {
  game: FillInTheGapsData;
  next: () => void;
  reset: () => void;
};
const FillInTheGaps: React.FC<FillInTheGapsProps> = ({ game, next, reset }) => {
  const [lives, setLives] = useState(3);
  const [value, setValue] = useState<string[][]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean[][]>([]);
  const [isOpen, setIsOpen] = useState<boolean>();

  function updateValues(index: number) {
    return function (newValue: string[]) {
      setValue((prev) => {
        const next = [...prev];
        while (next.length < index + 1) {
          next.push([]);
        }
        next[index] = newValue;
        return next;
      });
    };
  }
  function submit() {
    if (!lives) return;
    const newCorrect = game.content.map((line, index) => {
      if (!value[index]?.length)
        return line.filter((_, index) => index % 2).map(() => false);
      return value[index].map((word, index) => {
        return word === line[index * 2 + 1];
      });
    });
    setIsCorrect(newCorrect);
    if (!newCorrect.every((line) => line.every((word) => word))) {
      setLives((prev) => prev - 1);
    } else {
      setIsOpen(true);
    }
  }
  useEffect(() => {
    if (lives === 0) {
      setIsOpen(true);
    }
  }, [lives]);
  return (
    <main className={styles.fillIn}>
      <div className={styles.fillIn__head}>
        <h1 className="section-title">{game.name}</h1>
        <h4 className="section-head">{game.description}</h4>
        <div>Vies restantes : {lives}/3</div>
      </div>
      <div className={styles.fillIn__content}>
        {game.content.map((line, index) => {
          return (
            <Line
              key={line + "" + index}
              data={line}
              idx={index}
              isCorrect={isCorrect[index] ?? []}
              onChange={updateValues(index)}
              value={value[index] ?? []}
            />
          );
        })}
      </div>
      <StandardButton
        onClick={submit}
        className={styles.fillIn__submit}
        text="Valider"
      />
      <PopUp
        isOpen={!!isOpen}
        status={isCorrect.every((line) => line.every((word) => word))}
        next={next}
        reset={reset}
      />
    </main>
  );
};

// const GameView: React.FC = () => {
//   const [key, setKey] = useState(0);
//   const [gameIndex, setGameIndex] = useState(0);
//   const game = data[gameIndex];
//   if (!game) return <div>Stop gaming around and read another lesson</div>;
//   function reset() {
//     setKey((prev) => prev + 1);
//   }
//   function next() {
//     setGameIndex((prev) => prev + 1);
//     reset();
//   }
//   return <FillInTheGaps game={game} key={key} reset={reset} next={next} />;
// };

export default FillInTheGaps;
