# Blueprint: ACD Games Hub

## Project Overview

This project is a web-based games hub that hosts a collection of classic games built with plain HTML, CSS, and JavaScript. The main page allows users to select which game they want to play.

## Project Structure

The project is organized into subdirectories for each game, with a main `index.html` at the root serving as the hub.

```
/
├── index.html              # The main game selection hub
├── matching-game/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   └── blueprint.md        # Blueprint for the Image Matching Game
└── minesweeper/
    ├── index.html
    ├── style.css
    ├── main.js
    └── blueprint.md        # Blueprint for the Minesweeper Game
```

## Games

### 1. Image Matching Game

*   **Description:** A classic memory card game with progressively harder levels.
*   **Location:** `/matching-game/index.html`
*   **Details:** See the [Image Matching Game Blueprint](./matching-game/blueprint.md).

### 2. Minesweeper

*   **Description:** A faithful recreation of the classic Minesweeper game with multiple difficulty levels.
*   **Location:** `/minesweeper/index.html`
*   **Details:** See the [Minesweeper Blueprint](./minesweeper/blueprint.md).
