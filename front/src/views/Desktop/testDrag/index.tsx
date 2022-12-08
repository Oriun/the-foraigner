import { useDropzone } from "react-dropzone";
import { Routes, Route, Navigate } from "react-router-dom";
import Dropzone from 'react-dropzone'

import React , {useCallback , useState}  from "react";

//img
import logo from "./asset/Theforaigner.png"
import img from "./../FlashCard/asset/Group.png"

import Draggable from "react-draggable";

import "./testdrag.scss"; 


function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])

    const xPosSave = 200
    const yPosSave = 400

    const xPos = 200
    const yPos = 400
    // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  

    const json = {

        "name":"FlashCard Test N°1",
    
        "data":[
            {
                "image": "https://www.example.com/image.jpg",
                "correct_answer":"Response A",
                "answers":[
                    "Response A",
                    "Response B",
                    "Response C",
                    "Response D"
                ]
            },
            {
                "image": "https://www.example.com/image-2.jpg",
                "correct_answer":"Response B",
                "answers":[
                    "Response A",
                    "Response B",
                    "Response C",
                    "Response D"
                ]
            },
            {
                "image": "https://www.example.com/image-2.jpg",
                "correct_answer":"Response D",
                "answers":[
                    "Response A",
                    "Response B",
                    "Response C",
                    "Response D"
                ]
            }
        ]
    }

    var [answersNum, setanswersNum] = useState<number>(0);
    const [answerResponse, setanswerResponse] = useState("");
    const [flagResponse, setflagResponse] = useState(false);


    // const [stylecase , setstylecase] = useState(['' , '' , '' , ''])
    const [stylecase , setstylecase] = useState<any[]>([])

    const [flagColor , setflagColor] = useState(false)



    const test = (result : any)=>
    {
        //recup num question
        console.log(answersNum , result)
        var answer = answersNum
        var reponse = json.data[answer].answers[result]
        console.log("response :" + json.data[answer].answers[result])
        console.log("expected response :" + json.data[answer].correct_answer)

        setanswerResponse(json.data[answer].correct_answer)
        if(json.data[answer].correct_answer == reponse)
        {
            console.log("on est bon")
            setflagResponse(true)
        }

        colorcase(answer ,  json.data[answer].correct_answer)
        setflagColor(true)

        setTimeout(() => {
            setanswerResponse("")
            setflagResponse(false)
            setflagColor(false)
            setanswersNum(Number(answersNum) + 1)
            setstylecase([])
        }, 5000);
        //change question
        // setanswersNum(answersNum + 1)
    }

    const colorcase = (answer : any , expected : any) =>
    {
        var arrayColor : any[] = [];
        json.data[answer].answers.forEach((element  , index) => {
            if(element == expected)
            {
                arrayColor.push("3px solid green")
            }
            else
            {
                arrayColor.push("3px solid red")
            }        
        }); 
        setstylecase(arrayColor);
        // setstylecase(arrayColor)
    }

    const ReturnResponse = ()=>
    {
        if(answerResponse != "")
        {
            if(flagResponse != false)
            {
                return <p className="ResponseTexte">Bravo vous avez la bonne réponse</p>
            }
            else
            {
                return <p className="ResponseTexte">La bonne reponse etait la reponse : {answerResponse}</p>
            }
        }
    }

    return (
        <div>
            <Draggable
                disabled={false}
                position={{x: xPos, y:yPos}}
                allowAnyClick={true}
            >
                <img src={img} alt="test"  style={{width: "100px",height: "100px"}}/>
            </Draggable>

            {/* Mettre un style dynamic  */}

            <Dropzone onDrop={acceptedFiles => test("0")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div className="card" {...getRootProps()} style={{border : flagColor == true ? stylecase[0] : ""}}>
                        <input {...getInputProps({
                            onClick: e => test("Response A"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p className="CheckReponse">Je valide la reponse A</p> :
                            <p className="Response">A</p>
                        }
                    </div>
                )}
            </Dropzone>

            <Dropzone onDrop={acceptedFiles => test("1")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div {...getRootProps()} className="card" style={{border : flagColor == true ? stylecase[1] : ""}}>
                        <input {...getInputProps({
                            onClick: e => test("Response B"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p className="CheckReponse">Je valide la reponse B</p> :
                            <p className="Response">B</p>
                        }
                    </div>
                )}
            </Dropzone>

            <Dropzone onDrop={acceptedFiles => test("2")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div {...getRootProps()} className="card" style={{border : flagColor == true ? stylecase[2] : ""}}>
                        <input {...getInputProps({
                            onClick: e => test("Response C"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p className="CheckReponse">Je valide la reponse C</p> :
                            <p className="Response">C</p>
                        }
                    </div>
                )}
            </Dropzone>

            <Dropzone onDrop={acceptedFiles => test("3")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div {...getRootProps()} className="card" style={{border : flagColor == true ? stylecase[3] : ""}}>
                        <input {...getInputProps({
                            onClick: e => test("Response D"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p className="CheckReponse">Je valide la reponse D</p> :
                            <p className="Response">D</p>
                        }
                    </div>
                )}
            </Dropzone>


            <div>
                {ReturnResponse()}
            </div>
        </div>
    )
  }

export default MyDropzone;




