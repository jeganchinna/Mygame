document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resultScreen = document.getElementById("result-screen");
    const resultText = document.getElementById("result-text");
    const newGameButton = document.getElementById("new-game-button");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create cells dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }

    // Function to handle player moves
    function makeMove(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                showResult(`Player ${currentPlayer} wins!`);
            } else if (!gameBoard.includes("") && !checkWinner()) {
                showResult("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to render the current state of the board
    function renderBoard() {
        gameBoard.forEach((value, index) => {
            const cell = board.children[index];
            cell.textContent = value;
        });
    }

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Function to display result screen
    function showResult(result) {
        resultText.textContent = result;
        resultScreen.style.display = "flex";
    }

    // Event listener for new game button
    newGameButton.addEventListener("click", () => {
        resetGame();
        resultScreen.style.display = "none";
    });

    // Function to reset the game
    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
});
