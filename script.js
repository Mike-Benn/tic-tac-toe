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
    const turnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {

        boardDiv.textContent = "";
        
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();


        
        // turnDiv.textContent = `${activePlayer.getName()}'s turn...`;

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
        board.placeToken(row , column , getActivePlayer().getToken());
        switchTurn();


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
















