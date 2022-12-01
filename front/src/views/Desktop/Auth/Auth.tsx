import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Carousel from "./atoms/carousel/Carousel";
import Login from "./atoms/Login";
import Register from "./atoms/Register";
import "./Auth.scss";
import Form from "./atoms/from/Form"

type AuthViewMode = "login" | "register";

const Auth = () => {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<AuthViewMode>("register");
  React.useEffect(() => {
    const m = params.get("mode");
    if (m === mode) return;
    if (m === "login" || m === "register") {
      /**
       * Do the animation here
       */
      setMode(m);
    }
  },[params, mode, setMode]);
  return (
    <main className={"auth " + mode}>
      <div className="logo">
        <img src="/img/logo.svg" alt="logo" />
      </div>
      <div className="form-side">
        <Register />
        <Login />
      </div>
      <div className="carousel-side">
        <Carousel />
      </div>
    </main>
  );
};

export default Auth;
