import React from "react";
import "./StandardButton.scss";

type StandardButtonProps = {
  text: string;
  onClick: React.MouseEventHandler,
  className?: string
};

const StandardButton: React.FC<StandardButtonProps> = ({ text, onClick, className = '' }) => {
  return <button className={"standard-button "+className} onClick={onClick}>{text}</button>;
};

export default StandardButton;
