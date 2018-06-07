function Wall(startX, startY, endX, endY) {
  this.start = { x: startX, y: startY};
  this.end = { x: endX, y: endY};
  this.hidden = false;
}

Wall.prototype.draw = function() {
  if (!this.hidden) {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
};

Wall.prototype.hide = function() {
  this.hidden = true;
};
