import React, { useState, useMemo, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCrosswords from "../../../../../hooks/useCrosswords";
import { CrosswordsData, getExercise } from "../../../../../services/Games";
import Tile from "../tile/Tile";
import "./CrossWords.scss";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CrossWords = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    tiles,
    size,
    definitions,
    fromUser,
    isHighlighted,
    getIndice,
    setData,
    click,
    type,
    erase,
    current,
    jump
  } = useCrosswords();

  useEffect(() => {
    if (!id) return navigate(-1);
    getExercise<CrosswordsData>(id).then((res) => {
      setData(res);
    });
  }, [id]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (ALPHABET.includes(letter)) {
        type(letter);
      } else if (letter === "BACKSPACE") {
        erase();
      } else if (letter === "TAB") {
        jump(current!.indice + (e.shiftKey ? -1 : 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [type, current, erase, jump]);

  return (
    <main className="crosswords">
      <img src="/img/crosswords.svg" alt="background" className="crosswords-bg"/>
      <div className="crosswords-details">
        <h1 className="section-title">Mot croisés débutant #1</h1>
        <h4 className="section-head">
          Challengez votre mémoire sur cette grille de 17 mots sur le thème des
          couleurs.
        </h4>
        <p className="definition">
          {definitions.map((txt, i) => (
            <span key={`${txt}-${i}`} className="big-paragraph">
              {i + 1}. {txt}
            </span>
          ))}
        </p>
        <button>Utiliser un indice</button>
      </div>
      <div
        className="crosswords-grid"
        style={{
          gridTemplateColumns: `repeat(${size.x + 1}, 1fr)`,
          gridTemplateRows: `repeat(${size.y + 1}, 1fr)`,
          aspectRatio: `${size.x}/${size.y}`
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
