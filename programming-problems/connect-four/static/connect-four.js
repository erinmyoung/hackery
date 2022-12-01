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

    // Canvas
    this.canvasOne = document.getElementById('game_canvas_one');
    this.canvasTwo = document.getElementById('game_canvas_two');
    this.emptyCanvas = document.querySelectorAll('.empty_canvas');

    this.run();
  }

  run() {
    this.setComputerColor();
    this.playerPiece(this.canvasOne);
    this.playerPiece(this.canvasTwo);
    this.currentPlayer(this.playerOne);
    this.emptyCanvas.forEach((canvas) => this.playerPiece(canvas));
    this.buttons.forEach((button) => {
      button.addEventListener('click', this.movePiece.bind(this));
    });
  }

  setComputerColor() {
    const playerOne = document.querySelector('.player_details[data-color]');
    if (playerOne.dataset.color === '#cc0000') {
      this.canvasTwo.style.color = '#ffc34d';
      document.querySelector('.computer_color').innerHTML = 'Color: #ffc34d';
    } else {
      this.canvasTwo.style.color = '#cc0000';
      document.querySelector('.computer_color').innerHTML = 'Color: #cc0000';
    }
  }

  movePiece(e) {
    e.preventDefault();
    const column = e.target.dataset.column;
    this.insertPiece(column);
  }

  insertPiece(column) {
    const reversed = [...this.rows].reverse();
    for (let i = 0; i < reversed.length; i++) {
      const el = reversed[i].querySelector(`td[data-column=${column}]`);
      const canvas = el.querySelector('canvas');
      const cloned = this.canvasOne.cloneNode();
      cloned.id += 1
      this.playerPiece(cloned);
      console.log(cloned);
      if (canvas.classList.contains('empty_canvas')) {
        el.replaceChild(cloned, canvas);
        break;
      }
    }
  }

  currentPlayer(player) {
    const message = document.createElement('span');
    const child = player.querySelector('.name');
    message.innerHTML = 'Current player';
    message.style.color = 'green';
    player.insertBefore(message, child);
  }

  playerPiece(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(25, 25, 25, 0, 2 * Math.PI);
    ctx.fillStyle = canvas.style.color;
    ctx.fill();
  }
}
