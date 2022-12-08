import { Routes, Route, Navigate } from "react-router-dom";
import "./flashcard.scss";
import FlashCardMob from "../../Mobile/FlashCard";
//img
import logo from "./asset/Theforaigner.png"
import img from "./asset/Group.png"



const FlashCard : React.FC = () => {


  return (
<div>
    <div className="flashcardPage">
        <div>
            <div className="triangleG"></div>
        </div>
        <div>
            <div className="triangleD"></div>
        </div>
        <div className="bandeau">
             <div>
                <img src={logo} alt="" className="logoTop"/>
             </div>
             <div className="hautDroite">
                <p className="buttonCustom">X</p>
            </div>
        </div>

        <div className="title">
            <p>Flash card game</p>
        </div>

        <div className="titleContain">
            <div className="texte">
                <p className="texte1">
                        Lors de ce jeux vous aurez une carte avec un dessin affiché, il vous faudra associer ce dessin à certain mot ou phrase. 
                </p>
                <p className="exemple">Exemple:</p>
            </div>
            <div className="buttonInt">
                <p className="buttonCustom">?</p>
            </div>
        </div>

        <div className="game">
            <div className="divImg">
                <img src={img} alt="" className="imgGame"/>
            </div>
            <div className="divButton">
                <div className="buttonChoose">
                    <button>Working girl</button>
                    <button>Tree house</button>
                    <button>Restaurant table</button>
                    <button>Football team</button>
                    <div className="validate">
                        <button>Validate answer</button>
                    </div>
                </div>
            </div>
        </div>

    </div>  
</div>

);
};

export default FlashCard;
