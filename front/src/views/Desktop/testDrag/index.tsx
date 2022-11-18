import { useDropzone } from "react-dropzone";
import { Routes, Route, Navigate } from "react-router-dom";
import Dropzone from 'react-dropzone'

import React , {useCallback}  from "react";

//img
import logo from "./asset/Theforaigner.png"
import img from "./../FlashCard/asset/Group.png"

import Draggable from "react-draggable";

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])

    const xPosSave = 200
    const yPosSave = 400

    const xPos = 200
    const yPos = 400
    // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  

    const test = (result : any)=>
    {
        console.log(result)

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

            <Dropzone onDrop={acceptedFiles => test("1")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div {...getRootProps()} style={{width: "100px",border: "1px solid",height: "100px"}}>
                        <input {...getInputProps({
                            onClick: e => test("1"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                )}
            </Dropzone>

            <Dropzone onDrop={acceptedFiles => test("2")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div {...getRootProps()} style={{width: "100px",border: "1px solid",height: "100px"}}>
                        <input {...getInputProps({
                            onClick: e => test("1"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                )}
            </Dropzone>

            <Dropzone onDrop={acceptedFiles => test("3")}>
                {({getRootProps, getInputProps , isDragActive}) => (
                    <div {...getRootProps()} style={{width: "100px",border: "1px solid",height: "100px"}}>
                        <input {...getInputProps({
                            onClick: e => test("1"),
                            role: 'button',
                            'aria-label': 'drag and drop area',
                        })} />
                        {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        }
                    </div>
                )}
            </Dropzone>


        </div>
    )
  }

export default MyDropzone;




