document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const restartBtn = document.getElementById('restart-btn');
    const gameBoard = document.getElementById('game-board');
    const minesCountSpan = document.getElementById('mines-count');
    const timerSpan = document.getElementById('timer');
    const messageEl = document.getElementById('game-over-message');
    const resultTextEl = document.getElementById('result-text');

    // Game Settings
    const difficulties = {
        easy: { name: 'Easy', rows: 9, cols: 9, mines: 10 },
        medium: { name: 'Medium', rows: 16, cols: 16, mines: 40 },
        hard: { name: 'Hard', rows: 16, cols: 30, mines: 99 }
    };
    const levelOrder = ['easy', 'medium', 'hard'];
    let currentLevelIndex = 0;

    let board = [];
    let gameOver = false;
    let firstClick = true;
    let flags = 0;
    let timer;
    let timeElapsed = 0;

    // --- Game Setup ---
    function startGame() {
        const levelKey = levelOrder[currentLevelIndex];
        const currentDifficulty = difficulties[levelKey];

        gameOver = false;
        firstClick = true;
        flags = 0;
        timeElapsed = 0;
        clearInterval(timer);
        timerSpan.textContent = timeElapsed;

        minesCountSpan.textContent = currentDifficulty.mines;
        messageEl.classList.add('hidden');

        createBoard(currentDifficulty);
    }

    function createBoard(difficulty) {
        board = [];
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${difficulty.cols}, 1fr)`;

        for (let r = 0; r < difficulty.rows; r++) {
            const row = [];
            for (let c = 0; c < difficulty.cols; c++) {
                const cellEl = document.createElement('div');
                cellEl.classList.add('cell');
                cellEl.dataset.row = r;
                cellEl.dataset.col = c;
                
                cellEl.addEventListener('click', handleCellClick);
                cellEl.addEventListener('contextmenu', handleFlag);
                
                row.push({
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    adjacentMines: 0,
                    element: cellEl
                });
                gameBoard.appendChild(cellEl);
            }
            board.push(row);
        }
    }

    function setupMinesAndNumbers(firstRow, firstCol) {
        const difficulty = difficulties[levelOrder[currentLevelIndex]];
        let minesPlaced = 0;
        while (minesPlaced < difficulty.mines) {
            const r = Math.floor(Math.random() * difficulty.rows);
            const c = Math.floor(Math.random() * difficulty.cols);
            if (!board[r][c].isMine && !(r === firstRow && c === firstCol)) {
                board[r][c].isMine = true;
                minesPlaced++;
            }
        }

        for (let r = 0; r < difficulty.rows; r++) {
            for (let c = 0; c < difficulty.cols; c++) {
                if (board[r][c].isMine) continue;
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newR = r + i;
                        const newC = c + j;
                        if (newR >= 0 && newR < difficulty.rows && newC >= 0 && newC < difficulty.cols && board[newR][newC].isMine) {
                            count++;
                        }
                    }
                }
                board[r][c].adjacentMines = count;
            }
        }
    }

    // --- Event Handlers ---
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
        const minesLeft = difficulties[levelOrder[currentLevelIndex]].mines;
        
        if(cellData.isFlagged) {
            flags++;
            cellData.element.innerHTML = '🚩';
            cellData.element.classList.add('flagged');
        } else {
            flags--;
            cellData.element.innerHTML = '';
            cellData.element.classList.remove('flagged');
        }
        minesCountSpan.textContent = minesLeft - flags;
    }

    function revealCell(r, c) {
        const difficulty = difficulties[levelOrder[currentLevelIndex]];
        const cellData = board[r][c];

        if (cellData.isRevealed || cellData.isFlagged) return;

        cellData.isRevealed = true;
        cellData.element.classList.add('revealed');

        if (cellData.isMine) return;

        if (cellData.adjacentMines > 0) {
            cellData.element.textContent = cellData.adjacentMines;
            cellData.element.classList.add(`c${cellData.adjacentMines}`);
        } else {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const newR = r + i;
                    const newC = c + j;
                    if (newR >= 0 && newR < difficulty.rows && newC >= 0 && newC < difficulty.cols) {
                        revealCell(newR, newC);
                    }
                }
            }
        }
    }

    // --- Game Lifecycle ---
    function startTimer() {
        if(timer) clearInterval(timer);
        timeElapsed = 0;
        timer = setInterval(() => {
            timeElapsed++;
            timerSpan.textContent = timeElapsed;
        }, 1000);
    }

    function checkWinCondition() {
        const difficulty = difficulties[levelOrder[currentLevelIndex]];
        let revealedCount = 0;
        for (let r = 0; r < difficulty.rows; r++) {
            for (let c = 0; c < difficulty.cols; c++) {
                if (board[r][c].isRevealed) revealedCount++;
            }
        }
        if (revealedCount === difficulty.rows * difficulty.cols - difficulty.mines) {
            endGame(true);
        }
    }

    function endGame(isWin) {
        gameOver = true;
        clearInterval(timer);
        
        if (isWin) {
            const currentLevelName = difficulties[levelOrder[currentLevelIndex]].name;
            resultTextEl.textContent = `You cleared ${currentLevelName} in ${timeElapsed}s!`;
            messageEl.classList.remove('hidden');

            setTimeout(() => {
                currentLevelIndex++;
                if (currentLevelIndex >= levelOrder.length) {
                    alert("You've mastered all levels! Restarting from the beginning.");
                    currentLevelIndex = 0;
                }
                startGame();
            }, 3000);

        } else {
            resultTextEl.textContent = 'You lose! You hit a mine.';
            revealAllMines();
            messageEl.classList.remove('hidden');
        }
    }

    function revealAllMines() {
        const difficulty = difficulties[levelOrder[currentLevelIndex]];
        for (let r = 0; r < difficulty.rows; r++) {
            for (let c = 0; c < difficulty.cols; c++) {
                if (board[r][c].isMine) {
                    board[r][c].element.classList.add('mine');
                    board[r][c].element.innerHTML = '💣';
                }
            }
        }
    }

    restartBtn.addEventListener('click', () => {
        currentLevelIndex = 0;
        startGame();
    });

    // Initial game start
    startGame();
});
