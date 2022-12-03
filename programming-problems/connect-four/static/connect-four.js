class ConnectFour {
  constructor() {
    // Elements
    this.table = document.querySelector('.connect_four');
    this.buttons = this.table.querySelectorAll('button');
    this.board = this.table.querySelector('.board');
    this.rows = this.board.querySelectorAll('tr[data-index]');

    // Winner elements
    this.winningMessage = document.querySelector('.winning_wrapper');
    this.playAgain = document.getElementById('play_again');

    // Players
    this.playerOne = document.getElementById('player_1');
    this.playerTwo = document.getElementById('player_2');
    this.currentPlayer = this.playerOne;
    this.playerOne.dataset.playing = true;
    this.playerTwo.dataset.playing = false;

    // Canvas
    this.playerOneCanvas = this.playerOne.querySelector('.player_1');
    this.playerTwoCanvas = this.playerTwo.querySelector('.player_2');
    this.emptyCanvas = document.querySelectorAll('.empty_canvas');

    // Misc
    this.playerOneMoves = 0;
    this.playerTwoMoves = 0;
    this.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    this.height = 6;
    this.width = 7;
    this.winCount = 4;
    this.matches = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];
    this.winningMoves = []

    this.run();
  }

  run() {
    this.setComputerColor();
    this.playerPiece(this.playerOneCanvas);
    this.playerPiece(this.playerTwoCanvas);

    this.emptyCanvas.forEach((canvas) => this.playerPiece(canvas));
    this.buttons.forEach((button) => {
      button.addEventListener('click', this.movePiece.bind(this));
    });
  }

  setComputerColor() {
    const playerOne = document.querySelector('.player_details[data-color]');
    if (playerOne.dataset.color === '#cc0000') {
      this.playerTwoCanvas.style.color = '#ffc34d';
      document.querySelector('.computer_color').innerHTML = 'Color: #ffc34d';
    } else {
      this.playerTwoCanvas.style.color = '#cc0000';
      document.querySelector('.computer_color').innerHTML = 'Color: #cc0000';
    }
  }

  movePiece(e) {
    e.preventDefault();
    if (this.currentPlayer === this.playerOne) this.playerOneMoves++;
    else this.playerTwoMoves++;

    const column = e.target.dataset.column;
    this.insertPiece(column);
    this.switchPlayer();
  }

  insertPiece(column) {
    const reversed = [...this.rows].reverse();
    for (let i = 0; i < reversed.length; i++) {
      const el = reversed[i].querySelector(`td[data-column=${column}]`);
      const canvas = el.querySelector('canvas');
      const playerCanvas = this.currentPlayer.querySelector('canvas');
      const cloned = playerCanvas.cloneNode();
      this.playerPiece(cloned);
      if (canvas.classList.contains('empty_canvas')) {
        el.replaceChild(cloned, canvas);
        let count;
        if (cloned.classList.contains('player_1')) count = this.playerOneMoves;
        else count = this.playerTwoMoves;
        cloned.dataset.moveCount = count;
        this.collectMoves(this.currentPlayer);
        break;
      }
    }
  }

  collectMoves(player) {
    const pieces = this.board.querySelectorAll(`.${player.id}`);
    for (let i = 0; i < pieces.length; i++) {
      const column = pieces[i].closest('td').dataset.column;
      const row = pieces[i].closest('tr').dataset.index;
      const columnIndex = this.columns.indexOf(column);
      let index;

      if (this.currentPlayer === this.playerOne) index = 1;
      else index = 2;

      this.matches[row][columnIndex] = index;
      this.checkWinningMoves(player);
    }
  }

  checkWinningMoves(player) {
    if (this.isVerticalWin() || this.isHorizontalWin() || this.isDiagonalWin()) {
      this.buttons.forEach((button) => {
        button.removeEventListener('click', this.movePiece.bind(this));
        button.disabled = true;
      });

      this.winningMessage.classList.remove('hide');
      this.winningMessage.classList.add('show');
      this.winMessage(player);

      this.playAgain.addEventListener('click', () => location.reload());
      return;
    } else if (this.isADraw()) {
      this.buttons.forEach((button) => {
        button.removeEventListener('click', this.movePiece.bind(this));
        button.disabled = true;
      });
      this.playAgain.addEventListener('click', () => location.reload());
      return;
    }
  }

  winMessage(player) {
    const totalMoves = this.board.querySelectorAll(`.${player.id}`).length;
    const winner = this.winningMessage.querySelector('span.winner');
    const moveCount = this.winningMessage.querySelector('span.move_count');
    const moveList = this.winningMessage.querySelector('span.move_list');

    winner.innerHTML = this.currentPlayer.dataset.name;
    moveCount.innerHTML = totalMoves;
    moveList.innerHTML = this.winningMoves;
  }

  isADraw() {
    for (var y = 0; y <= this.height; y++) {
      for (var x = 0; x <= this.width; x++) {
        if (!this.matches[y][x] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  isHorizontalWin() {
    let current;
    let prev = 0;
    let tally = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        current = this.matches[y][x];
        if (current === prev && current !== 0) tally += 1;
        else tally = 0;

        if (tally === this.winCount - 1) return true;
        prev = current;
      }

      // Reset
      tally = 0;
      prev = 0;
    }
    return false;
  }

  isVerticalWin() {
    let current;
    let prev = 0;
    let tally = 0;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        current = this.matches[y][x];
        if (current === prev && current !== 0) tally += 1;
        else tally = 0;

        if (tally === this.winCount - 1) return true;
        prev = current;
      }
      // Reset
      tally = 0;
      prev = 0;
    }
    return false;
  }

  isDiagonalWin() {
    let posX = 0;
    let posY = 0;
    let current = 0;
    let prev = 0;
    let tally = 0;
    let height = this.height - 1;
    let width = this.width - 1;

    // Test for down-right diagonals across the top.
    for (let x = 0; x < width; x++) {
      posX = x;
      posY = 0;

      while (posX <= width && posY <= height) {
        current = this.matches[posY][posX];
        if (current === prev && current !== 0) tally += 1;
        else tally = 0;

        if (tally === this.winCount - 1) return true;
        prev = current;

        // Shift down-right one diagonal index.
        posX++;
        posY++;
      }
      // Reset
      tally = 0;
      prev = 0;
    }

    // Test for down-left diagonals across the top.
    for (let x = 0; x <= width; x++) {
      posX = x;
      posY = 0;

      while (0 <= posX && posY <= height) {
        current = this.matches[posY][posX];
        if (current === prev && current !== 0) tally += 1;
        else tally = 0;

        if (tally === this.winCount - 1) return true;
        prev = current;

        // Shift down-left one diagonal index.
        posX--;
        posY++;
      }
      // Reset
      tally = 0;
      prev = 0;
    }

    // Test for down-right diagonals down the left side.
    for (let y = 0; y < height; y++) {
      posX = 0;
      posY = y;

      while (posX <= width && posY <= height) {
        current = this.matches[posY][posX];
        if (current === prev && current !== 0) tally += 1;
        else tally = 0;

        if (tally === this.winCount - 1) return true;
        prev = current;

        // Shift down-right one diagonal index.
        posX++;
        posY++;
      }
      // Reset
      tally = 0;
      prev = 0;
    }

    // Test for down-left diagonals down the right side.
    for (let y = 0; y < height; y++) {
      posX = width;
      posY = y;

      while (0 <= posX && posY <= height) {
        current = this.matches[posY][posX];
        if (current === prev && current !== 0) tally += 1;
        else tally = 0;
        if (tally === this.winCount - 1) return true;
        prev = current;

        // Shift down-left one diagonal index.
        posX--;
        posY++;
      }
      // Reset
      tally = 0;
      prev = 0;
    }
    return false;
  }

  switchPlayer() {
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
      this.playerOne.dataset.playing = false;
    }
    else {
      this.currentPlayer = this.playerOne;
      this.playerTwo.dataset.playing = false;
    }
    this.currentPlayer.dataset.playing = true;
  }

  playerPiece(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(25, 25, 25, 0, 2 * Math.PI);
    ctx.fillStyle = canvas.style.color;
    ctx.fill();
  }
}
