# Blueprint: Image Matching Puzzle Game

## Overview

A classic web-based memory card game where the player flips cards to find and match pairs of images. The game is built with standard HTML, CSS, and JavaScript, focusing on a clean, responsive design and smooth user experience.

## Design and Style

*   **Layout:** A centered, responsive grid for the game board that adapts to various screen sizes.
*   **Color Palette:** A modern and playful color scheme.
    *   Background: A soft, light gray (`#f0f0f0`) with a subtle noise texture.
    *   Cards: White cards (`#ffffff`) with a pronounced drop shadow to give a "lifted" feel.
    *   Accent/Highlight: A vibrant blue (`#007bff`) for buttons and interactive elements.
*   **Typography:** Clean, sans-serif font (like Arial or Helvetica) for readability.
*   **Animations:**
    *   **Card Flip:** A smooth 3D flip transition (`transform: rotateY(180deg)`).
    *   **Button Hover:** A subtle "glow" effect on the reset button.
*   **Iconography:** A set of fun and easily distinguishable Emojis will be used for the card faces.

## Features

*   **Progressive Levels:** The game starts with a 4x4 grid. After winning, the player advances to a 6x6 grid, and then an 8x8 grid. After clearing all levels, the game resets to the beginning.
*   **Game Board:** A dynamic grid of cards, generated with JavaScript.
*   **Card Shuffling:** Cards are randomly shuffled at the start of each game.
*   **Card Flipping:** Clicking a card flips it over to reveal the image. A maximum of two cards can be flipped at a time.
*   **Matching Logic:**
    *   If the two flipped cards have the same image, they remain face-up.
    *   If they do not match, they are automatically flipped back face-down after a short delay (1 second).
*   **Win Condition:** The game is won when all pairs have been successfully matched. A confirmation message is displayed, and the next level is loaded.
*   **Restart Game:** A "Restart Game" button allows the player to reset the game to the first level (4x4) at any time.
*   **Move Counter:** A display that counts how many moves (pairs of flips) the player has made.

## Current Development Plan

1.  **[Completed]** **Structure (`index.html`):** Create the main HTML structure for the game, including the game board container, score panel, and restart button.
2.  **[Completed]** **Styling (`style.css`):** Implement the full visual design, including the responsive layout, card styles, and flip animations.
3.  **[Completed]** **Logic (`main.js`):**
    *   Define the card set and shuffle logic.
    *   Implement card generation and rendering.
    *   Add event listeners for card clicks.
    *   Build the core matching and game state logic.
    *   Implement the win condition and restart functionality.
4.  **[Completed]** **Final Review:** Test the game for bugs and ensure all features work as intended.

## Enhancements

1.  **[Completed]** **Progressive Levels (`main.js`):**
    *   Implemented a level system (`[4x4, 6x6, 8x8]`).
    *   Expanded the emoji set to support larger boards.
    *   Updated `createBoard()` to dynamically generate grids based on the current level.
    *   Modified `checkWinCondition()` to advance to the next level upon completion.
    *   Updated the restart button to reset the game to level 1.
    *   Adjusted CSS to handle smaller cards on larger boards.