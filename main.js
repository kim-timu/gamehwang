document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesCountSpan = document.getElementById('moves-count');
    const restartBtn = document.getElementById('restart-btn');

    const emojis = ['😊', '😂', '😍', '🤔', '😎', '😡', '😭', '🤯'];
    let cards = [...emojis, ...emojis];

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
        gameBoard.innerHTML = '';
        moves = 0;
        matchedPairs = 0;
        movesCountSpan.textContent = moves;
        flippedCards = [];
        lockBoard = false;
        
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
            // Matched
            card1.classList.add('is-matched');
            card2.classList.add('is-matched');
            matchedPairs++;
            flippedCards = [];
            lockBoard = false;
            checkWinCondition();
        } else {
            // Not a match
            setTimeout(() => {
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }

    function checkWinCondition() {
        if (matchedPairs === emojis.length) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves!`);
            }, 500);
        }
    }

    restartBtn.addEventListener('click', createBoard);

    // Initial board creation
    createBoard();
});