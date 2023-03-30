import React, { useState, useMemo, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./fill-in-the-gaps.scss";


const fillInTheGaps = () => {
    const response = ["would", "open", "ran", "won", "swim", "is", "played", "cooked", "became", "show"];

    function valideWord() {
      for(let i = 1; i <= 10; i++) {
        const element = document.getElementById('s' + i);
        //console.log(element?.);
      }
    }

    const handleSubmit = (event: any) => {
      event.preventDefault();
    
      // const tempPlayer = new FormData(event.target);
      // console.log(tempPlayer)
      // for (let [key, value] of tempPlayer.entries()) {
      //   console.log(key, value);
      // }
      let erreur = 0;
      const s1 = event.target.s1.value;
      const s2 = event.target.s2.value;
      const s3 = event.target.s3.value;
      const s4 = event.target.s4.value;      
      const s5 = event.target.s5.value;
      const s6 = event.target.s6.value;
      const s7 = event.target.s7.value;
      const s8 = event.target.s8.value;
      const s9 = event.target.s9.value;
      const s10 = event.target.s10.value;

      if(s1 !== response[0]) {
        erreur = erreur + 1
      }
      if(s1 !== response[0]) {
        erreur = erreur + 1
      }
      if(s1 !== response[0]) {
        erreur = erreur + 1
      }
      if(s1 !== response[0]) {
        erreur = erreur + 1
      }



      event.target.reset();

    };
    
    return (
        <main className="fillIn">
          <div>
            <h1 className="section-title">Texte à trou débutant #1</h1>
            <div className="section-sentence">
              <form onSubmit={handleSubmit}>
              <p>1. Sonia <input id="s1" className="petitInput" type="text"></input> (be) the most beautiful girl in my campus.</p>
              <br/>
              <p>2. Look at the door! Tom <input id="s2" className="petitInput" type="text"></input> (open) it now.</p>
              <br/>
              <p>3. I <input id="s3" className="petitInput" type="text"></input> (run) as soon as they told me so.</p>
              <br/>
              <p>4. Koffi and Mary <input id="s4" className="petitInput" type="text"></input> (win) National cup of Tennis two months ago.</p>
              <br/>
              <p>5. We <input id="s5" className="petitInput" type="text"></input> (never swim) in the Pacific Ocean. I would like to go there.</p>
              <br/>
              <p>6. Joe didn't go to Germany with USA football team.He wishes he <input id="s6" className="petitInput" type="text"></input> (be) their goalkeeper.</p>
              <br/>
              <p>7. When I <input id="s7" className="petitInput" type="text"></input> (play) tennis last morning,I won every match.</p>
              <br/>
              <p>8. My sister often <input id="s8" className="petitInput" type="text"></input> (cook) delicious cakes.</p>
              <br/>
              <p>9. I <input id="s9" className="petitInput" type="text"></input> (become) a pilot if I was very good at Mathematics.</p>
              <br/>
              <p>10. Anna <input id="s10" className="petitInput" type="text"></input> (show) me the right way to come back from school on Mondays.</p>
              <br/>
              <input onClick={valideWord} type="submit" value="Valider"></input>
              </form>           
            </div>
          </div>
        </main>
    );
};


export default fillInTheGaps;
