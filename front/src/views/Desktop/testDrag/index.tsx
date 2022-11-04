import { useDropzone } from "react-dropzone";
import { Routes, Route, Navigate } from "react-router-dom";

import React , {useCallback}  from "react";

//img
import logo from "./asset/Theforaigner.png"
import img from "./../FlashCard/asset/Group.png"

import Draggable from "react-draggable";

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
        <div>
            <Draggable>
                <img src={img} alt="test"  style={{width: "100px",height: "100px"}}/>
            </Draggable>

            <div {...getRootProps()} style={{width: "100px",border: "1px solid",height: "100px"}}>
                <input {...getInputProps()} />
                {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    )
  }

export default MyDropzone;




