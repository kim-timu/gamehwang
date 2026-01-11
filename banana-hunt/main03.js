document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const restartBtn = document.getElementById('restart-btn');
    const passBtn = document.getElementById('pass-btn');
    const gameBoard = document.getElementById('game-board');
    const bananasCountSpan = document.getElementById('bananas-count'); // Renamed from minesCountSpan
    const timerSpan = document.getElementById('timer');
    const messageEl = document.getElementById('game-over-message');
    const resultTextEl = document.getElementById('result-text');

    // Game Settings (Hardcoded for Level 3: Expert)
    const currentDifficulty = { name: 'Expert', rows: 9, cols: 9, bananas: 10 }; // Changed 'mines' to 'bananas'
    const nextLevelURL = '../../index.html'; // Redirect to main hub after final level

    let board = [];
    let gameOver = false;
    let firstClick = true;
    let monkeyMarkers = 0; // Renamed 'flags' to 'monkeyMarkers'
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
        monkeyMarkers = 0;
        timeElapsed = 0;
        clearInterval(timer);
        timerSpan.textContent = timeElapsed;

        bananasCountSpan.textContent = currentDifficulty.bananas; // Renamed from minesCountSpan
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
                cellEl.addEventListener('contextmenu', handleMonkeyMarker); // Renamed handleFlag
                
                row.push({
                    isBanana: false, // Renamed 'isMine' to 'isBanana'
                    isRevealed: false,
                    isMonkeyMarked: false, // Renamed 'isFlagged' to 'isMonkeyMarked'
                    adjacentBananas: 0, // Renamed 'adjacentMines' to 'adjacentBananas'
                    element: cellEl
                });
                gameBoard.appendChild(cellEl);
            }
            board.push(row);
        }
    }

    function setupBananasAndNumbers(firstRow, firstCol) { // Renamed setupMinesAndNumbers
        let bananasPlaced = 0; // Renamed minesPlaced
        while (bananasPlaced < currentDifficulty.bananas) { // Changed 'mines' to 'bananas'
            const r = Math.floor(Math.random() * currentDifficulty.rows);
            const c = Math.floor(Math.random() * currentDifficulty.cols);
            if (!board[r][c].isBanana && !(r === firstRow && c === firstCol)) { // Changed 'isMine' to 'isBanana'
                board[r][c].isBanana = true; // Changed 'isMine' to 'isBanana'
                bananasPlaced++;
            }
        }

        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (board[r][c].isBanana) continue; // Changed 'isMine' to 'isBanana'
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const newR = r + i;
                        const newC = c + j;
                        if (newR >= 0 && newR < currentDifficulty.rows && newC >= 0 && newC < currentDifficulty.cols && board[newR][newC].isBanana) { // Changed 'isMine' to 'isBanana'
                            count++;
                        }
                    }
                }
                board[r][c].adjacentBananas = count; // Renamed 'adjacentMines' to 'adjacentBananas'
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
            setupBananasAndNumbers(row, col); // Renamed
            startTimer();
            firstClick = false;
        }

        if (cellData.isMonkeyMarked || cellData.isRevealed) return; // Renamed 'isFlagged' to 'isMonkeyMarked'

        if (cellData.isBanana) { // Renamed 'isMine' to 'isBanana'
            endGame(false);
            return;
        }
        
        revealCell(row, col);
        checkWinCondition();
    }

    function handleMonkeyMarker(e) { // Renamed handleFlag
        e.preventDefault();
        if (gameOver) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const cellData = board[row][col];

        if (cellData.isRevealed) return;

        cellData.isMonkeyMarked = !cellData.isMonkeyMarked; // Renamed 'isFlagged'
        const bananasLeft = currentDifficulty.bananas; // Renamed 'minesLeft'
        
        if(cellData.isMonkeyMarked) { // Renamed 'isFlagged'
            monkeyMarkers++; // Renamed 'flags'
            cellData.element.innerHTML = '🐒'; // Changed icon to Monkey
            cellData.element.classList.add('monkey-marked'); // Renamed 'flagged'
        } else {
            monkeyMarkers--; // Renamed 'flags'
            cellData.element.innerHTML = '';
            cellData.element.classList.remove('monkey-marked'); // Renamed 'flagged'
        }
        bananasCountSpan.textContent = bananasLeft - monkeyMarkers; // Renamed 'minesCountSpan' and 'flags'
    }

    function revealCell(r, c) {
        const cellData = board[r][c];

        if (cellData.isRevealed || cellData.isMonkeyMarked) return; // Renamed 'isFlagged'

        cellData.isRevealed = true;
        cellData.element.classList.add('revealed');

        if (cellData.isBanana) return; // Renamed 'isMine'

        if (cellData.adjacentBananas > 0) { // Renamed 'adjacentMines'
            cellData.element.textContent = cellData.adjacentBananas; // Renamed 'adjacentMines'
            cellData.element.classList.add(`c${cellData.adjacentBananas}`); // Renamed 'adjacentMines'
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
                if (board[r][c].isRevealed) {
                    revealedCount++;
                }
            }
        }
        if (revealedCount === currentDifficulty.rows * currentDifficulty.cols - currentDifficulty.bananas) { // Changed 'mines' to 'bananas'
            endGame(true);
        }
    }

    function endGame(isWin) {
        gameOver = true;
        clearInterval(timer);
        
        if (isWin) {
            resultTextEl.textContent = `You found all bananas in ${currentDifficulty.name} level in ${timeElapsed}s!`; // Updated win message
            messageEl.classList.remove('hidden');

            setTimeout(() => {
                window.location.href = nextLevelURL; // Redirect to the next level
            }, 3000);

        } else {
            resultTextEl.textContent = 'You stepped on a banana peel! Game Over!'; // Updated lose message
            revealAllBananas(); // Renamed revealAllMines
            messageEl.classList.remove('hidden');
        }
    }

    function revealAllBananas() { // Renamed revealAllMines
        for (let r = 0; r < currentDifficulty.rows; r++) {
            for (let c = 0; c < currentDifficulty.cols; c++) {
                if (board[r][c].isBanana) { // Changed 'isMine'
                    board[r][c].element.classList.add('banana'); // Changed 'mine' class
                    board[r][c].element.innerHTML = '🍌'; // Changed icon to Banana
                }
            }
        }
    }

    restartBtn.addEventListener('click', startGame);

    // Initial game start
    startGame();
});