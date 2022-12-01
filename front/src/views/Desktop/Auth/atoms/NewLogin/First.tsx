import React from "react";
import { useState, useEffect } from "react";
import Text from "../../../../../components/Inputs/Text";
import { ReactComponent as LockIcon } from "../../../../../assets/lock.svg";
import "./Form.scss";
import "../../Auth.scss";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../carousel/Carousel";
import Button from "../../../../../components/Inputs/Button";

function Second() {
  const navigate = useNavigate()
  const startingMinutes = 10;
  const startingSeconds = 0;
  const [verif, setVerif] = React.useState("");
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });
  const submit = async () => {
    console.log("Code : ",verif);
    if(verif === "admin"){
      // Call API send email 
        navigate('/second');
    }else{
        window.alert("Code invalid");
    }
    // try {
    //   await register(email, password);
    //   navigate('/app')
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
        <h1 className="grand-title notif">Vérfication du compte</h1>
        <br />
        <div>
          {!(mins && secs) ? "" : (
            <p className="decompte">
              {" "}
              {mins}:{secs < 10 ? `0${secs}` : secs}
            </p>
          )}
        </div>
        <br />
        <p className="decompte-text">
        Le code ne sera valide que pendant 10 minutes veuillez le taper avant que le temps soit écoulé
        </p>
        <br /><br />
        <form>
          <Text
            placeholder="Code"
            value={verif}
            onChange={setVerif}
            icon={<LockIcon />}
            className="register-input"
          />
          <br /><br /><br />
          <Button onClick={submit} text="Submit"/>
        </form>
      </div>
      <div className="carousel-side">
        <Carousel />
      </div>
    </main>
  );
}

export default Second;
