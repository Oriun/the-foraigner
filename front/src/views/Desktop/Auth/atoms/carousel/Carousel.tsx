import React from "react";
import "./Carousel.scss";
import { ReactComponent as Food } from "../../../../../assets/auth-slides/food.svg";
import { ReactComponent as Sidney } from "../../../../../assets/auth-slides/sidney.svg";
import { ReactComponent as Woman } from "../../../../../assets/auth-slides/woman.svg";

const Carousel = () => {
  const [page, setPage] = React.useState(0);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPage((page + 1) % 3);
    },5_000);
    return ()=> clearTimeout(timeout);
  }, [page]);
  return (
    <div className="auth-carousel">
      <div className="slides" style={{ left: `calc(-${page} * 100%)` }}>
        <div className="slide">
          <Food />
          <h4 className="small-title">
            Apprenez une nouvelle langue et les spécifités culturelles de chaque
            pays.
          </h4>
        </div>
        <div className="slide">
          <Sidney />
          <h4 className="small-title">
            Préparez-vous à partir à l’aventure et découvrir de nouveaux
            horizons.
          </h4>
        </div>
        <div className="slide">
          <Woman />
          <h4 className="small-title">
            Soyez à l’aise dans toutes les situations et ayez confiance en votre
            maitrise de la langue.
          </h4>
        </div>
      </div>
      <div className="dots">
        {Array.from({ length: 3 }, (_, i) => {
          return (
            <div
              onClick={() => i !== page && setPage(i)}
              className={page === i ? "current" : ""}
              key={`dot${i}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
