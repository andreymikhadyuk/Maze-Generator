let length = 25;
let rows;
let columns;

let currentCell;
let cells = [];
let stack = [];

setup = () => {
  createCanvas(500, 500);
  rows = height / length;
  columns = width / length;
  cells = generateCells();
  currentCell = cells[Math.floor(rows / 3) * rows];
  currentCell.visited = true;
  background(0);
}

draw = () => {
  frameRate(10);
  if (haveUnvisited()) {
    let unvisitedNeighbor = currentCell.getUnvisitedNeighbor(cells);
    if (unvisitedNeighbor) {
      stack.push(currentCell);
      currentCell.removeWalls(unvisitedNeighbor);
      currentCell = unvisitedNeighbor;
      currentCell.visited = true;
      currentCell.highlight();
    } else if (stack.length > 0) {
      currentCell = stack.pop();
      currentCell.highlight();
    }
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].draw();
  }
}
haveUnvisited = () => Boolean(cells.find(cell => !cell.visited));

generateCells = () => {
  let result = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      result.push(new Cell(i, j, length));
    }
  }
  return result;
};

index = (i, j) =>
  (i < 0 || j < 0 || i >= rows || j >= columns) ? -1 : i * rows + j;
