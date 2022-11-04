import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./flashcard.scss"; 

//img
import logo from "./asset/Theforaigner.png"
import img from "./asset/Group.png"

const FlashCardMob : React.FC = () => {
return (
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
                <div>
                    <p className="buttonCustom">II</p>
                    <p className="buttonCustom">X</p>
                </div>
            </div>
        </div>

        <div className="title">
            <p>Flash card game tutorial</p>
        </div>

        <div className="titleContain">
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
                </div>
            </div>
        </div>

    </div>  
);
};



export default FlashCardMob;
