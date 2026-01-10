# Blueprint: Image Matching Puzzle Game

## Overview

A classic web-based memory card game where the player flips cards to find and match pairs of images. The game is structured into distinct HTML and JavaScript files for each level, ensuring clear progression.

## Design and Style

*   **Layout:** A centered, responsive grid for the game board that adapts to various screen sizes.
*   **Color Palette:** A modern and playful color scheme.
    *   Background: A soft, light gray (`#f0f2f5`) with a subtle noise texture.
    *   Cards: White cards (`#ffffff`) with a pronounced drop shadow to give a "lifted" feel.
    *   Accent/Highlight: A vibrant blue (`#007bff`) for buttons and interactive elements.
*   **Typography:** Clean, sans-serif font (like Arial or Helvetica) for readability.
*   **Animations:**
    *   **Card Flip:** A smooth 3D flip transition (`transform: rotateY(180deg)`).
    *   **Button Hover:** A subtle "glow" effect on the reset button.
*   **Iconography:** A set of fun and easily distinguishable Emojis will be used for the card faces.

## Features

*   **Level 1 (4x4 Grid):** `imagemat01.html`
*   **Level 2 (6x6 Grid):** `imagemat02.html`
*   **Level 3 (8x8 Grid):** `imagemat03.html`
*   **Game Board:** A static grid for each level, defined in its respective HTML and JavaScript file.
*   **Card Shuffling:** Cards are randomly shuffled at the start of each level.
*   **Card Flipping:** Clicking a card flips it over to reveal the image. A maximum of two cards can be flipped at a time.
*   **Matching Logic:**
    *   If the two flipped cards have the same image, they remain face-up.
    *   If they do not match, they are automatically flipped back face-down after a short delay (1 second).
*   **Win Condition:** The game for a specific level is won when all pairs have been successfully matched. A confirmation message is displayed, and the player is redirected to the next level's HTML file. After the final level, the player is redirected to the main game hub.
*   **Restart Game:** A "Restart" button on each level allows the player to reset the current level.
*   **Move Counter:** A display that counts how many moves (pairs of flips) the player has made for the current level.

## Development Plan

1.  **[Completed]** **Structure (`index.html`):** Create the main HTML structure for the game, including the game board container, score panel, and restart button.
2.  **[Completed]** **Styling (`style.css`):** Implement the full visual design, including the responsive layout, card styles, and flip animations.
3.  **[Completed]** **Logic (`main.js`):**
    *   Define the card set and shuffle logic.
    *   Implement card generation and rendering.
    *   Add event listeners for card clicks.
    *   Build the core matching and game state logic.
    *   Implement the win condition and restart functionality.
4.  **[Completed]** **Final Review:** Test the game for bugs and ensure all features work as intended.

## Refactoring for File-per-Level Structure

1.  **[Completed]** **Level 1 (4x4) (`imagemat01.html`, `main01.js`):**
    *   Hardcoded dimension to 4.
    *   Win condition redirects to `imagemat02.html`.
2.  **[Completed]** **Level 2 (6x6) (`imagemat02.html`, `main02.js`):**
    *   Hardcoded dimension to 6.
    *   Win condition redirects to `imagemat03.html`.
3.  **[Completed]** **Level 3 (8x8) (`imagemat03.html`, `main03.js`):**
    *   Hardcoded dimension to 8.
    *   Win condition redirects to the main game hub (`../../index.html`).