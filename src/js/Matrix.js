var Matrix = function Matrix(cellsValues, selectedIndex) {
  this.cellsValues = cellsValues;
  this.selectedIndex = selectedIndex;
};

Matrix.prototype.getCurrentColumnValues = function getCurrentColumnValues() {
  var allValues = [];
  var columnIndex = this.selectedIndex % 9;
  while(columnIndex < 81) {
    allValues.push(this.cellsValues[columnIndex]);
    columnIndex += 9;
  }

  return allValues;
};

Matrix.prototype.getCurrentRowValues = function getCurrentRowValues() {
  var allValues = [];
  var row = Math.floor(this.selectedIndex / 9);
  var rowStart = row * 9;
  var rowEnd = rowStart + 9;

  for (var index = rowStart; index < rowEnd; index++) {
    allValues.push(this.cellsValues[index]);
  }
  return allValues;
};

Matrix.prototype.getCurrentMatrixValues = function getCurrentMatrixValues() {
  var allValues = [];
  var row = Math.floor(this.selectedIndex / 9);
  var column = this.selectedIndex % 9;

  var matrixStart = (parseInt(row / 3) * 3) * 9;
  var matrixEnd = matrixStart + (3 * 9);
  var columnShift = parseInt(column / 3) * 3;

  for (var rowIndex = matrixStart; rowIndex < matrixEnd; rowIndex += 9) {
    for (var index = rowIndex + columnShift, limit = index + 3; index < limit; index++) {
      allValues.push(this.cellsValues[index]);
    }
  }

  return allValues;
};

module.exports = Matrix;
