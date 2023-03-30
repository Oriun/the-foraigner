  if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();
  
    // String for the Final Transcript
    let final_transcript = "";
  
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;

    switch(document.getElementById("select_dialect").value)
    {
      case 'French':
        speechRecognition.lang = 'fr-FR';
        break;
      case 'Spanish':
        speechRecognition.lang = 'es-ES';
        break;
      case 'en':
        speechRecognition.lang = 'en-GB';
        break;
    }
    // speechRecognition.lang = document.querySelector("#select_dialect").value;
  
    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
      // Show the Status Element
      document.querySelector("#status").style.display = "block";
      document.querySelector("#start").style.display = "none";
      document.querySelector("#stop").style.display = "block";
    };
    speechRecognition.onerror = () => {
      // Hide the Status Element
      document.querySelector("#status").style.display = "none";
    };
    speechRecognition.onend = () => {
      // Hide the Status Element
      document.querySelector("#status").style.display = "none";
      document.querySelector("#start").style.display = "block";
      document.querySelector("#stop").style.display = "none";

    };
  
    speechRecognition.onresult = (event) => {
      // Create the interim transcript string locally because we don't want it to persist like final transcript
      let interim_transcript = "";
  
      // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          playOnClick()
          recordVoice(final_transcript)
          final_transcript = ""
          interim_transcript = ""
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
  
      // Set the Final transcript and Interim transcript.
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
    };
  
    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
      // Start the Speech Recognition
      speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
      // Stop the Speech Recognition
      speechRecognition.stop();
    };
  } else {
    console.log("Speech Recognition Not Available");
  }

  document.getElementById("SendMsg").onclick = function (){
    recordVoice(document.getElementById("MsgWrite").value)
    document.getElementById("MsgWrite").value = ""
  }


  function recordVoice(answer)
  {
    console.log(answer)
    document.querySelector("#load").style.display = "block";

    //create question div 
    const newDivleft = document.createElement("div");
    newDivleft.classList.add("rigthDiv");

    const pleft = document.createElement("p");
    const ptexteleft =  document.createTextNode(answer);
    pleft.classList.add("rigth");
    pleft.appendChild(ptexteleft);
    newDivleft.appendChild(pleft)

    var element = document.getElementById("conv");
    element.appendChild(newDivleft);

    var paramsUrl = "answer="+answer+"&lang="+document.getElementById("select_dialect").value

    //call api voice
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:6969/ia?" + paramsUrl , true);
    // xhr.send(JSON.stringify({ "answer": answer}));
    xhr.send()
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.querySelector("#load").style.display = "none";

        const answer = xhr.response.answer
        const response = xhr.response.result;
        console.log(answer);
        console.log(response);

        //create result div
        const newDivrigth = document.createElement("div");
        newDivrigth.classList.add("leftDiv");

        const prigth = document.createElement("p");
        const ptexterigth =  document.createTextNode(response);
        prigth.classList.add("left");
        prigth.appendChild(ptexterigth);
        newDivrigth.appendChild(prigth)

        var element = document.getElementById("conv");
        element.appendChild(newDivrigth);

      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
  }