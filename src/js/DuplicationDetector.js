var DuplicationDetector = function(elemSelector, PubSub) {
  this.overlay = document.querySelector(elemSelector);
  this.isResolved = false;
  this.pubSub = PubSub;
  this.viewNeedsUpdate = false;
};

DuplicationDetector.prototype.init = function() {
  this.pubSub.subscribe('on-board-completed', this.onBoardCompleted.bind(this));
};

DuplicationDetector.prototype.onBoardCompleted = function(topic, board) {
  this.isResolved = !this._hasDuplicatedValues(board);

  this.viewNeedsUpdate = true;
};

DuplicationDetector.prototype.updateView = function() {
  if (this.viewNeedsUpdate === false) {
    return;
  }

  this.overlay.classList.toggle('visible', this.isResolved);
  this.viewNeedsUpdate = false;
};

DuplicationDetector.prototype._hasDuplicatedValues = function(board) {
  var values = {
    column: board.getCurrentColumnValues(),
    row: board.getCurrentRowValues(),
    matrix: board.getCurrentMatrixValues(),
  };

  for (name in values) {
    if (values.hasOwnProperty(name)) {
      if (this._hasDuplicated(values[name])) {
        return true;
      }
    }
  }

  return false;
};

DuplicationDetector.prototype._hasDuplicated = function(values) {
  var uniqueValues = [];

  values.forEach(function(item) {
    if (uniqueValues.indexOf(item) < 0 ) {
      uniqueValues.push(item);
    }
  });

  return !(uniqueValues.length === values.length);
};

module.exports = DuplicationDetector;
