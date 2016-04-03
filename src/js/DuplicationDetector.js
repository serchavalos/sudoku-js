var DuplicationDetector = function DuplicationDetector() {
  this.values = {
    column: [],
    row: [],
    matrix: [],
  };
};

DuplicationDetector.prototype.updateFromBoard = function updateFromBoard(board) {
  this.values.column = board.getCurrentColumnValues();
  this.values.row = board.getCurrentRowValues();
  this.values.matrix = board.getCurrentMatrixValues();
};

DuplicationDetector.prototype.hasDuplicatedValues = function hasDuplicatedValues() {
  for (name in this.values) {
    if (this.values.hasOwnProperty(name)) {
      if (this.hasDuplicated(this.values[name])) {
        return true;
      }
    }
  }

  return false;
};

DuplicationDetector.prototype.hasDuplicated = function hasDuplicated(values) {
  var uniqueValues = [];

  values.forEach(function(item) {
    if (uniqueValues.indexOf(item) < 0 ) {
      uniqueValues.push(item);
    }
  });

  return !(uniqueValues.length === values.length);
};

module.exports = DuplicationDetector;