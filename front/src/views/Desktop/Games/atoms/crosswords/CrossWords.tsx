import React, { useState, useMemo, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCrosswords from "../../../../../hooks/useCrosswords";
import { getExercise } from "../../../../../services/Games";
import Tile from "../tile/Tile";
import "./CrossWords.scss";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const CrossWords = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { tiles, size, definitions, fromUser, isHighlighted, getIndice } =
    useCrosswords();

  useEffect(() => {
    if(!id) return navigate(-1)
    getExercise(id).then((res) => {
      console.log(res);
    });
  }, [id]);

  return (
    <main className="crosswords">
      <div className="crosswords-details">
        <h1 className="section-title">Mot croisés débutant #1</h1>
        <p className="section-head">
          Challengez votre mémoire sur cette grille de 17 mots sur le thème des
          couleurs.
        </p>
        <ol>
          {definitions.map((txt) => (
            <li key={txt} className="paragraph">
              {txt}
            </li>
          ))}
        </ol>
        <button>Utiliser un indice</button>
      </div>
      <div
        className="crosswords-grid"
        style={{
          gridTemplateColumns: `repeat(${size.x + 1}, 1fr)`
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
