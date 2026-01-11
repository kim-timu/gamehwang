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
└── number-sequence-puzzle/
    ├── index.html          # Number Sequence Puzzle Game
    ├── style.css
    ├── main.js
    └── blueprint.md        # Blueprint for the Number Sequence Puzzle Game
```

## Global Features

### Test Mode

*   **Description:** A feature accessible from the main game hub (`index.html`) via a checkbox. When activated, it enables a "Pass" button on every game level.
*   **Functionality:** Clicking the "Pass" button instantly advances the player to the next level (or the game hub if it's the last level), allowing for quick testing and demonstration without completing the game normally.
*   **State Persistence:** The state of the "Test Mode" checkbox is saved in `localStorage`, so it persists across page reloads and navigations.

## Games

### 1. Image Matching Game

*   **Description:** A classic memory card game with levels separated into individual HTML files.
*   **Starting Point:** `/matching-game/imagemat01.html`
*   **Details:** See the [Image Matching Game Blueprint](./matching-game/blueprint.md).

### 2. Number Sequence Puzzle

*   **Description:** A sliding tile puzzle where players arrange numbered tiles in sequential order.
*   **Starting Point:** `/number-sequence-puzzle/index.html`
*   **Details:** See the [Number Sequence Puzzle Blueprint](./number-sequence-puzzle/blueprint.md).
