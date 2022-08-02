import React from "react";
import "./Button.scss";
import { ReactComponent as ArrowIcon } from "../../../assets/arrow-right.svg";
export type AllMightyButtonProps = {
  text: string;
  active?: boolean;
  onClick?: React.MouseEventHandler;
};

const Button: React.FC<AllMightyButtonProps> = ({ text, active = true, onClick }) => {
  return (
    <div className={"all-mighty-button "+(active ? "active" : "")}>
      <div className="block" />
      <ArrowIcon className="icone"/>
      <input type="submit" value={text} className="small-title" onClick={onClick}/>
    </div>
  );
};

export default Button;
