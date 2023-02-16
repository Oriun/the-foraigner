import React, { useState, useMemo, Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./fill-in-the-gaps.scss";


const fillInTheGaps = () => {
    return (
        <main className="fillIn">
          <div>
            <h1 className="section-title">Texte à trou débutant #1</h1>
            <div className="section-sentence">
              <p>1. Sonia <input className="petitInput" type="text"></input> (be) the most beautiful girl in my campus.</p>
              <br/>
              <p>2. Look at the door! Tom <input className="petitInput" type="text"></input> (open) it now.</p>
              <br/>
              <p>3. I <input className="petitInput" type="text"></input> (run) as soon as they told me so.</p>
              <br/>
              <p>4. Koffi and Mary <input className="petitInput" type="text"></input> (win) National cup of Tennis two months ago.</p>
              <br/>
              <p>5. We <input className="petitInput" type="text"></input> (never swim) in the Pacific Ocean. I would like to go there.</p>
              <br/>
              <p>6. Joe didn't go to Germany with USA football team.He wishes he <input className="petitInput" type="text"></input> (be) their goalkeeper.</p>
              <br/>
              <p>7. When I <input className="petitInput" type="text"></input> (play) tennis last morning,I won every match.</p>
              <br/>
              <p>8. My sister often <input className="petitInput" type="text"></input> (cook) delicious cakes.</p>
              <br/>
              <p>9. I <input className="petitInput" type="text"></input> (become) a pilot if I was very good at Mathematics.</p>
              <br/>
              <p>10. Anna <input className="petitInput" type="text"></input> (show) me the right way to come back from school on Mondays.</p>
              <br/>
              <input type="button" value="Valider"></input>
            </div>
          </div>
        </main>
    );
};


export default fillInTheGaps;
