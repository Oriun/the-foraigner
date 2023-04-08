import React, { Fragment, useEffect } from "react";
import { CrosswordsData, Exercise } from "@/services/Games";
import Tile from "./tile/tile";
import styles from "./cross-words.module.scss";
import useCrosswords from "@/hooks/useCrosswords";
import { useRouter } from "next/router";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export type CrossWordsProps = {
  data: CrosswordsData;
};
const CrossWords: React.FC<CrossWordsProps> = ({ data }) => {
  const {
    tiles,
    size,
    definitions,
    fromUser,
    isHighlighted,
    getIndice,
    click,
    type,
    setData,
    erase,
    current,
    jump,
  } = useCrosswords();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (ALPHABET.includes(letter)) {
        e.preventDefault();
        type(letter);
      } else if (letter === "BACKSPACE") {
        e.preventDefault();
        erase();
      } else if (letter === "TAB") {
        jump(current!.indice + (e.shiftKey ? -1 : 1));
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [type, current, erase, jump]);

  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <main className={styles.crosswords}>
      <img
        src="/img/crosswords.svg"
        alt="background"
        className={styles.crosswords_bg}
      />
      <div className={styles.crosswords_details}>
        <h1 className="section-title">{data.name}</h1>
        <h4 className="section-head">{data.description}</h4>
        <p className={styles.definition}>
          {definitions.map((txt, i) => (
            <span key={`${txt}-${i}`} className="big-paragraph">
              {i + 1}. {txt}
            </span>
          ))}
        </p>
        <button>Utiliser un indice</button>
      </div>
      <div
        className={styles.crosswords_grid}
        style={{
          gridTemplateColumns: `repeat(${size.x + 1}, 1fr)`,
          gridTemplateRows: `repeat(${size.y + 1}, 1fr)`,
          aspectRatio: `${size.x}/${size.y}`,
          /* we will also set size ourself later so we can handle zoom */
        }}
      >
        <div /* top left corner */ />
        {Array.from({ length: size.x }, (_, i) => {
          return <Tile key={`head-${i}`} isHeader content={ALPHABET[i]} />;
        })}
        {tiles.map((row, y) => {
          return (
            <Fragment key={`row-${y}`}>
              <Tile isHeader content={y + 1} />
              {row.map((column, x) => {
                return (
                  <Tile
                    content={fromUser(x, y)}
                    key={`row-${y}-col-${x}`}
                    highlighted={isHighlighted(x, y)}
                    indice={getIndice(x, y)}
                    blocked={column.blocked}
                    onClick={() => click(x, y)}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </main>
  );
};

export default CrossWords;
