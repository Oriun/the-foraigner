import React, { ReactNode } from "react";
import "./Tile.scss";

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
  isHeader
}) => {
  const classes = `crosswords-tile ${className} ${
    highlighted ? "highlighted" : ""
  } ${blocked ? "blocked" : ""} ${isHeader ? "header" : ""}`;
  const text = blocked ? "" : content;
  const indiceText = blocked || isHeader ? "" : indice;
  return (
    <div className={classes} onClick={onClick}>
      <div className="content">
        {text}
        <span className="indice">{indiceText}</span>
      </div>
      <div className="bg"/>
    </div>
  );
};

export default Tile;
