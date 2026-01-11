# Blueprint: Banana Hunt Game

## Overview

A Minesweeper-style puzzle game where the player searches for hidden bananas. The game is structured into distinct HTML and JavaScript files for each difficulty level, ensuring clear progression.

## Design and Style

*   **Layout:** A compact layout featuring game controls (restart) and game info (banana count, timer) above the main game board. The game board cells are responsive, adapting their size to fit the grid dimensions and screen size. The header has a flexible layout to accommodate controls and information.
*   **Theme:** Adapted to Image Matching game's UI style, featuring a clean and modern aesthetic with subtle shadows for depth.
*   **Color Palette:**
    *   Background: Light gray (`#f0f2f5`).
    *   Containers/Cells: White (`#ffffff`).
    *   Text: Dark gray (`#333`).
    *   Primary Buttons/Accents: Blue (`#007bff`).
    *   Shadows: Subtle gray (`rgba(0, 0, 0, 0.1)`).
    *   Bananas: Yellow (`#ffca28`).
    *   Monkey Markers: Brown (`#6d4c41`).
*   **Typography:** Clean, sans-serif font (Poppins).

## Global Features

### Test Mode Integration

*   **Description:** This game integrates with the global "Test Mode" feature accessible from the main game hub.
*   **Functionality:** When "Test Mode" is active, a "Pass" button appears on each level. Clicking this button allows instant progression to the next level (or the game hub for the final level), bypassing normal game completion.
*   **State Persistence:** The test mode state is managed globally via `localStorage`.

## Features

*   **Level 1 (Beginner - 5x5, 3 bananas):** `bananahunt01.html`
*   **Level 2 (Experienced - 7x7, 6 bananas):** `bananahunt02.html`
*   **Level 3 (Expert - 9x9, 10 bananas):** `bananahunt03.html`
*   **Game Board:** A static grid for each level, defined in its respective HTML and JavaScript file.
*   **Gameplay:**
    *   **Left-click:** Reveals a cell. If the cell contains a banana, the game is over. If the cell is empty (0 adjacent bananas), it recursively reveals all neighboring empty cells.
    *   **Right-click:** Places or removes a monkey marker on a cell.
*   **First-Click Safety:** The first cell clicked in any game is guaranteed not to contain a banana.
*   **Game Timer:** A timer starts on the first click and tracks the game duration.
*   **Banana Counter:** Displays the total number of bananas minus the number of monkey markers placed.
*   **Win/Loss Condition:**
    *   **Loss:** The player loses if they click on a banana. All bananas are revealed.
    *   **Win:** The player wins by revealing all non-banana cells. A confirmation message is displayed, and the player is redirected to the next level's HTML file. After the final level (Level 3), the player is redirected to the main game hub. Alternatively, if "Test Mode" is active, the level can be passed instantly using the "Pass" button.
*   **Restart Game:** A "New Game" button on each level allows the player to restart the current level.

## Development Plan

1.  **[Completed]** **Structure (`bananahuntXX.html`):** Create the main HTML structure for each level's game board, controls, and info panel.
2.  **[Completed]** **Styling (`style.css`):** Implement the full visual design, adapting to Image Matching game's UI style, including responsive cell styles, and banana/monkey icons.
3.  **[Completed]** **Core Logic (`mainXX.js`):**
    *   Implement board generation and level-specific difficulty settings.
    *   Implement banana placement with first-click safety.
    *   Calculate adjacent banana counts for all cells.
4.  **[Completed]** **Interaction Logic (`mainXX.js`):**
    *   Implement left-click (reveal) and right-click (monkey marker) functionality.
    *   Implement recursive reveal for empty cells.
5.  **[Completed]** **Game State (`mainXX.js`):**
    *   Implement the timer.
    *   Implement the win/loss conditions and end-game display, including level progression.
