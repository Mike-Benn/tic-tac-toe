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

    const getBoard = () => board.getBoard();

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

        if (result) {
            switchTurn();
        } else {
            return
        }
        
        


    }

    
    
    

    return {
        playRound,
        getActivePlayer,
        getBoard
    }

}

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < columns; c++) {
            board[r].push(Cell());
        }
    }

    const getBoard = () => board;

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
        placeToken,
        printBoard
    };


}

function Player(name , token) {
    const playerName = name;
    const playerToken = token;
    const plays = [];

    const getName = () => playerName;
    const getToken = () => playerToken;
    const addPlay = (location) => {
        plays.push(location);
    };

    return {
        getName,
        getToken,
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
















