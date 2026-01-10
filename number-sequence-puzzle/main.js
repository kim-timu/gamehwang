document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const shuffleBtn = document.getElementById('shuffle-btn');
    const passBtn = document.getElementById('pass-btn');
    const gameBoard = document.getElementById('game-board');
    const movesCountSpan = document.getElementById('moves-count');
    const timerSpan = document.getElementById('timer');
    const messageDisplay = document.getElementById('game-over-message');
    const resultText = document.getElementById('result-text');

    // Game Settings
    const levelSizes = [3, 4, 5]; // 3x3, 4x4, 5x5 boards
    let currentLevelIndex = 0;
    const finalCompletionURL = '../../index.html'; // Redirect to main hub after final level

    let boardSize;
    let tiles = [];
    let emptyTileIndex;
    let moves = 0;
    let timer;
    let timeElapsed = 0;
    let gameOver = false;

    // --- Game Initialization ---
    function initGame() {
        boardSize = levelSizes[currentLevelIndex];
        moves = 0;
        timeElapsed = 0;
        gameOver = false;
        clearInterval(timer);
        messageDisplay.classList.add('hidden');
        updateDisplay();
        
        // Generate tiles in solved state
        tiles = Array.from({ length: boardSize * boardSize - 1 }, (_, i) => i + 1);
        tiles.push(0); // 0 represents the empty tile
        emptyTileIndex = tiles.indexOf(0);

        shuffleTiles(); // Shuffle to start
        renderBoard();
    }

    // --- Core Game Logic ---
    function renderBoard() {
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

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

    // Checks if the puzzle is solvable (algorithm specific to N-puzzle)
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

        const rowOfEmpty = Math.floor(currentEmptyIndex / boardSize);
        const parityOfBoardSize = boardSize % 2; // 0 for even, 1 for odd

        if (parityOfBoardSize === 1) { // Odd board size (e.g., 3x3, 5x5)
            return inversions % 2 === 0;
        } else { // Even board size (e.g., 4x4)
            const parityOfEmptyRow = rowOfEmpty % 2; // 0 for even row, 1 for odd row (from bottom)
            // For even boards, count rows from bottom. (boardSize - 1 - rowOfEmpty) % 2
            const rowFromBottom = boardSize - 1 - rowOfEmpty;
            if (rowFromBottom % 2 === 1) { // Empty tile on an odd row from bottom (1-indexed)
                return inversions % 2 === 0;
            } else { // Empty tile on an even row from bottom (1-indexed)
                return inversions % 2 === 1;
            }
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
        const row1 = Math.floor(index1 / boardSize);
        const col1 = index1 % boardSize;
        const row2 = Math.floor(index2 / boardSize);
        const col2 = index2 % boardSize;

        // Check if tiles are in the same row and adjacent columns OR same column and adjacent rows
        const sameRow = row1 === row2 && Math.abs(col1 - col2) === 1;
        const sameCol = col1 === col2 && Math.abs(row1 - row2) === 1;

        return sameRow || sameCol;
    }

    function checkWinCondition() {
        const solvedTiles = Array.from({ length: boardSize * boardSize - 1 }, (_, i) => i + 1);
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
                currentLevelIndex++;
                if (currentLevelIndex < levelSizes.length) {
                    alert(`Level ${currentLevelIndex + 1} (${levelSizes[currentLevelIndex]}x${levelSizes[currentLevelIndex]})!`);
                    initGame(); // Start next level
                } else {
                    alert("You've mastered all levels! Redirecting to hub.");
                    window.location.href = finalCompletionURL; // Redirect to main hub
                }
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
        tiles = Array.from({ length: boardSize * boardSize - 1 }, (_, i) => i + 1);
        tiles.push(0);
        emptyTileIndex = tiles.indexOf(0);
        renderBoard();
        moves = 0; // Reset moves for solved state
        endGame(true); // Trigger win condition and advance level
    });

    // Initial game start
    initGame();
});