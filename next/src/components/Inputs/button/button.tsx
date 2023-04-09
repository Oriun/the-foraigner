import React from "react";
import styles from "./button.module.scss";
import ArrowIcon from "../../../assets/arrow-right.svg";
import clsx from "clsx";
export type AllMightyButtonProps = {
  text: string;
  active?: boolean;
  onClick?: React.MouseEventHandler;
  id?: string;
};

const Button: React.FC<AllMightyButtonProps> = ({
  text,
  active = true,
  id,
  onClick,
}) => {
  return (
    <div className={clsx(styles.all_mighty_button, active && styles.active)}>
      <div className={styles.block} />
      <ArrowIcon className={styles.icone} />
      <input
        id={id}
        type="submit"
        value={text}
        className={clsx(styles.input, "small-title")}
        onClick={onClick}
      />
    </div>
  );
};

export default Button;
