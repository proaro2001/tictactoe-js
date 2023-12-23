/**
 * @fileoverview Tic Tac Toe game
 * @version 1.0.0
 * @author Ka Hin Choi
 */

//  initializing variables
const cells = document.querySelectorAll('.cell'); /* Select all cells */
const statusText = document.querySelector('#statusText'); /* Select status text */
const restartBtn = document.querySelector('#restartBtn'); /* Select reset button */
const winConditions = [
    [0, 1, 2], /* Top row */
    [3, 4, 5], /* Middle row */
    [6, 7, 8], /* Bottom row */
    [0, 3, 6], /* Left column */
    [1, 4, 7], /* Middle column */
    [2, 5, 8], /* Right column */
    [0, 4, 8], /* Diagonal left to right */
    [2, 4, 6] /* Diagonal right to left */
];
let options = ["", "", "", "", "", "", "", "", ""]; /* Array of options */
let currentPlayer = "X"; /* Current player */
let gameActive = false; /* Game active status */

/* Function to start game */
function initializeGame(){
    /* Add event listener to each cell */
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame); /* Add function to restart buttom */
    statusText.textContent = `${currentPlayer}'s turn`; /* Set status text */
    gameActive = true; /* Set game active */
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); /* Get cell index */

    /* Check if cell is empty or game is not active */
    if ( options[cellIndex] !== "" || !gameActive ) {
        return;
    } 

    /* Update cell */
    updateCell( this, cellIndex );
    /* Check if there is a winner */
    checkWinner();

}

function updateCell( cell, index ){
    options[index] = currentPlayer; /* Update options array */
    cell.textContent = currentPlayer; /* Update cell text */
}

function changePlayer(){
    currentPlayer = ( currentPlayer == "X" ) ? "O" : "X"; /* Change player */
    statusText.textContent = `${currentPlayer}'s turn`; /* Set status text */
}

function checkWinner(){
    let roundWon = false; /* Round won status */

    for ( let i = 0; i < winConditions.length; i++ ) {
        const condition = winConditions[i]; /* Get condition */

        const cellA = options[condition[0]]; /* Get cell A */
        const cellB = options[condition[1]]; /* Get cell B */
        const cellC = options[condition[2]]; /* Get cell C */

        if ( cellA === "" || cellB === "" || cellC === "" ) {
            continue;
        }

        if ( cellA === cellB && cellB === cellC ) {
            roundWon = true;
            break;
        }
    }

    if ( roundWon ) {
        statusText.textContent = `${currentPlayer} won!`; /* Set status text */
        gameActive = false; /* Set game active */
    }
    else if ( !options.includes("") ){
        statusText.textContent = `Draw!`; /* Set status text */
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X"; /* Reset current player */
    statusText.textContent = `${currentPlayer}'s turn`; /* Set status text */
    options = ["", "", "", "", "", "", "", "", ""]; /* Reset options array */
    cells.forEach(cell => cell.textContent = ""); /* Reset cells */
    gameActive = true; /* Set game active */
}

initializeGame(); /* Start game */