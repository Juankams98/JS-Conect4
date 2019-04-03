var square = document.getElementById("square");
var topSquare = document.getElementById("topSquare");
var puntosj1 = 0;
var puntosj2 = 0;
var turn = true;
if (window.event) {
    console.log(window.event)
}
startTable()
function startTable(type) {
    if (type == 'complete') {
        puntosj1 = 0;
        puntosj2 = 0;
        turn = true;
        document.getElementById("numberRed").innerHTML = puntosj1;
        document.getElementById("numberYellow").innerHTML = puntosj2;
    }
    square.innerHTML = "";
    topSquare.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        let arrow = document.createElement("div");
        //arrow.srcset = "img/arrow.svg";
        arrow.onclick = (e) => { drow(e) };
        arrow.onmouseenter = (e) => {
            if (turn) {
                e.target.style.backgroundColor = "red";
            }
            else {
                e.target.style.backgroundColor = "yellow";
            }
        };
        arrow.onmouseleave = (e) => {
            e.target.style.backgroundColor = "whitesmoke"
        }
        arrow.classList.add("falseCircle");
        arrow.setAttribute("column", i)
        topSquare.appendChild(arrow);
    }
    for (let i = 0; i < 6; i++) {
        let file = document.createElement("div")
        file.classList.add("file");
        for (let j = 0; j < 7; j++) {
            let circle = document.createElement("div")
            circle.classList.add("circle");
            circle.setAttribute("column", j)
            file.appendChild(circle)
        }
        square.appendChild(file)
    }
}
function drow(e) {
    column = e.target.getAttribute("column");
    circles = document.getElementsByClassName("circle");
    let changed = false;
    var columnArray = [];
    for (let i = 0; i < circles.length; i++) {
        let element = circles[i];
        if (element.getAttribute("column") == column) {
            columnArray.push(element)
        }
    }
    for (let i = columnArray.length - 1; i >= 0; i--) {
        if (columnArray[i].style.backgroundColor == "" && !changed) {
            if (turn) {
                columnArray[i].style.backgroundColor = "red";
            }
            else {
                columnArray[i].style.backgroundColor = "yellow";
            }
            if (checkwin(circles)) {
                let smokeScreen = document.createElement("div");
                smokeScreen.id = "smokeScreen";
                document.getElementsByTagName("body")[0].appendChild(smokeScreen);

                let overmsg = document.createElement("div");
                overmsg.id = "overmsg";
                overmsg.onkeypress = (e) => {
                    tecla = (document.all) ? e.keyCode : e.which;
                    if (tecla == 13) {
                        alert('Has pulsado enter');
                    }
                }
                let h2 = document.createElement("h2");
                let p = document.createElement("p");
                let div = document.createElement("div");
                div.innerHTML = "NEXT GAME";
                div.onclick = () => {
                    startTable();
                    document.getElementsByTagName("body")[0].removeChild(
                        document.getElementById("smokeScreen")
                    )
                    document.getElementsByTagName("body")[0].removeChild(
                        document.getElementById("overmsg")
                    )
                }

                if (turn) {
                    puntosj1++;
                    document.getElementById("numberRed").innerHTML = puntosj1;
                    h2.innerHTML = `<span style="color:red">J1</span> WINS`;
                    p.innerHTML = `FIRST TURN TO <span style="color:#dada03">J2</span>`;
                }
                else {
                    puntosj2++;
                    document.getElementById("numberYellow").innerHTML = puntosj2;
                    h2.innerHTML = `<span style="color:yellow">J2</span> WINS`;
                    p.innerHTML = `FIRST TURN TO <span style="color:#e20101">J1</span>`;
                }
                overmsg.appendChild(h2);
                overmsg.appendChild(p);
                overmsg.appendChild(div);
                document.getElementsByTagName("body")[0].appendChild(overmsg);
            }
            turn = !turn;
            if (turn) {
                e.target.style.backgroundColor = "red";
            }
            else {
                e.target.style.backgroundColor = "yellow";
            }
            changed = true;
        }
    }
}
function checkwin(circles) {
    var back = false;
    for (let i = 0; i < circles.length; i++) {
        // HORIZONTAL CHECK
        if (circles[i - 3] && circles[i - 2] && circles[i - 1] && circles[i]) {
            if (circles[i - 3].style.backgroundColor && circles[i - 2].style.backgroundColor &&
                circles[i - 1].style.backgroundColor && circles[i].style.backgroundColor) {
                let color = circles[i].style.backgroundColor;
                if (circles[i - 3].style.backgroundColor == color &&
                    circles[i - 2].style.backgroundColor == color &&
                    circles[i - 1].style.backgroundColor == color &&
                    circles[i].style.backgroundColor == color) {
                    back = true;
                }
            }

        }
        // END HORIZONTAL CHECK

        // VERTICAL CHECK
        if (circles[i - 7] && circles[i - 14] && circles[i - 21] && circles[i]) {
            if (circles[i - 7].style.backgroundColor && circles[i - 14].style.backgroundColor &&
                circles[i - 21].style.backgroundColor && circles[i].style.backgroundColor) {
                let color = circles[i].style.backgroundColor;
                if (circles[i - 7].style.backgroundColor == color &&
                    circles[i - 14].style.backgroundColor == color &&
                    circles[i - 21].style.backgroundColor == color &&
                    circles[i].style.backgroundColor == color) {
                    back = true;
                }
            }
        }
        // END VERTICAL CHECK

        // DIAGONAL RIGHT CHECK
        if (circles[i - 8] && circles[i - 16] && circles[i - 24] && circles[i]) {
            if (circles[i - 8].style.backgroundColor && circles[i - 16].style.backgroundColor &&
                circles[i - 24].style.backgroundColor && circles[i].style.backgroundColor) {
                let color = circles[i].style.backgroundColor;
                if (circles[i - 8].style.backgroundColor == color &&
                    circles[i - 16].style.backgroundColor == color &&
                    circles[i - 24].style.backgroundColor == color &&
                    circles[i].style.backgroundColor == color) {
                    back = true;
                }
            }
        }
        // END DIAGONAL RIGHT CHECK

        // DIAGONAL LEFT CHECK
        if (circles[i - 6] && circles[i - 12] && circles[i - 18] && circles[i]) {
            if (circles[i - 6].style.backgroundColor && circles[i - 12].style.backgroundColor &&
                circles[i - 18].style.backgroundColor && circles[i].style.backgroundColor) {
                let color = circles[i].style.backgroundColor;
                if (circles[i - 6].style.backgroundColor == color &&
                    circles[i - 12].style.backgroundColor == color &&
                    circles[i - 18].style.backgroundColor == color &&
                    circles[i].style.backgroundColor == color) {
                    back = true;
                }
            }
        }
        // END DIAGONAL LEFT CHECK

    }
    return back;
}