# Retro Tetris Blueprint

## Overview

This document outlines the plan for creating a classic Tetris game using HTML, CSS, and JavaScript. The game is designed to be responsive and visually appealing, following modern web development best practices.

## Design and Features

### Visuals

*   **Color Palette:** A vibrant and energetic color palette is used for the tetrominoes and the game interface.
*   **Typography:** Expressive and clear typography is used for the score and other game information.
*   **Effects:** Subtle visual effects like drop shadows are used to create a sense of depth and a "lifted" look for the game elements.

### Gameplay

*   **Game Board:** A standard 10x20 grid.
*   **Tetrominoes:** All seven classic Tetris pieces are included.
*   **Controls:** Keyboard and touch controls for moving and rotating the pieces.
*   **Scoring:** The score is displayed and increases as lines are cleared.
*   **Leveling:** The game's difficulty increases as the player scores points.
*   **Next Piece Display:** The next tetromino to appear is displayed to the player.
*   **Game Over:** The game ends when the pieces stack up to the top of the board.

## Current Plan

### Phase 1: Core Game Logic and UI

1.  **`index.html`:** The basic HTML structure for the game, including the game board, score display, level display, and next piece display.
2.  **`style.css`:** The game board, tetrominoes, and other UI elements are styled to be visually appealing and responsive.
3.  **`main.js`:** The core game logic, including:
    *   Creating the game board grid.
    *   Defining the shapes and colors of the tetrominoes.
    *   Handling piece movement (left, right, down) and rotation.
    *   Detecting and clearing completed lines.
    *   Keeping track of the score and level.
    *   Implementing the "game over" condition.
    *   Displaying the next piece.
    *   Handling touch controls.
