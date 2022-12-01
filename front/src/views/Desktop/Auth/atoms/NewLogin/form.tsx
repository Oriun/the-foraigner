import { useState } from "react";
import First from './First';
import SecondStep from './Second';
import ThirdStep from './Third';
import Button from "../../../../../components/Inputs/Button";
import "./Form.scss";

export default function Form () {
  const [page, setPage] = useState(2);
  function handleSubmit () {
    setPage(page + 1);
  }
  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <First/>;
      case 1:
        return <SecondStep />;
       case 2:
         return <ThirdStep />;
       default:
         return <First />;
    }
  }; 

return (
    <>
        { page > 0 && <button onClick={() => setPage(page - 1)} className="nav button-back">Retour</button>}
        <br />
        {conditionalComponent()}
    </>
  )
}