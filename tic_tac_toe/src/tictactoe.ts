//
// TicTacToe Classic - Main container (vanilla Typescript + DOM)
//
// A simple, minimalist, and interactive two-player TicTacToe game.
//

// PUBLIC_INTERFACE
export class TicTacToeGame {
  private board: (null | "X" | "O")[][];
  private currentPlayer: "X" | "O";
  private finished: boolean;
  private winner: null | "X" | "O";
  private moves: number;
  private readonly root: HTMLElement;

  /**
   * PUBLIC_INTERFACE
   * Construct the game referencing a DOM root element (div/etc).
   * @param rootElement - DOM element where the game will be rendered
   */
  constructor(rootElement: HTMLElement) {
    this.root = rootElement;
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.currentPlayer = "X";
    this.finished = false;
    this.winner = null;
    this.moves = 0;
    this.render();
  }

  // PUBLIC_INTERFACE
  restart() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
    this.currentPlayer = "X";
    this.finished = false;
    this.winner = null;
    this.moves = 0;
    this.render();
  }

  private switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  private handleCellClick(row: number, col: number) {
    if (this.finished || this.board[row][col] !== null) {
      return;
    }
    this.board[row][col] = this.currentPlayer;
    this.moves += 1;
    this.checkGameStatus();
    if (!this.finished) this.switchPlayer();
    this.render();
  }

  private checkGameStatus() {
    // Check win for current player
    const b = this.board;
    const player = this.currentPlayer;

    // rows
    for (let i = 0; i < 3; i++) {
      if (b[i][0] === player && b[i][1] === player && b[i][2] === player) {
        this.finished = true;
        this.winner = player;
        return;
      }
    }
    // columns
    for (let j = 0; j < 3; j++) {
      if (b[0][j] === player && b[1][j] === player && b[2][j] === player) {
        this.finished = true;
        this.winner = player;
        return;
      }
    }
    // diagonals
    if (b[0][0] === player && b[1][1] === player && b[2][2] === player) {
      this.finished = true;
      this.winner = player;
      return;
    }
    if (b[0][2] === player && b[1][1] === player && b[2][0] === player) {
      this.finished = true;
      this.winner = player;
      return;
    }

    // Draw
    if (this.moves === 9) {
      this.finished = true;
      this.winner = null;
    }
  }

  private render() {
    // Clean the root
    this.root.innerHTML = "";

    // Player turn or status
    const status = document.createElement("div");
    status.className = "ttt-status";
    status.textContent = this.finished
      ? (this.winner ? `Winner: ${this.winner}!` : "It's a draw!")
      : `Turn: ${this.currentPlayer}`;
    this.root.appendChild(status);

    // Board
    const boardDiv = document.createElement("div");
    boardDiv.className = "ttt-board";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("button");
        cell.className = "ttt-cell";
        cell.textContent = this.board[i][j] === null ? "" : this.board[i][j]!;
        cell.disabled = !!this.board[i][j] || this.finished;
        cell.addEventListener("click", () => this.handleCellClick(i, j));
        boardDiv.appendChild(cell);
      }
    }
    this.root.appendChild(boardDiv);

    // Restart button
    const restartBtn = document.createElement("button");
    restartBtn.className = "ttt-restart";
    restartBtn.textContent = "Restart";
    restartBtn.onclick = () => this.restart();
    this.root.appendChild(restartBtn);
  }
}

// Minimalist styles will be added in style.css
