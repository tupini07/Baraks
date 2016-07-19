class Board {
  constructor(level, root) {
    this.squares = [];
    this.root = root;
    for (let irow in level) {
      let row = level[irow];
      for (let isqr in row) {
        let isBlueSquare = row[isqr];

        let positionX = isqr + 10;
        let positionY = irow + 10;

        this.squares.push(
          new Square(this.root, isBlueSquare, positionX, positionY)
        );
      }
    }

    function onMouseDown(event) {
      let mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      let possibleClicks = this.squares.filter((element) => {
        return mouse.x < element.position.x///blabla
      });
      console.log(this.squares);
    }
    window.addEventListener('mousedown', onMouseDown, false);
  }
}
