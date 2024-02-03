function ScreenController() {
    const game = GameController();
    const xSelected = document.querySelector('#player-one-selected');
    const xImageSelected = document.querySelector('#player-one-image-selected');
    const oSelected = document.querySelector('#player-two-selected');
    const oImageSelected = document.querySelector('#player-two-image-selected');
    const xDeselected = document.querySelector('#player-one-deselected');
    const xImageDeselected = document.querySelector('#player-one-image-deselected');
    const oDeselected = document.querySelector('#player-two-deselected');
    const oImageDeselected = document.querySelector('#player-two-image-deselected');
    const boardDiv = document.querySelector('.board');

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
            const activePlayer = null;
            
                     
        } 
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        if (!selectedRow) return;

        game.playRound(selectedRow , selectedColumn);
        updateScreen();
        
    }

    boardDiv.addEventListener('click' , clickHandlerBoard);

    updateScreen();

}

function GameController() {
    const playerOne = Player("Xander" , "X");
    const playerTwo = Player("Oliver" , "O");
    const players = [playerOne , playerTwo];
    let activePlayer = players[0];
    const board = GameBoard();
    let gameState = "active"; // choices are "active" , "gameover" , "menu"
    
    const getBoard = () => board.getBoard();

    const getState = () => gameState;

    function isWinner(player) {
        let playsList = player.getPlays();
        let comboList = board.getCombinations();

        for (let i = 0; i < comboList.length; i++) {
            let currCombo = comboList[i];
            let counter = 0;
            
            for (let j = 0; j < playsList.length; j++) {
                if (currCombo.has(playsList[j])) {
                    counter = counter + 1;
                    if (counter >= 3) {
                        gameState = "gameover";
                        

                    }
                }
            }
        }

        if (playsList.length == 5) {
            gameState = "gameover";
        }

    }


    const switchTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getName()}'s turn.`);
    };

    const playRound = (row , column) => {

        result = board.placeToken(row , column , getActivePlayer().getToken());
        let location = "" + row + column;

        if (result) {
            let currActivePlayer = getActivePlayer();
            currActivePlayer.addPlay(location);
            
            if (currActivePlayer.getPlays().length >= 3) {
                isWinner(currActivePlayer);
                switchTurn();


            } else {
                switchTurn();

            }
            
        } else {
            return
        }

    }

    return {
        playRound,
        getActivePlayer,
        getBoard,
        getState
    }

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
    ]

    const board = [];

    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++) {
            board[r].push(Cell());
        }
    }

    const getBoard = () => board;

    const getCombinations = () => WINNING_COMBINATIONS;

    const placeToken = (row , column , token) => {
        if (board[row][column].getValue() === "") {
            board[row][column].addToken(token);
            return true;
        } else {
            return false;
        }
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithValues);
    }

    return {
        getBoard,
        getCombinations,
        placeToken,
        printBoard
    };


}

function Player(name , token) {
    const playerName = name;
    const playerToken = token;
    const score = 0;
    const plays = [];

    const getName = () => playerName;
    const getToken = () => playerToken;
    const getScore = () => score;
    const getPlays = () => plays;

    const addPlay = (location) => {
        plays.push(location);
    };

    return {
        getName,
        getToken,
        getScore,
        getPlays,
        addPlay
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
















