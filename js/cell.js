function Cell(row, column, width) {
  this.row = row;
  this.column = column;
  this.width = width;
  this.setupWalls();
  this.visited = false;
}

Cell.prototype.getUnvisitedNeighbor = function(cells) {
  let top = cells[index(this.row - 1, this.column)];
  let right = cells[index(this.row, this.column + 1)];
  let bottom = cells[index(this.row + 1, this.column)];
  let left = cells[index(this.row, this.column - 1)];
  let neighbors = getUnvisitedNeighbors(top, right, bottom, left);
  return random(neighbors);
};

Cell.prototype.removeWalls = function(neighbor) {
  let verticalDiff = this.row - neighbor.row;
  let horizontalDiff = this.column - neighbor.column;
  if (verticalDiff === 1) { // Top neighbor
    this.walls[0].hide();
    neighbor.walls[2].hide();
  } else if (verticalDiff === -1) { // Bottom neighbor
    this.walls[2].hide();
    neighbor.walls[0].hide();
  } else if (horizontalDiff === 1) { // Left neighbor
    this.walls[3].hide();
    neighbor.walls[1].hide();
  } else if (horizontalDiff === -1) { // Right neighbor
    this.walls[1].hide();
    neighbor.walls[3].hide();
  }
};

Cell.prototype.highlight = function() {
  let x = this.column * this.width;
  let y = this.row * this.width;
  let w = this.width;
  noStroke();
  fill(0, 255, 0);
  rect(x, y, w, w);
}

Cell.prototype.draw = function() {
  stroke(255);
  this.walls.forEach(wall => wall.draw());
  if (this.visited) {
    noStroke();
    fill(175, 0, 175, 100);
    rect(this.column * this.width, this.row * this.width, this.width, this.width);
  }
}

Cell.prototype.setupWalls = function() {
  let x = this.column * this.width;
  let y = this.row * this.width;
  let w = this.width;
  this.walls = [
    new Wall(x, y, x + w, y), // Top
    new Wall(x + w, y, x + w, y + w), // Right
    new Wall(x + w, y + w, x, y + w), // Bottom
    new Wall(x, y + w, x, y), // Left
  ];
}

function getUnvisitedNeighbors() {
  let neighbors = [];
  for (let neighbor of arguments) {
    if (neighbor && !neighbor.visited) {
      neighbors.push(neighbor);
    }
  }
  return neighbors;
};
