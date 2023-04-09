import React, { ReactNode } from "react";
import styles from "./tile.module.scss";
import clsx from "clsx";

type TileProps = {
  indice?: ReactNode;
  content?: ReactNode;
  onClick?: () => void;
  className?: string;
  highlighted?: boolean;
  blocked?: boolean;
  isHeader?: boolean;
};

const Tile: React.FC<TileProps> = ({
  indice,
  content,
  onClick,
  className = "",
  highlighted,
  blocked,
  isHeader,
}) => {
  const text = blocked ? "" : content;
  const indiceText = blocked || isHeader ? "" : indice;
  return (
    <div
      className={clsx(
        styles.crosswords_tile,
        className,
        highlighted && styles.highlighted,
        blocked && styles.blocked,
        isHeader && styles.header
      )}
      onClick={onClick}
    >
      <div className={styles.content}>
        {text}
        <span className={styles.indice}>{indiceText}</span>
      </div>
      <div className={styles.bg} />
    </div>
  );
};

export default Tile;
