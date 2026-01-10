document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const restartBtn = document.getElementById('restart-btn');
    const passBtn = document.getElementById('pass-btn');
    const gameBoard = document.getElementById('game-board');
    const minesCountSpan = document.getElementById('mines-count');
    const timerSpan = document.getElementById('timer');
    const messageEl = document.getElementById('game-over-message');
    const resultTextEl = document.getElementById('result-text');

    // Game Settings (Hardcoded for Easy level)
    const currentDifficulty = { name: 'Easy', rows: 9, cols: 9, mines: 10 };
    const nextLevelURL = '../../index.html'; // Redirect to main hub after this level

    let board = [];
    let gameOver = false;
    let firstClick = true;
    let flags = 0;
    let timer;
    let timeElapsed = 0;

    // Check test mode state and display pass button
    if (localStorage.getItem('acdgames_test_mode') === 'true') {
        passBtn.style.display = 'inline-block';
    }

    passBtn.addEventListener('click', () => {
        window.location.href = nextLevelURL; // Pass level instantly
    });

    // --- Game Setup ---
    function startGame() {
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
        let minesPlaced = 0;
        while (minesPlaced < currentDifficulty.mines) {
            const r = Math.floor(Math.random() * currentDifficulty.rows);
            const c = Math.floor(Math.random() * currentDifficulty.cols);
            if (!board[r][c].isMine && !(r === firstRow && c === firstCol)) {
                board[r][c].isMine = true;
                minesPlaced++;
            }
        }

        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (board[r][c].isMine) continue;
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newR = r + i;
                        const newC = c + j;
                        if (newR >= 0 && newR < currentDifficulty.rows && newC >= 0 && newC < currentDifficulty.cols && board[newR][newC].isMine) {
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
        const minesLeft = currentDifficulty.mines;
        
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
                    if (newR >= 0 && newR < currentDifficulty.rows && newC >= 0 && newC < currentDifficulty.cols) {
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
        let revealedCount = 0;
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (board[r][c].isRevealed) revealedCount++;
            }
        }
        if (revealedCount === currentDifficulty.rows * currentDifficulty.cols - currentDifficulty.mines) {
            endGame(true);
        }
    }

    function endGame(isWin) {
        gameOver = true;
        clearInterval(timer);
        
        if (isWin) {
            resultTextEl.textContent = `You cleared Easy level in ${timeElapsed}s! You've mastered all current Minesweeper levels!`;
            messageEl.classList.remove('hidden');

            setTimeout(() => {
                window.location.href = nextLevelURL; // Redirect to the next level
            }, 3000);

        } else {
            resultTextEl.textContent = 'You lose! You hit a mine.';
            revealAllMines();
            messageEl.classList.remove('hidden');
        }
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

    // Initial game start
    startGame();
});