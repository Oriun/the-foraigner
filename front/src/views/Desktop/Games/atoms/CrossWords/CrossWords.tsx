import React, { useState } from "react";
import "./CrossWords.scss";

// const CrossWords = () => {
//   return (
//     <div>CrossWords</div>
//   )
// }

const CrossWords = () => {
  const reset = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  };

  const [isActive1, setIsActive] = useState("null");

  // // Functions
  // const romanMatrix = [[1000, 'M'],[900, 'CM'],[500, 'D'],[400, 'CD'],[100, 'C'],[90, 'XC'],[50, 'L'],[40, 'XL'],[10, 'X'],[9, 'IX'],[5, 'V'],[4, 'IV'],[1, 'I']];
  // const convertToRoman = (num) => {
  //     if (num === 0) {
  //         return '';
  //     }
  //     for (var i = 0; i < romanMatrix.length; i++) {
  //         if (num >= romanMatrix[i][0]) {
  //             return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
  //         }
  //     }
  // }
  // const error = () => {
  //     document.body.innerHTML =  ': URL mal formée';
  // };

  // const make = (h,v,separator) => {

  //     // add the first empty legend item
  //     document.getElementById('grid').innerHTML = '<div className="legendPlaceholder"></div>';

  //     // loop line by line
  //     for (let i = 0; i <= v; i++) {
  //         // loop column by column
  //         for (let j = 0; j <= h; j++) {

  //             // line legend
  //             if (j === 0) {
  //                 if (i) {
  //                     document.getElementById('grid').innerHTML += `<div className="legendV">${i}</div>`;
  //                 }
  //                 continue;
  //             }

  //             // column legend
  //             if (i === 0) {
  //                 document.getElementById('grid').innerHTML += `<div className="legendH">${convertToRoman(j)}</div>`;
  //                 continue;
  //             }

  //             // case HxV
  //             let cl = i + 'x' + j;

  //             // separator or case to fill
  //             if (separator.indexOf(cl) !== -1) {
  //                 document.getElementById('grid').innerHTML += `<div className="case ${cl}"><div className="full"></div></div>`;
  //             } else {
  //                 document.getElementById('grid').innerHTML += `<div className="case ${cl}"><input className="empty" type="text" maxLength={1} onChange={ChangeInput}></div>`;
  //             }
  //         }

  //         // line breaks
  //         if (i === 0) {
  //             document.getElementById('grid').innerHTML += '<br className="leg"/>';
  //             continue;
  //         }
  //         document.getElementById('grid').innerHTML += `</div>`;
  //         document.getElementById('grid').innerHTML += `</br>`;
  //     }

  //     // events on keypress to replace content of the case or navigate with keyboard arrows
  //     let cases = document.getElementsByclassNameName('case');
  //     for (let i = 0; i < cases.length; i++) {
  //         cases[i].addEventListener('keypress', (e) => {
  //             let selected = Math.ceil(i + 1 / h);
  //             let line = Math.ceil(selected / h);
  //             let column = (selected + h) - (h * line);

  //             switch (e.key) {
  //                 case 'ArrowUp':
  //                     line--;
  //                     break;
  //                 case 'ArrowDown':
  //                     line++;
  //                     break;
  //                 case 'ArrowLeft':
  //                     column--;
  //                     break;
  //                 case 'ArrowRight':
  //                     column++;
  //                     break;
  //                 default:
  //                     if (e.key.match(/[a-z]|é|è|ç|à|â|ê|î|ô|û|ä|ë|ï|ö|ü/i) && e.charCode) {
  //                         cases[i].children[0].value = e.key;
  //                     }
  //                     return;
  //             }

  //             let cl = line + 'x' + column;
  //             let next = document.getElementsByclassNameName(cl);
  //             if (next.length) {
  //                 next[0].children[0].focus();
  //             }
  //         });
  //     }

  //     // prevent resizing
  //     document.body.style.minWidth = ((50 * (h + 1)) + 100) + 'px';
  //     document.body.style.minHeight = ((50 * (v + 1)) + 100) + 'px';
  // };

  // // /**
  // //   Decode grid shape from url
  // // **/

  // //grid=11x10&separators=2x7,3x5,4x6,5x2,5x9,6x3,6x7,6x11,7x4,8x5,9x9,10x5

  // const build = () => {
  //     let url = decodeURI(window.location.href);
  //     //let grid = url.match(/\?grid=\d+x\d+/i);
  //     let grid =[]
  //     grid[0] = "?grid=11x10"
  //     //let separators = url.match(/&separators=\d+x.*/i);
  //     let separators = []
  //     separators[0] = "&separators=2x7,3x5,4x6,5x2,5x9,6x3,6x7,6x11,7x4,8x5,9x9,10x5"

  //     console.log("test")
  //     if (grid && separators) {
  //         grid = grid[0].match(/\d+x\d+/i);
  //         const separator = separators[0].match(/\d+x\d+/gi);

  //         if (!grid || !separator) {
  //             error();
  //         }

  //         const h = parseInt(grid[0].split('x')[0]);
  //         const v = parseInt(grid[0].split('x')[1]);
  //         console.log('Grid size (HxV):', grid[0]);
  //         console.log('Separators:', separator);

  //         make(h,v,separator);
  //     } else {
  //         console.log("test")
  //         error();
  //     }
  // }

  // useEffect(() => {
  //     // code to run after render goes here
  //     build();
  // });

  function ChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    // const selectElement = document.getElementsByclassNameName('.empty');
    // selectElement.addEventListener('change', (event) => {
    //     alert("hello")
    // });
    // console.log(event);
    // console.log(event.nativeEvent.data);
    check(/*event*/);
  }

  function check() {
    //verfiier chaque ligne
    verifligne1();
  }

  function verifligne1() {
    var case1 = (document.getElementById("1x1") as HTMLInputElement)!.value;
    var case2 = (document.getElementById("1x2") as HTMLInputElement)!.value;
    var case3 = (document.getElementById("1x3") as HTMLInputElement)!.value;
    var case4 = (document.getElementById("1x4") as HTMLInputElement)!.value;
    var case5 = (document.getElementById("1x5") as HTMLInputElement)!.value;
    var case6 = (document.getElementById("1x6") as HTMLInputElement)!.value;
    var case7 = (document.getElementById("1x7") as HTMLInputElement)!.value;
    var case8 = (document.getElementById("1x8") as HTMLInputElement)!.value;
    var case9 = (document.getElementById("1x9") as HTMLInputElement)!.value;
    var case10 = (document.getElementById("1x10") as HTMLInputElement)!.value;
    var case11 = (document.getElementById("1x11") as HTMLInputElement)!.value;

    setIsActive("");

    if (
      case1 !== "" &&
      case2 !== "" &&
      case3 !== "" &&
      case4 !== "" &&
      case5 !== "" &&
      case6 !== "" &&
      case7 !== "" &&
      case8 !== "" &&
      case9 !== "" &&
      case10 !== "" &&
      case11 !== ""
    ) {
      var chaineEntriere =
        case1 +
        case2 +
        case3 +
        case4 +
        case5 +
        case6 +
        case7 +
        case8 +
        case9 +
        case10 +
        case11;
      console.log(chaineEntriere);
      if (chaineEntriere === "testtesttes") {
        setIsActive("true");
      } else {
        setIsActive("false");
      }
    }
  }

  return (
    <div>
      <div id="grid">
        <div className="legendPlaceholder"></div>
        <div className="legendH">I</div>
        <div className="legendH">II</div>
        <div className="legendH">III</div>
        <div className="legendH">IV</div>
        <div className="legendH">V</div>
        <div className="legendH">VI</div>
        <div className="legendH">VII</div>
        <div className="legendH">VIII</div>
        <div className="legendH">IX</div>
        <div className="legendH">X</div>
        <div className="legendH">XI</div>
        <br className="leg" />
        <div className="legendV">1</div>
        <div
          style={{
            backgroundColor:
              isActive1 === "true" ? "green" : isActive1 === "false" ? "red" : ""
          }}
          className="ligne"
        >
          <div className="case">
            <input
              className="empty"
              id="1x1"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x2"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x3"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x4"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x5"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x6"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x7"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x8"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x9"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x10"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
          <div className="case">
            <input
              className="empty"
              id="1x11"
              type="text"
              maxLength={1}
              onChange={ChangeInput}
            />
          </div>
        </div>
        <br />
        <div className="legendV">2</div>
        <div className="case 2x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x5">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x7">
          <div className="full"></div>
        </div>
        <div className="case 2x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 2x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">3</div>
        <div className="case 3x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x5">
          <div className="full"></div>
        </div>
        <div className="case 3x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 3x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">4</div>
        <div className="case 4x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x5">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x6">
          <div className="full"></div>
        </div>
        <div className="case 4x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 4x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">5</div>
        <div className="case 5x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x2">
          <div className="full"></div>
        </div>
        <div className="case 5x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x5">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x9">
          <div className="full"></div>
        </div>
        <div className="case 5x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 5x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">6</div>
        <div className="case 6x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x3">
          <div className="full"></div>
        </div>
        <div className="case 6x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x5">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x7">
          <div className="full"></div>
        </div>
        <div className="case 6x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 6x11">
          <div className="full"></div>
        </div>
        <br />
        <div className="legendV">7</div>
        <div className="case 7x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x4">
          <div className="full"></div>
        </div>
        <div className="case 7x5">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 7x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">8</div>
        <div className="case 8x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x5">
          <div className="full"></div>
        </div>
        <div className="case 8x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 8x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">9</div>
        <div className="case 9x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x5">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x9">
          <div className="full"></div>
        </div>
        <div className="case 9x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 9x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
        <div className="legendV">10</div>
        <div className="case 10x1">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x2">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x3">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x4">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x5">
          <div className="full"></div>
        </div>
        <div className="case 10x6">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x7">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x8">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x9">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x10">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <div className="case 10x11">
          <input
            className="empty"
            type="text"
            maxLength={1}
            onChange={ChangeInput}
          />
        </div>
        <br />
      </div>
      <button id="reset" onClick={reset}>
        Remettre à zéro
      </button>
    </div>
  );
};

export default CrossWords;
