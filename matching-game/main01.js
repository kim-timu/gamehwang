document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const gameBoard = document.getElementById('game-board');
    const movesCountSpan = document.getElementById('moves-count');
    const restartBtn = document.getElementById('restart-btn');
    const passBtn = document.getElementById('pass-btn');

    const allEmojis = [
        '😊', '😂', '😍', '🤔', '😎', '😡', '😭', '🤯',
        '👍', '👎', '❤️', '🔥', '⭐', '🚀', '💯', '🎉',
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
        '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🦄'
    ];
    
    // Hardcoded for Level 1 (4x4)
    const dimension = 4;
    const nextLevelURL = 'imagemat02.html'; // Redirect to next level

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let lockBoard = false;

    // Check test mode state and display pass button
    if (localStorage.getItem('acdgames_test_mode') === 'true') {
        passBtn.style.display = 'inline-block';
    }

    passBtn.addEventListener('click', () => {
        window.location.href = nextLevelURL; // Pass level instantly
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = '';
        
        gameBoard.className = 'game-board'; // Reset classes
        gameBoard.classList.add(`grid-${dimension}`);

        // No grid-8-container for 4x4
        gameContainer.classList.remove('grid-8-container');

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
        const numPairs = (dimension * dimension) / 2;

        if (matchedPairs === numPairs) {
            setTimeout(() => {
                alert(`Congratulations! You cleared Level 1 (4x4) in ${moves} moves!`);
                window.location.href = nextLevelURL; // Redirect to the next level
            }, 500);
        }
    }

    restartBtn.addEventListener('click', () => {
        createBoard(); // Restart current level
    });

    createBoard(); // Initial board creation
});