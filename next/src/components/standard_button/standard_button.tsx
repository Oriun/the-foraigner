import React from "react";
import styles from "./standard_button.module.scss";
import clsx from "clsx";

type StandardButtonProps = {
  text: string;
  onClick: React.MouseEventHandler;
  className?: string;
};

const StandardButton: React.FC<StandardButtonProps> = ({
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={clsx(styles.standard_button, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default StandardButton;
