document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const difficultySelector = document.getElementById('difficulty');
    const restartBtn = document.getElementById('restart-btn');
    const gameBoard = document.getElementById('game-board');
    const minesCountSpan = document.getElementById('mines-count');
    const timerSpan = document.getElementById('timer');

    // Game Settings
    const difficulties = {
        easy: { rows: 9, cols: 9, mines: 10 },
        medium: { rows: 16, cols: 16, mines: 40 },
        hard: { rows: 16, cols: 30, mines: 99 }
    };

    let currentDifficulty = difficulties.medium;
    let board = [];
    let gameOver = false;
    let flags = 0;
    let timer;
    let timeElapsed = 0;

    // --- Game Setup ---
    function startGame() {
        currentDifficulty = difficulties[difficultySelector.value];
        gameOver = false;
        flags = 0;
        timeElapsed = 0;
        clearInterval(timer);
        timerSpan.textContent = timeElapsed;

        minesCountSpan.textContent = currentDifficulty.mines;
        document.getElementById('game-over-message').classList.add('hidden');

        createBoard();
        addEventListeners();
    }

    function createBoard() {
        board = [];
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${currentDifficulty.cols}, 1fr)`;

        // 1. Initialize empty board
        for (let r = 0; r < currentDifficulty.rows; r++) {
            const row = [];
            for (let c = 0; c < currentDifficulty.cols; c++) {
                row.push({
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    adjacentMines: 0
                });
            }
            board.push(row);
        }

        // 2. Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < currentDifficulty.mines) {
            const r = Math.floor(Math.random() * currentDifficulty.rows);
            const c = Math.floor(Math.random() * currentDifficulty.cols);
            if (!board[r][c].isMine) {
                board[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // 3. Calculate adjacent mines
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (!board[r][c].isMine) {
                    let count = 0;
                    // Check all 8 neighbors
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const newR = r + i;
                            const newC = c + j;
                            if (newR >= 0 && newR < currentDifficulty.rows && newC >= 0 && newC < currentDifficulty.cols) {
                                if (board[newR][newC].isMine) {
                                    count++;
                                }
                            }
                        }
                    }
                    board[r][c].adjacentMines = count;
                }
            }
        }
        
    function createBoard() {
        board = [];
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${currentDifficulty.cols}, 1fr)`;

        // 1. Initialize empty board
        for (let r = 0; r < currentDifficulty.rows; r++) {
            const row = [];
            for (let c = 0; c < currentDifficulty.cols; c++) {
                row.push({
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    adjacentMines: 0,
                    element: null
                });
            }
            board.push(row);
        }

        // 2. Place mines randomly (will be adjusted on first click)
        
        // 3. Render the board in HTML and create elements
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                const cellEl = document.createElement('div');
                cellEl.classList.add('cell');
                cellEl.dataset.row = r;
                cellEl.dataset.col = c;

                cellEl.addEventListener('click', handleCellClick);
                cellEl.addEventListener('contextmenu', handleFlag);

                board[r][c].element = cellEl;
                gameBoard.appendChild(cellEl);
            }
        }
    }

    let firstClick = true;

    function setupMinesAndNumbers(firstRow, firstCol) {
        // Place mines randomly, avoiding the first clicked cell
        let minesPlaced = 0;
        while (minesPlaced < currentDifficulty.mines) {
            const r = Math.floor(Math.random() * currentDifficulty.rows);
            const c = Math.floor(Math.random() * currentDifficulty.cols);
            if (!board[r][c].isMine && !(r === firstRow && c === firstCol)) {
                board[r][c].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate adjacent mines
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (!board[r][c].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const newR = r + i;
                            const newC = c + j;
                            if (newR >= 0 && newR < currentDifficulty.rows && newC >= 0 && newC < currentDifficulty.cols) {
                                if (board[newR][newC].isMine) {
                                    count++;
                                }
                            }
                        }
                    }
                    board[r][c].adjacentMines = count;
                }
            }
        }
    }

    function handleCellClick(e) {
        if (gameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const cellData = board[row][col];

        if (firstClick) {
            setupMinesAndNumbers(row, col);
            startTimer();
            firstClick = false;
        }

        if (cellData.isFlagged || cellData.isRevealed) return;

        if (cellData.isMine) {
            revealAllMines();
            endGame(false);
            return;
        }
        
        revealCell(row, col);
        checkWinCondition();
    }
    
    function handleFlag(e) {
        e.preventDefault();
        if (gameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const cellData = board[row][col];

        if (cellData.isRevealed) return;

        cellData.isFlagged = !cellData.isFlagged;
        
        if(cellData.isFlagged) {
            flags++;
            cellData.element.innerHTML = '🚩';
            cellData.element.classList.add('flagged');
        } else {
            flags--;
            cellData.element.innerHTML = '';
            cellData.element.classList.remove('flagged');
        }
        minesCountSpan.textContent = currentDifficulty.mines - flags;
    }

    function revealCell(r, c) {
        const cellData = board[r][c];
        if (cellData.isRevealed || cellData.isFlagged || cellData.isMine) return;

        cellData.isRevealed = true;
        cellData.element.classList.add('revealed');

        if (cellData.adjacentMines > 0) {
            cellData.element.textContent = cellData.adjacentMines;
            cellData.element.classList.add(`c${cellData.adjacentMines}`);
        } else {
            // Recursively reveal neighbors if cell is empty
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newR = r + i;
                    const newC = c + j;
                    if (newR >= 0 && newR < currentDifficulty.rows && newC >= 0 && newC < currentDifficulty.cols) {
                        if (!board[newR][newC].isRevealed) {
                           revealCell(newR, newC);
                        }
                    }
                }
            }
        }
    }

    function startTimer() {
        timeElapsed = 0;
        timer = setInterval(() => {
            timeElapsed++;
            timerSpan.textContent = timeElapsed;
        }, 1000);
    }
    
    // --- Game Lifecycle ---
    function checkWinCondition() {
        let revealedCount = 0;
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (board[r][c].isRevealed) {
                    revealedCount++;
                }
            }
        }
        if (revealedCount === currentDifficulty.rows * currentDifficulty.cols - currentDifficulty.mines) {
            endGame(true);
        }
    }

    function endGame(isWin) {
        gameOver = true;
        clearInterval(timer);
        const messageEl = document.getElementById('game-over-message');
        const resultTextEl = document.getElementById('result-text');
        
        if (isWin) {
            resultTextEl.textContent = `You win! Your time: ${timeElapsed}s`;
        } else {
            resultTextEl.textContent = 'You lose! You hit a mine.';
            revealAllMines();
        }
        messageEl.classList.remove('hidden');
    }

    function revealAllMines() {
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (board[r][c].isMine) {
                    board[r][c].element.classList.add('mine');
                    board[r][c].element.innerHTML = '💣';
                }
            }
        }
    }


    restartBtn.addEventListener('click', startGame);
    difficultySelector.addEventListener('change', startGame);

    // Initial game start
    startGame();
});
