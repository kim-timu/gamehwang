# Blueprint: ACD Games Hub

## Project Overview

This project is a web-based games hub that hosts a collection of classic games built with plain HTML, CSS, and JavaScript. The main page allows users to select which game they want to play.

## Project Structure

The project is organized into subdirectories for each game, with a main `index.html` at the root serving as the hub.

```
/
├── index.html              # The main game selection hub
├── matching-game/
│   ├── imagemat01.html     # Image Matching Game - Level 1 (4x4)
│   ├── imagemat02.html     # Image Matching Game - Level 2 (6x6)
│   ├── imagemat03.html     # Image Matching Game - Level 3 (8x8)
│   ├── main01.js
│   ├── main02.js
│   ├── main03.js
│   ├── style.css
│   └── blueprint.md        # Blueprint for the Image Matching Game
└── minesweeper/
    ├── minesweeper01.html  # Minesweeper - Level 1 (Easy)
    ├── minesweeper02.html  # Minesweeper - Level 2 (Medium)
    ├── minesweeper03.html  # Minesweeper - Level 3 (Hard)
    ├── main01.js
    ├── main02.js
    ├── main03.js
    ├── style.css
    └── blueprint.md        # Blueprint for the Minesweeper Game
```

## Games

### 1. Image Matching Game

*   **Description:** A classic memory card game with levels separated into individual HTML files.
*   **Starting Point:** `/matching-game/imagemat01.html`
*   **Details:** See the [Image Matching Game Blueprint](./matching-game/blueprint.md).

### 2. Minesweeper

*   **Description:** A faithful recreation of the classic Minesweeper game with difficulty levels separated into individual HTML files.
*   **Starting Point:** `/minesweeper/minesweeper01.html`
*   **Details:** See the [Minesweeper Blueprint](./minesweeper/blueprint.md).
