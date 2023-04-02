import { Routes, Route, Navigate } from "react-router-dom";
import "./flashcardMob.scss"; 

//img
import logo from "./asset/Theforaigner.png"
import img from "./asset/Group.png"

import React , {useCallback , useState}  from "react";
import Draggable from "react-draggable";
import Dropzone from 'react-dropzone'

import { act } from "react-dom/test-utils";



const FlashCardMob : React.FC = () => {

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
                  "correct_answer":"une chaise",
                  "answers":[
                      "une chaise",
                      "une table",
                      "kaway",
                      "Response D"
                  ]
              },
              {
                  "image": "https://www.example.com/image-2.jpg",
                  "correct_answer":"Response B",
                  "answers":[
                      "test",
                      "Response B",
                      "Response C",
                      "lololastico"
                  ]
              },
              {
                  "image": "https://www.example.com/image-2.jpg",
                  "correct_answer":"Response D",
                  "answers":[
                      "test ",
                      "manu pec",
                      "poulie",
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
  
  
  
      const ChooseResponse = (result : any)=>
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
                  arrayColor.push("5px solid green")
                  return "true"
              }
              else
              {
                  arrayColor.push("5px solid red")
                  return "false"
              }        
          }); 
          setstylecase(arrayColor);
          // setstylecase(arrayColor)
      }



    //   it("test", () => {
    //     act(() => {
    //         colorcase("une chaise" , "une chaise")
    //     });

    //     expect(true).toBe(true);
    // });
  
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
            {/* <div className="divImg" > */}
            <div className="DivImage">
                <Draggable
                    disabled={false}
                    position={{x: xPos, y:yPos}}
                    allowAnyClick={true}
                >
                    <img src={img} alt="test" className="imgRef"/>
                </Draggable>
            </div>
            {/* className="imgGame" */}
            {/* </div> */}
            <div className="divButton">
                <div className="buttonChoose">
                    <Dropzone onDrop={acceptedFiles => ChooseResponse("0")}>
                        {({getRootProps, getInputProps , isDragActive}) => (
                            <div className="card" {...getRootProps()} style={{border : flagColor == true ? stylecase[0] : ""}}>
                                <input {...getInputProps({
                                    onClick: e => test("Response A"),
                                    role: 'button',
                                    'aria-label': 'drag and drop area',
                                })} />
                                {
                                isDragActive ?
                                    <p className="CheckReponse">Je valide la reponse {json.data[answersNum].answers[0]}</p> :
                                    <p className="Response">{json.data[answersNum].answers[0]}</p>
                                }
                            </div>
                        )}
                    </Dropzone>
                    <Dropzone onDrop={acceptedFiles => ChooseResponse("1")}>
                        {({getRootProps, getInputProps , isDragActive}) => (
                            <div {...getRootProps()} className="card" style={{border : flagColor == true ? stylecase[1] : ""}}>
                                <input {...getInputProps({
                                    onClick: e => test("Response B"),
                                    role: 'button',
                                    'aria-label': 'drag and drop area',
                                })} />
                                    {
                                    isDragActive ?
                                        <p className="CheckReponse">Je valide la reponse {json.data[answersNum].answers[1]}</p> :
                                        <p className="Response">{json.data[answersNum].answers[1]}</p>
                                    }
                            </div>
                        )}
                    </Dropzone>
                    <Dropzone onDrop={acceptedFiles => ChooseResponse("2")}>
                        {({getRootProps, getInputProps , isDragActive}) => (
                            <div {...getRootProps()} className="card" style={{border : flagColor == true ? stylecase[2] : ""}}>
                                <input {...getInputProps({
                                    onClick: e => test("Response C"),
                                    role: 'button',
                                    'aria-label': 'drag and drop area',
                                })} />
                                    {
                                    isDragActive ?
                                        <p className="CheckReponse">Je valide la reponse {json.data[answersNum].answers[2]}</p> :
                                        <p className="Response">{json.data[answersNum].answers[2]}</p>
                                    }
                            </div>
                        )}
                    </Dropzone>
                    <Dropzone onDrop={acceptedFiles => ChooseResponse("3")}>
                        {({getRootProps, getInputProps , isDragActive}) => (
                            <div {...getRootProps()} className="card" style={{border : flagColor == true ? stylecase[3] : ""}}>
                                <input {...getInputProps({
                                    onClick: e => test("Response D"),
                                    role: 'button',
                                    'aria-label': 'drag and drop area',
                                })} />
                                {
                                isDragActive ?
                                    <p className="CheckReponse">Je valide la reponse {json.data[answersNum].answers[3]}</p> :
                                    <p className="Response">{json.data[answersNum].answers[3]}</p>
                                }
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
            <div>
                {ReturnResponse()}
            </div>
        </div>

    </div>  
);
};



export default FlashCardMob;
