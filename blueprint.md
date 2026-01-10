# **Project Blueprint**

## **1. Overview**

This project is a **Game Center**, a web application that allows users to choose and play various classic games. The main entry point (`index.html`) serves as a launchpad, presenting the available games. The initial game offered is a retro-style Tetris.

## **2. Project Structure & Features**

### **a. Game Center (index.html)**

*   **Purpose:** Acts as the main landing page and game selection screen.
*   **Design:** Features a modern, dark-themed, and centered layout.
*   **Functionality:**
    *   Displays a list of available games.
    *   Currently includes a link to "Play Tetris".
    *   The link navigates the user to `tetris.html`.

### **b. Tetris Game (tetris.html & main.js)**

*   **HTML (`tetris.html`):**
    *   **Structure:** Contains the canvas for the game board, a side panel for displaying score, level, and the next piece.
    *   **Elements:** Includes a "Game Over" screen with a restart button.
*   **JavaScript (`main.js`):**
    *   **Rendering:** Manages all game logic and rendering to the HTML canvas.
    *   **Game Logic:** Implements core Tetris mechanics such as piece movement, rotation, line clearing, scoring, and leveling.
    *   **Controls:** Allows gameplay using keyboard arrow keys (left, right, down for movement, up for rotation).
    *   **State Management:** Tracks the game state, including the player's score, current level, and the speed of the falling pieces.

## **3. Current Implementation Plan**

*   **Status:** The project structure has been successfully reorganized.
*   **Action:** Created a new `index.html` to serve as the game selection screen.
*   **Action:** Renamed the original Tetris game file to `tetris.html`.
*   **Action:** Linked the "Play Tetris" button in `index.html` to `tetris.html`.
