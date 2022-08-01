const MAX_TURNS = 10;
const COMBINATION_SIZE = 4;
const POSSIBLE_COLORS= ["r", "b", "y", "g"];
let currentCombination = "";
let currentTurn = 1;
let cpuCombination = "";

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateTargetCombination(combSize, availableColors){
    let randomNumber;
    let combinationGenerated ="";
    for(let i=0; i<combSize; i++){
        randomNumber = getRandomArbitrary(0, availableColors.length);
        combinationGenerated += availableColors[randomNumber];
    }
    return combinationGenerated;
}

window.onload = ()=>{
    document.getElementById("turnsLeft").textContent = MAX_TURNS;
    cpuCombination = generateTargetCombination(COMBINATION_SIZE, POSSIBLE_COLORS);
    console.log(cpuCombination);
} 


function addItemToUserCombination(e){
    if (currentCombination.length<4){
        currentCombination += e.target.value;
        let newInterfaceColor = document.createElement("button");
        newInterfaceColor.classList.add("colorBox", "combItem");
        if(e.target.value == "y") newInterfaceColor.classList.add("yellow");
        if(e.target.value == "g") newInterfaceColor.classList.add("green");
        if(e.target.value == "b") newInterfaceColor.classList.add("black");
        if(e.target.value == "r") newInterfaceColor.classList.add("red");
        document.getElementById("currentCombination").appendChild(newInterfaceColor);
    }
}

const userButtons = document.getElementsByClassName("userButton");
for (let button of userButtons){
    button.addEventListener("click", addItemToUserCombination);
}

//borrar: quitar ultima posicion combinación usuario
function deleteItemOfUserCombination(){
    if(currentCombination.length>0){
        let userCombination = document.getElementsByClassName("combItem");
        userCombination[userCombination.length-1].remove();
        currentCombination = currentCombination.slice(0,-1);
    } 
}

document.getElementById("delete").addEventListener("click", deleteItemOfUserCombination)
//confirmar cobinación usuario: (añadir a la tabla, aciertos, descontar y actualizar turnos, fin juego)

function addCurrentCombinationToBoard(){
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${document.getElementById("currentCombination").innerHTML}</td>`;
    let newColumn = newRow.childNodes[0];
    console.log(newColumn);
    for(let i=0; i<newColumn.childNodes.length; i++){
        newColumn.childNodes[i].classList.remove("combItem");
    }
    document.getElementById("turns").appendChild(newRow);
}

function deleteCurrentCombination(){
    document.getElementById("currentCombination").innerHTML="";
}

function updateTurn(){
    currentTurn++;
    document.getElementById("turnsLeft").textContent= 10 - currentTurn +1;
}

function checkRightPositions(){
    let rightPositions = 0;
    for (let i=0; i<currentCombination.length; i++){
        if (currentCombination[i]==cpuCombination[i]) rightPositions++;
    }
    return rightPositions;
}
function showRightPositionsAtBoard(rightPositions){
    newColumn = document.createElement("td");
    for(let i=1; i<=rightPositions; i++){
        let newRightPosition = document.createElement("button");
        newRightPosition.classList.add("infoBox", "red");
        newColumn.appendChild(newRightPosition);
    }
    boardRows = document.getElementsByTagName("tr");
    boardRows[boardRows.length-1].appendChild(newColumn);
}

function newTurn(){
    if (currentCombination==cpuCombination){
        window.alert("Has ganado");
    } else {
        addCurrentCombinationToBoard();
        deleteCurrentCombination();
        updateTurn();
        const rightPositions =  checkRightPositions();
        showRightPositionsAtBoard(rightPositions);

        currentCombination="";
    }
    
    
}

document.getElementById("try").addEventListener("click", newTurn);