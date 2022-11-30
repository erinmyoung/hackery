class ConnectFour {
  constructor() {
    // Elements
    this.table = document.querySelector('.connect_four');
    this.buttons = this.table.querySelectorAll('button');
    this.board = this.table.querySelector('.board');
    this.rows = this.board.querySelectorAll('tr[data-index]');

    // Canvas
    this.canvasOne = document.getElementById('game_canvas_one');
    this.canvasTwo = document.getElementById('game_canvas_two');
    this.emptyCanvas = document.querySelectorAll('.empty_canvas');

    this.run();
  }

  run() {
    this.playerPiece(this.canvasOne);
    this.emptyCanvas.forEach((canvas) => this.playerPiece(canvas));
    this.buttons.forEach((button) => {
      button.addEventListener('click', this.movePiece.bind(this));
    });
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

  playerPiece(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(25, 25, 25, 0, 2 * Math.PI);
    ctx.fillStyle = canvas.style.color;
    ctx.fill();
  }  
}
