document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesCountSpan = document.getElementById('moves-count');
    const restartBtn = document.getElementById('restart-btn');

    // Expanded emoji list for larger boards
    const allEmojis = [
        '😊', '😂', '😍', '🤔', '😎', '😡', '😭', '🤯',
        '👍', '👎', '❤️', '🔥', '⭐', '🚀', '💯', '🎉',
        '🐶', '🐱'
    ];
    
    const gridLevels = [4, 6]; // Defines grid dimensions for levels: 4x4, 6x6
    let currentLevelIndex = 0;

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        const dimension = gridLevels[currentLevelIndex];
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${dimension}, 1fr)`;
        
        moves = 0;
        matchedPairs = 0;
        movesCountSpan.textContent = moves;
        flippedCards = [];
        lockBoard = false;
        
        const numPairs = (dimension * dimension) / 2;
        const emojisForLevel = allEmojis.slice(0, numPairs);
        cards = [...emojisForLevel, ...emojisForLevel];
        shuffle(cards);

        cards.forEach(emoji => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;

            card.innerHTML = `
                <div class="card-face card-front">${emoji}</div>
                <div class="card-face card-back">?</div>
            `;

            card.addEventListener('click', handleCardClick);
            gameBoard.appendChild(card);
        });
    }

    function handleCardClick() {
        if (lockBoard || this.classList.contains('is-flipped')) {
            return;
        }

        this.classList.add('is-flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            incrementMoves();
            checkForMatch();
        }
    }

    function incrementMoves() {
        moves++;
        movesCountSpan.textContent = moves;
    }

    function checkForMatch() {
        lockBoard = true;
        const [card1, card2] = flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('is-matched');
            card2.classList.add('is-matched');
            matchedPairs++;
            flippedCards = [];
            lockBoard = false;
            checkWinCondition();
        } else {
            setTimeout(() => {
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }

    function checkWinCondition() {
        const dimension = gridLevels[currentLevelIndex];
        const numPairs = (dimension * dimension) / 2;

        if (matchedPairs === numPairs) {
            setTimeout(() => {
                alert(`Congratulations! You cleared the ${dimension}x${dimension} board in ${moves} moves!`);
                currentLevelIndex++;
                if (currentLevelIndex >= gridLevels.length) {
                    alert("You've mastered all levels! Restarting from the beginning.");
                    currentLevelIndex = 0;
                }
                createBoard();
            }, 500);
        }
    }

    restartBtn.addEventListener('click', () => {
        currentLevelIndex = 0;
        createBoard();
    });

    // Initial board creation
    createBoard();
});