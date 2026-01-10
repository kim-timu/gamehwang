document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const shuffleBtn = document.getElementById('shuffle-btn');
    const passBtn = document.getElementById('pass-btn');
    const gameBoard = document.getElementById('game-board');
    const movesCountSpan = document.getElementById('moves-count');
    const timerSpan = document.getElementById('timer');
    const messageDisplay = document.getElementById('game-over-message');
    const resultText = document.getElementById('result-text');

    // Game Settings (Hardcoded for Level 2: 8x5)
    const boardRows = 8;
    const boardCols = 5;
    const nextLevelURL = 'numberpuzzle03.html'; // Redirect to next level

    let tiles = [];
    let emptyTileIndex;
    let moves = 0;
    let timer;
    let timeElapsed = 0;
    let gameOver = false;

    // --- Game Initialization ---
    function initGame() {
        moves = 0;
        timeElapsed = 0;
        gameOver = false;
        clearInterval(timer);
        messageDisplay.classList.add('hidden');
        updateDisplay();
        
        // Generate tiles in solved state
        tiles = Array.from({ length: (boardRows * boardCols) - 1 }, (_, i) => i + 1);
        tiles.push(0); // 0 represents the empty tile
        emptyTileIndex = tiles.indexOf(0);

        shuffleTiles(); // Shuffle to start
        renderBoard();
    }

    // --- Core Game Logic ---
    function renderBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${boardCols}, 1fr)`;

        tiles.forEach((number, index) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (number === 0) {
                tile.classList.add('empty');
            } else {
                tile.textContent = number;
            }
            tile.dataset.index = index;
            tile.addEventListener('click', handleTileClick);
            gameBoard.appendChild(tile);
        });
    }

    function shuffleTiles() {
        let solvable = false;
        let shuffledTiles;
        let shuffledEmptyIndex;

        // Keep shuffling until a solvable puzzle is generated
        while (!solvable) {
            shuffledTiles = [...tiles];
            for (let i = shuffledTiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
            }
            shuffledEmptyIndex = shuffledTiles.indexOf(0);
            solvable = isSolvable(shuffledTiles, shuffledEmptyIndex);
        }

        tiles = shuffledTiles;
        emptyTileIndex = shuffledEmptyIndex;
        renderBoard();
        moves = 0;
        timeElapsed = 0;
        clearInterval(timer);
        updateDisplay();
    }

    // Checks if the puzzle is solvable (adapted for rectangular boards)
    // For rectangular boards, solvability depends on grid width and empty tile's row parity.
    function isSolvable(currentTiles, currentEmptyIndex) {
        const tempTiles = currentTiles.filter(t => t !== 0); // Remove empty tile
        let inversions = 0;
        for (let i = 0; i < tempTiles.length; i++) {
            for (let j = i + 1; j < tempTiles.length; j++) {
                if (tempTiles[i] > tempTiles[j]) {
                    inversions++;
                }
            }
        }

        const rowOfEmptyFromBottom = boardRows - 1 - Math.floor(currentEmptyIndex / boardCols);

        if (boardCols % 2 === 1) { // Odd width board (e.g., 3x3, 3x5, 5x5)
            return inversions % 2 === 0;
        } else { // Even width board (e.g., 4x4, 4x5, 5x8)
            return (inversions % 2 === 0 && rowOfEmptyFromBottom % 2 === 1) ||
                   (inversions % 2 === 1 && rowOfEmptyFromBottom % 2 === 0);
        }
    }


    function handleTileClick(event) {
        if (gameOver) return;

        const clickedIndex = parseInt(event.target.dataset.index);
        const clickedTile = tiles[clickedIndex];

        if (clickedTile === 0) return; // Cannot click empty tile

        const canMove = isAdjacent(clickedIndex, emptyTileIndex);

        if (canMove) {
            // Swap tiles
            [tiles[clickedIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[clickedIndex]];
            emptyTileIndex = clickedIndex;
            moves++;
            
            if (moves === 1 && !timer) {
                startTimer();
            }

            renderBoard();
            updateDisplay();
            checkWinCondition();
        }
    }

    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / boardCols);
        const col1 = index1 % boardCols;
        const row2 = Math.floor(index2 / boardCols);
        const col2 = index2 % boardCols;

        // Check if tiles are in the same row and adjacent columns OR same column and adjacent rows
        const sameRow = row1 === row2 && Math.abs(col1 - col2) === 1;
        const sameCol = col1 === col2 && Math.abs(row1 - row2) === 1;

        return sameRow || sameCol;
    }

    function checkWinCondition() {
        const solvedTiles = Array.from({ length: (boardRows * boardCols) - 1 }, (_, i) => i + 1);
        solvedTiles.push(0); // Empty tile at the end

        if (tiles.every((tile, index) => tile === solvedTiles[index])) {
            endGame(true);
        }
    }

    // --- Timer and Display ---
    function startTimer() {
        timer = setInterval(() => {
            timeElapsed++;
            updateDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function updateDisplay() {
        movesCountSpan.textContent = moves;
        timerSpan.textContent = timeElapsed;
    }

    function endGame(isWin) {
        gameOver = true;
        stopTimer();
        if (isWin) {
            messageDisplay.classList.remove('hidden');
            resultText.textContent = `Puzzle solved in ${moves} moves and ${timeElapsed} seconds!`;

            setTimeout(() => {
                window.location.href = nextLevelURL; // Redirect to next level
            }, 1000);
        }
    }

    // --- Event Listeners ---
    shuffleBtn.addEventListener('click', initGame); // Shuffle button now re-initializes current level

    // Test Mode Integration
    if (localStorage.getItem('acdgames_test_mode') === 'true') {
        passBtn.style.display = 'inline-block';
    }

    passBtn.addEventListener('click', () => {
        // Solve instantly (for test mode)
        tiles = Array.from({ length: (boardRows * boardCols) - 1 }, (_, i) => i + 1);
        tiles.push(0);
        emptyTileIndex = tiles.indexOf(0);
        renderBoard();
        moves = 0; // Reset moves for solved state
        endGame(true); // Trigger win condition and advance level
    });

    // Initial game start
    initGame();
});