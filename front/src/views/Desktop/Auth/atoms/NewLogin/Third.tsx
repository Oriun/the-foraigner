import React from "react";
import "./Form.scss";
import Button from "../../../../../components/Inputs/Button";
import Japan from "../../../../../assets/japan.png";
import France from "../../../../../assets/france.png";
import UK from "../../../../../assets/uk.png";
import "../../Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../carousel/Carousel";

function Third() {
    const submit = async () => {
        window.alert("Choix des langues");
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
        <div className="title1">
            <h1>Quelle langue veux-tu apprendre ?</h1>
        </div>
        <br/>
        <br/>
        <div className="flex-container">
        <input type="radio" id="japan" name="choice" hidden/>
          <label htmlFor="japan">
            <img className="flag" src={Japan} alt="Japan"/>
          </label>
          <input type="radio" id="france" name="choice" hidden/>
          <label htmlFor="france">
            <img className="flag" src={France} alt="France"/>
          </label>
          <input type="radio" id="uk" name="choice" hidden/>
          <label htmlFor="uk">
            <img className="flag" src={UK} alt="United-Kingdoms"/>
          </label>
        </div>
        <br/><br/>
        <div className="title2">
            <h1>Quelle langue parles-tu ?</h1>
        </div>
        <br/><br/>
        <div className="flex-container">
          <input type="radio" id="japan2" name="choice2" hidden/>
          <label htmlFor="japan2">
            <img className="flag" src={Japan} alt="Japan"/>
          </label>
          <input type="radio" id="france2" name="choice2" hidden/>
          <label htmlFor="france2">
            <img className="flag" src={France} alt="France"/>
          </label>
          <input type="radio" id="uk2" name="choice2" hidden/>
          <label htmlFor="uk2">
            <img className="flag" src={UK} alt="United-Kingdoms"/>
          </label>
        </div>
        <br/><br/>
        <Button onClick={submit} text="Activer"/>
      </div>
      <div className="carousel-side">
        <Carousel />
      </div>
    </main>
  );
};

export default Third;
