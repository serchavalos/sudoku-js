var DuplicationDetector = function DuplicationDetector() {};

DuplicationDetector.prototype.hasDuplicatedValues = function hasDuplicatedValues(board) {
  var values = {
    column: board.getCurrentColumnValues(),
    row: board.getCurrentRowValues(),
    matrix: board.getCurrentMatrixValues(),
  };

  for (name in values) {
    if (values.hasOwnProperty(name)) {
      if (this.hasDuplicated(values[name])) {
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