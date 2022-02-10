import React from "react";
import "./StandardButton.scss";

type StandardButtonProps = {
  text: string;
  onClick: React.MouseEventHandler
};

const StandardButton: React.FC<StandardButtonProps> = ({ text, onClick }) => {
  return <button className="standard-button" onClick={onClick}>{text}</button>;
};

export default StandardButton;
