# Blueprint: Minesweeper Game

## Overview

A classic Minesweeper game built with standard HTML, CSS, and JavaScript. The game is structured into distinct HTML and JavaScript files for each difficulty level, ensuring clear progression.

## Design and Style

*   **Layout:** A compact layout featuring game controls (restart) and game info (mine count, timer) above the main game board.
*   **Theme:** A "Neumorphic" design, using soft shadows to create a plastic, extruded look.
*   **Color Palette:**
    *   Background: A light gray (`#f0f2f5`).
    *   Cells: A slightly darker gray (`#e0e5ec`) with inset and outset shadows to show depth.
    *   Mines: Red (`#d32f2f`).
    *   Flags: Orange (`#f57c00`).
*   **Typography:** Clean, sans-serif font (Poppins).

## Features

*   **Level 1 (Easy - 9x9, 10 mines):** `minesweeper01.html`
*   **Level 2 (Medium - 16x16, 40 mines):** `minesweeper02.html`
*   **Level 3 (Hard - 16x30, 99 mines):** `minesweeper03.html`
*   **Game Board:** A static grid for each level, defined in its respective HTML and JavaScript file.
*   **Gameplay:**
    *   **Left-click:** Reveals a cell. If the cell is a mine, the game is over. If the cell is empty (0 adjacent mines), it recursively reveals all neighboring empty cells.
    *   **Right-click:** Flags or un-flags a cell as a potential mine.
*   **First-Click Safety:** The first cell clicked in any game is guaranteed not to be a mine.
*   **Game Timer:** A timer starts on the first click and tracks the game duration.
*   **Mine Counter:** Displays the total number of mines minus the number of flags placed.
*   **Win/Loss Condition:**
    *   **Loss:** The player loses if they click on a mine. All mines are revealed.
    *   **Win:** The player wins by revealing all non-mine cells. A confirmation message is displayed, and the player is redirected to the next level's HTML file. After the final level, the player is redirected to the main game hub.
*   **Restart Game:** A "New Game" button on each level allows the player to restart the current level.

## Development Plan

1.  **[Completed]** **Structure (`index.html`):** Create the main HTML structure for the game board, controls, and info panel, removing the difficulty selector.
2.  **[Completed]** **Styling (`style.css`):** Implement the full visual design, including the neumorphic theme and cell styles.
3.  **[Completed]** **Core Logic (`main.js`):**
    *   Implement board generation and a progressive level system.
    *   Implement mine placement with first-click safety.
    *   Calculate adjacent mine counts for all cells.
4.  **[Completed]** **Interaction Logic (`main.js`):**
    *   Implement left-click (reveal) and right-click (flag) functionality.
    *   Implement recursive reveal for empty cells.
5.  **[Completed]** **Game State (`main.js`):**
    *   Implement the timer.
    *   Implement the win/loss conditions and end-game display, including level progression.

## Refactoring for File-per-Level Structure

1.  **[Completed]** **Level 1 (Easy) (`minesweeper01.html`, `main01.js`):**
    *   Hardcoded difficulty to 'easy'.
    *   Win condition redirects to `minesweeper02.html`.
2.  **[Completed]** **Level 2 (Medium) (`minesweeper02.html`, `main02.js`):**
    *   Hardcoded difficulty to 'medium'.
    *   Win condition redirects to `minesweeper03.html`.
3.  **[Completed]** **Level 3 (Hard) (`minesweeper03.html`, `main03.js`):**
    *   Hardcoded difficulty to 'hard'.
    *   Win condition redirects to the main game hub (`../../index.html`).
