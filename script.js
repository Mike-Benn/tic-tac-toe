const topLeft = document.querySelector('#top-left');
const topMiddle = document.querySelector('#top-middle');
const topRight = document.querySelector('#top-right');
const middleLeft = document.querySelector('#middle-left');
const middleMiddle = document.querySelector('#middle-middle');
const middleRight = document.querySelector('#middle-right');
const bottomLeft = document.querySelector('#bottom-left');
const bottomMiddle = document.querySelector('#bottom-middle');
const bottomRight = document.querySelector('#bottom-right');
const playerX = document.querySelector('#player-x');
const playerO = document.querySelector('#player-o');
const xImage = document.querySelector('#x-image');
const oImage = document.querySelector('#o-image');
const xText = document.querySelector('#x-text');
const oText = document.querySelector('#o-text');
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue('--primary-color');
const secondaryColor = rootStyles.getPropertyValue('--secondary-color');
const greyColor = rootStyles.getPropertyValue('--grey-color');
const pinkColor = rootStyles.getPropertyValue('--pink-color');
const orangeColor = rootStyles.getPropertyValue('--orange-color');


let board = [ [ [topLeft , "0 0" , ] , [topMiddle , "0 1"] , [topRight , "0 2"] ] , [ [middleLeft , "1 0"] , [middleMiddle , "1 1"] , [middleRight , "1 2"] ] , 
[ [bottomLeft , "2 0"] , [bottomMiddle , "2 1"] , [bottomRight , "2 2"] ] ];

  

/*
let top = {
    
    topLeft: {
        value: null,
        adjacent: [ [topMiddle , topRight] , [middleLeft , bottomLeft] , [middleMiddle , bottomRight]]
    },

    topMiddle: {
        value: null,
        adjacent: [ [topLeft , topRight] , [middleMiddle , bottomMiddle] ],
        coordinates: "0 1"
    },

    topRight: {
        value: null,
        adjacent: [ [topMiddle , topLeft] , [middleMiddle , bottomLeft] , [middleRight , bottomRight] ],
        coordinates: "0 2"
    }
}
*/

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let r = 0; r++; r < rows) {
        board[r] = [];
        for (let c = 0; c++; c < columns) {
            board[r].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (row , column , token) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(token);
        } else {
            console.log("Invalid move");
        }
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
    }

    return {
        getBoard,
        placeToken,
        printBoard
    };


}

function Player(name , token) {
    const playerName = name;
    const playerToken = token;

    const getName = () => playerName;
    const getToken = () => playerToken;

    return {
        getName,
        getToken
    };

}

function Cell() {
    let value = 0;

    const addToken = (token) => {
        value = token;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}



function turnSetupX() {
    playerO.classList.remove('active');
    oImage.src = "./images/oletter.png";
    oImage.style.backgroundColor = secondaryColor;
    playerO.style.backgroundColor = secondaryColor;
    oText.style.color = greyColor;
    oText.style.backgroundColor = secondaryColor;

    playerX.classList.add('active');
    xImage.src = "./images/xletter-inverted.png";
    xImage.style.backgroundColor = greyColor;
    playerX.style.backgroundColor = greyColor;
    xText.style.color = secondaryColor;
    xText.style.backgroundColor = greyColor;
    
}

function turnSetupO() {
    playerX.classList.remove('active');
    xImage.src = "./images/xletter.png";
    xImage.style.backgroundColor = secondaryColor;
    playerX.style.backgroundColor = secondaryColor;
    xText.style.color = greyColor;
    xText.style.backgroundColor = secondaryColor;

    playerO.classList.add('active');
    oImage.src = "./images/oletter-inverted.png";
    oImage.style.backgroundColor = greyColor;
    playerO.style.backgroundColor = greyColor;
    oText.style.color = secondaryColor;
    oText.style.backgroundColor = greyColor;
    
}












