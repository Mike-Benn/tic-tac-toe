function ScreenController() {
    
    const modal = document.querySelector('.modal');
    const overMessage = document.querySelector('#gameover-message');
    const overImage = document.querySelector('#gameover-image');
    const gameoverHeader = document.querySelector('.gameover-header');
    const gameoverDeclaration = document.querySelector('.gameover-declaration');
    const playAgainBtn = document.querySelector('#nextround-btn');
    const xSelected = document.querySelector('#player-one-selected');
    const xImageSelected = document.querySelector('#player-one-image-selected');
    const oSelected = document.querySelector('#player-two-selected');
    const oImageSelected = document.querySelector('#player-two-image-selected');
    const xDeselected = document.querySelector('#player-one-deselected');
    const xImageDeselected = document.querySelector('#player-one-image-deselected');
    const oDeselected = document.querySelector('#player-two-deselected');
    const oImageDeselected = document.querySelector('#player-two-image-deselected');
    const boardDiv = document.querySelector('.board');
    const p1Score = document.querySelector('.p1-score');
    const p2Score = document.querySelector('.p2-score');
    const tiesScore = document.querySelector('.ties-score');
    
    const game = GameController();
    

    const updateScreen = () => {
        
        boardDiv.textContent = "";
        const board = game.getBoard();
        let currentState = game.getState();

        board.forEach((row , rowIndex) => {
            row.forEach((cell , colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })



        if (currentState === "active") { 
            
            
            const activePlayer = game.getActivePlayer();

            
            if (activePlayer.getToken() === "X") {
                xSelected.classList.remove('inactive');
                xImageSelected.classList.remove('inactive');
                oDeselected.classList.remove('inactive');
                oImageDeselected.classList.remove('inactive');

                oSelected.classList.add('inactive');
                oImageSelected.classList.add('inactive');
                xDeselected.classList.add('inactive');
                xImageDeselected.classList.add('inactive');
            } else {
                oSelected.classList.remove('inactive');
                oImageSelected.classList.remove('inactive');
                xDeselected.classList.remove('inactive');
                xImageDeselected.classList.remove('inactive');

                xSelected.classList.add('inactive');
                xImageSelected.classList.add('inactive');
                oDeselected.classList.add('inactive');
                oImageDeselected.classList.add('inactive');
            }
            
            

            
        } else if (currentState === "gameover") {
            
            if (game.getWinner() === "X") {
                overImage.style.removeProperty("display");
                overImage.src = "./images/xletter.png";
                overImage.alt = "Picture of the letter X";
                gameoverHeader.textContent = "CONGRATULATIONS!";
                gameoverDeclaration.textContent = "WINS THE ROUND";
                p1Score.textContent = game.getActivePlayer().getScore();
                
            } else if(game.getWinner() === "O") {
                overImage.style.removeProperty("display");
                overImage.src = "./images/oletter.png";
                overImage.alt = "Picture of the letter O";
                gameoverHeader.textContent = "CONGRATULATIONS";
                gameoverDeclaration.textContent = "WINS THE ROUND";
                p2Score.textContent = game.getActivePlayer().getScore();
            } else {
                overImage.style.display = "none";
                gameoverHeader.textContent = "OH NO!!!";
                gameoverDeclaration.textContent = "THIS ROUND ENDS IN A TIE";
                tiesScore.textContent = parseInt(tiesScore.textContent) + 1;
            }
            modal.style.display = "block";
            overMessage.style.display = "grid";
            
                     
        } 
    };

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow) return;

        game.playRound(selectedRow , selectedColumn);
        updateScreen();
        
    };

    function clickHandlerPlayAgain(e) {
        modal.style.display = "none";
        overMessage.style.display = "none";
        game.reset();
        updateScreen();
    };


    playAgainBtn.addEventListener('click' , clickHandlerPlayAgain);
    boardDiv.addEventListener('click' , clickHandlerBoard);

    updateScreen();

}

function GameController() {
    const playerOne = Player("Xander" , "X");
    const playerTwo = Player("Oliver" , "O");
    const players = [playerOne , playerTwo];
    let winner = undefined;
    let activePlayer = players[0];
    let board = GameBoard();
    let gameState = "active"; // choices are "active" , "gameover" , "menu"
    
    const getBoard = () => board.getBoard();

    const getState = () => gameState;

    const getWinner = () => winner;

    const getActivePlayer = () => activePlayer;

    function isGameOver(player) {
        let playsList = player.getPlays();
        let comboList = board.getCombinations();

        for (let i = 0; i < comboList.length; i++) {
            let currCombo = comboList[i];
            let counter = 0;
            
            for (let j = 0; j < playsList.length; j++) {
                if (currCombo.has(playsList[j])) {
                    counter = counter + 1;
                    if (counter >= 3) {
                        winner = player.getToken();
                        player.addWin();
                        gameState = "gameover";
                        

                    }
                }
            }
        }

        if (playsList.length == 5) {
            winner = "tie";
            gameState = "gameover";
        }

    };

    const switchTurn = () => {
        if (gameState === "active") {
            if (activePlayer === players[0]) {
                activePlayer = players[1];
            } else {
                activePlayer = players[0];
            }
        }
    };

    const playRound = (row , column) => {

        result = board.placeToken(row , column , getActivePlayer().getToken());
        let location = "" + row + column;

        if (result) {
            let currActivePlayer = getActivePlayer();
            currActivePlayer.addPlay(location);
            
            if (currActivePlayer.getPlays().length >= 3) {
                isGameOver(currActivePlayer);
                switchTurn();


            } else {
                switchTurn();

            }
            
        } else {
            return;
        }

    };

    const reset = () => {
        playerOne.reset();
        playerTwo.reset();
        board = GameBoard();
        winner = undefined;
        activePlayer = players[0];
        gameState = "active";

    };

    return {
        playRound,
        getActivePlayer,
        getBoard,
        getState,
        getWinner,
        reset
    };

}

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const WINNING_COMBINATIONS = [
        new Set(["00" , "01" , "02"]),
        new Set(["10" , "11" , "12"]),
        new Set(["20" , "21" , "22"]),
        new Set(["00" , "10" , "20"]),
        new Set(["01" , "11" , "21"]),
        new Set(["02" , "12" , "22"]),
        new Set(["00" , "11" , "22"]),
        new Set(["02" , "11" , "20"])
    ];

    let board = [];

    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++) {
            board[r].push(Cell());
        }
    };

    const getBoard = () => board;

    const getCombinations = () => WINNING_COMBINATIONS;

    const placeToken = (row , column , token) => {
        if (board[row][column].getValue() === "") {
            board[row][column].addToken(token);
            return true;
        } else {
            return false;
        }
    };

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
    };

    return {
        getBoard,
        getCombinations,
        placeToken,
        printBoard,
    
    };


}

function Player(name , token) {
    const playerName = name;
    const playerToken = token;
    let score = 0;
    let plays = [];

    const getName = () => playerName;
    const getToken = () => playerToken;
    const getScore = () => score;
    const getPlays = () => plays;

    const addPlay = (location) => {
        plays.push(location);
    };

    const addWin = () => {
        score = score + 1;
    };

    const reset = () => {
        plays = [];
    };

    return {
        getName,
        getToken,
        getScore,
        getPlays,
        addPlay,
        addWin,
        reset
    };

}

function Cell() {
    let value = "";

    const addToken = (token) => {
        value = token;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

ScreenController();
















