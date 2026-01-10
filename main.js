const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const gameOverElement = document.getElementById('game-over');
const restartButton = document.getElementById('restart');
const nextCanvas = document.getElementById('next');
const nextContext = nextCanvas.getContext('2d');
const rotateButton = document.getElementById('rotate-btn');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 24;

context.scale(BLOCK_SIZE, BLOCK_SIZE);
nextContext.scale(BLOCK_SIZE, BLOCK_SIZE);

const COLORS = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

const arena = createMatrix(COLS, ROWS);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
    next: null,
    level: 0,
    speed: 1000,
};

let animationFrameId;

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        player.level = Math.floor(player.score / 100);
        player.speed = 1000 - player.level * 100;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0}, context);
    drawMatrix(player.matrix, player.pos, context);
}

function drawMatrix(matrix, offset, ctx) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = COLORS[value];
                ctx.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function drawNextPiece() {
    nextContext.fillStyle = '#000';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    drawMatrix(player.next, {x: 1, y: 1}, nextContext);
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    if (player.next === null) {
        player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    } else {
        player.matrix = player.next;
    }
    player.next = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        cancelAnimationFrame(animationFrameId);
        arena.forEach(row => row.fill(0));
        player.score = 0;
        player.level = 0;
        player.speed = 1000;
        updateScore();
        gameOverElement.classList.remove('hidden');
    } else {
        gameOverElement.classList.add('hidden');
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > player.speed) {
        playerDrop();
    }

    draw();
    drawNextPiece();
    animationFrameId = requestAnimationFrame(update);
}

function updateScore() {
    scoreElement.innerText = player.score;
    levelElement.innerText = player.level;
}

// Keyboard Controls
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) { // Left Arrow
        playerMove(-1);
    } else if (event.keyCode === 39) { // Right Arrow
        playerMove(1);
    } else if (event.keyCode === 40) { // Down Arrow
        playerDrop();
    } else if (event.keyCode === 38) { // Up Arrow
        playerRotate(1);
    }
});

// Touch Controls
let touchStartX = 0;
let touchStartY = 0;
let hasSwiped = false;

document.addEventListener('touchstart', event => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    hasSwiped = false;
});

document.addEventListener('touchmove', event => {
    event.preventDefault(); // Prevent screen scrolling
    const touchCurrentX = event.touches[0].clientX;
    const touchCurrentY = event.touches[0].clientY;

    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;

    const moveThreshold = 20; // Pixels to move before triggering a block move

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement
        if (Math.abs(deltaX) > moveThreshold) {
            hasSwiped = true;
            if (deltaX > 0) {
                playerMove(1);
            } else {
                playerMove(-1);
            }
            touchStartX = touchCurrentX; // Reset for next incremental move
        }
    } else {
        // Vertical movement
        if (deltaY > moveThreshold) {
            hasSwiped = true;
            playerDrop();
            touchStartY = touchCurrentY; // Reset to prevent rapid drops
        }
    }
}, { passive: false }); // passive:false is needed for preventDefault

document.addEventListener('touchend', event => {
    if (hasSwiped) {
        return; // A swipe shouldn't also be a rotation
    }

    // Check for tap or upward swipe for rotation
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const tapThreshold = 20;
    const swipeUpThreshold = -40;

    if (deltaY < swipeUpThreshold && Math.abs(deltaX) < 50) {
        playerRotate(1); // Upward swipe
    } else if (Math.abs(deltaX) < tapThreshold && Math.abs(deltaY) < tapThreshold) {
        playerRotate(1); // Tap
    }
});


// Button Controls
rotateButton.addEventListener('click', () => {
    playerRotate(1);
});

restartButton.addEventListener('click', () => {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    player.level = 0;
    player.speed = 1000;
    updateScore();
    playerReset();
    gameOverElement.classList.add('hidden');
    update();
});

// Initialize Game
playerReset();
updateScore();
update();
