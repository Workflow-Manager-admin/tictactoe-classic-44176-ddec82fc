import "./style.css";
import { TicTacToeGame } from "./tictactoe";

// Remove template content and initialize game
const appDiv = document.querySelector<HTMLDivElement>("#app");
if (appDiv) {
  // Create a container div for centering, game UI will be inside
  const tttContainer = document.createElement("div");
  tttContainer.className = "ttt-container";
  appDiv.innerHTML = ""; // Remove template demo content
  appDiv.appendChild(tttContainer);

  // Instantiate the game UI
  new TicTacToeGame(tttContainer);
}
