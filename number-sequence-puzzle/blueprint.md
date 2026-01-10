# Blueprint: Number Sequence Puzzle Game

## Overview

A classic sliding puzzle game where the player arranges numbered tiles in sequential order. The game is built with standard HTML, CSS, and JavaScript.

## Design and Style

*   **Layout:** A responsive square grid for the puzzle board, centered on the page. Game controls (size selection, shuffle, pass button) and info (moves, time) are displayed above the board.
*   **Theme:** A clean, modern aesthetic with soft shadows and clear typography, consistent with other games in the hub.
*   **Color Palette:**
    *   Background: Light gray (`#f0f2f5`).
    *   Tiles: Light gray (`#e0e5ec`) with dark text (`#333`).
    *   Empty Tile: Slightly darker gray (`#c0c0c0`).
    *   Controls/Accents: Vibrant blue (`#007bff`).
*   **Typography:** Poppins font for general text, Roboto Mono for numbers on tiles for better legibility.
*   **Animations:** Smooth `transform` transitions for tile movement.

## Features

*   **Progressive Levels:** The game starts with a 3x3 board. Upon winning, the player advances to a 4x4 board, and then a 5x5 board. After clearing all levels, the player is redirected to the main game hub.
*   **Board Sizes:**
    *   Level 1: 3x3 (8 tiles)
    *   Level 2: 4x4 (15 tiles)
    *   Level 3: 5x5 (24 tiles)
*   **Tile Movement:** Players click a tile adjacent to the empty space to move it into the empty spot.
*   **Shuffling:** A "Shuffle" button to randomize the tiles, ensuring the generated puzzle is always solvable.
*   **Win Condition:** The game is won when all tiles are arranged in ascending numerical order, with the empty tile in the last position. A confirmation message is displayed, and the player is advanced to the next level or redirected to the main game hub.
*   **Moves Counter:** Tracks and displays the number of moves made.
*   **Game Timer:** Starts on the first move and tracks the total time taken to solve the puzzle.
*   **Test Mode Integration:** Integrates with the global "Test Mode" feature. When active, a "Pass" button appears, allowing instant completion of the puzzle, which also advances the player to the next level or hub.

## Development Plan

1.  **[Completed]** **Structure (`index.html`):** Create the basic HTML structure for the game board, controls, and info display, removing the difficulty selector.
2.  **[Completed]** **Styling (`style.css`):** Implement the visual design for the game, including responsive grid layout and tile appearance.
3.  **[Completed]** **Game Logic (`main.js`):**
    *   Implement board generation and tile rendering for chosen size, integrated with the progressive level system.
    *   Implement shuffling algorithm ensuring solvability.
    *   Handle tile click events for movement.
    *   Implement `isAdjacent` and `checkWinCondition` logic.
    *   Implement moves counter and timer functionality.
    *   Integrate "Test Mode" pass button functionality and level progression logic.
