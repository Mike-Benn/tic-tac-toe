const topLeft = document.querySelector('#top-left');
const topMiddle = document.querySelector('#top-middle');
const topRight = document.querySelector('#top-right');
const middleLeft = document.querySelector('#middle-left');
const middleMiddle = document.querySelector('#middle-middle');
const middleRight = document.querySelector('#middle-right');
const bottomLeft = document.querySelector('#bottom-left');
const bottomMiddle = document.querySelector('#bottom-middle');
const bottomRight = document.querySelector('#bottom-right');
const playerOne = document.querySelector('#player-one');
const playerTwo = document.querySelector('#player-two');
let board = [ [ [topLeft , "0 0"] , [topMiddle , "0 1"] , [topRight , "0 2"] ] , [ [middleLeft , "1 0"] , [middleMiddle , "1 1"] , [middleRight , "1 2"] ] , 
[ [bottomLeft , "2 0"] , [bottomMiddle , "2 1"] , [bottomRight , "2 2"] ] ];




console.log(topLeft.classList.contains("gamesquare"));

function createBoard() {
    const board = [[null , null , null] , [null , null , null] , [null , null , null]];
    return {board};
}

function createPlayer (name) {
    return {name};
}


function gameStart() {
    let board = createBoard();
    
}
  
function boardSetupHelper(event) {
    if (playerOne.classList.contains('player-active')) {
        event.target.textContent = "X";
        event.target.removeEventListener('click' , boardSetupHelper);
        playerOne.classList.remove('player-active');
        playerTwo.classList.add('player-active');
    } else if (playerTwo.classList.contains('player-active')) {
        event.target.textContent = "O";
        event.target.removeEventListener('click' , boardSetupHelper);
        playerTwo.classList.remove('player-active');
        playerOne.classList.add('player-active');
    }
}
console.log(board[0][0][0]);


function boardSetup() {
    for (let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
            board[x][y][0].addEventListener('click' , boardSetupHelper);
        }
    }
}


boardSetup();

// Gameboard array needs:
// name, coordinates, necessary checks






