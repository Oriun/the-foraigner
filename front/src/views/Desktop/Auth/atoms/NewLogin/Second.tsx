import React from "react";
import "./Form.scss";
import Button from "../../../../../components/Inputs/Button";
import { ReactComponent as ClocheIcon } from "../../../../../assets/cloche.svg";
import "../../Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../carousel/Carousel";

function Third() {
  const navigate = useNavigate()
    const submit = async () => {
        window.alert("Activer");
        navigate('/third');
        // try {
        //   
        // } catch (err) {
        //   const e = err as APIError;
        //   /**
        //    * Implement error handling
        //    */
        //   window.alert(e.message);
        // }
      };
  return (
    <main className={"auth "}>
      <div className="logo">
        <img src="/img/logo.svg" alt="logo" />
      </div>
      <div className="form-side">
          <div className="ClocheIcon">
            <ClocheIcon />
        </div>
        <br />
        <h1 className="grand-title notif">Activer les notifications</h1>
        <br />
        <p className="decompte-text">
        L’activation des notifications vous permets d’avoir un rappel pour faire vos leçons pour que vous atteignez vos objectifs.
        </p>
        <br /><br />
        <Button onClick={submit} text="Activer"/>
      </div>
      <div className="carousel-side">
        <Carousel />
      </div>
    </main>
  );
};

export default Third;
