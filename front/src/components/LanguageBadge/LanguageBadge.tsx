import React from "react";
import "./LanguageBadge.scss";

type LanguageBadgeProps = {
  lang: "fr" | "jp" | "en";
  onClick: React.MouseEventHandler;
};
const images: { [key in LanguageBadgeProps["lang"]]: string } = {
  fr: "/img/français.png",
  jp: "/img/japonais.png",
  en: "/img/anglais.png",
};
const fullNames: { [key in LanguageBadgeProps["lang"]]: string } = {
  fr: "Français",
  jp: "Japonais",
  en: "Anglais",
};

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ lang, onClick }) => {
  return (
    <button className="language-badge" onClick={onClick}>
      <img src={images[lang]} alt="language" />
      <span>{fullNames[lang]}</span>
    </button>
  );
};

export default LanguageBadge;
