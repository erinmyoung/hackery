class ConnectFour {
  constructor() {
    // Elements
    this.table = document.querySelector('.connect_four');
    this.buttons = this.table.querySelectorAll('button');
    this.board = this.table.querySelector('.board');
    this.rows = this.board.querySelectorAll('tr[data-index]');

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
    const matches = [];
    const pieces = this.board.querySelectorAll(`.${player.id}`);
    for (let i = 0; i < pieces.length; i++) {
      const column = pieces[i].closest('td').dataset.column;
      const row = pieces[i].closest('tr').dataset.index;
      matches.push({key: column, value: row});

      while (pieces[i].dataset.moveCount >= 4) {
        this.checkWin(pieces[i]);
        break;
      }
    }
  }

  checkWin(piece) {
    
  }

  getNextItem(column) {
    const currentIndex = this.columns.indexOf(column);
    const nextIndex = (currentIndex + 1) % this.columns.length;
    return this.columns[nextIndex];
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
