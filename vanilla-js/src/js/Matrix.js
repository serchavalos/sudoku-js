class Matrix {
  constructor(cellsValues, selectedIndex) {
    this.cellsValues = cellsValues;
    this.selectedIndex = selectedIndex;
  }

  getCurrentColumnValues() {
    let allValues = [];
    let columnIndex = this.selectedIndex % 9;
    while(columnIndex < 81) {
      allValues.push(this.cellsValues[columnIndex]);
      columnIndex += 9;
    }

    return allValues;
  }

  getCurrentRowValues() {
    let allValues = [];
    let row = Math.floor(this.selectedIndex / 9);
    let rowStart = row * 9;
    let rowEnd = rowStart + 9;

    for (let index = rowStart; index < rowEnd; index++) {
      allValues.push(this.cellsValues[index]);
    }
    return allValues;
  }

  getCurrentMatrixValues() {
    let allValues = [];
    let row = Math.floor(this.selectedIndex / 9);
    let column = this.selectedIndex % 9;

    let matrixStart = (parseInt(row / 3) * 3) * 9;
    let matrixEnd = matrixStart + (3 * 9);
    let columnShift = parseInt(column / 3) * 3;

    for (let rowIndex = matrixStart; rowIndex < matrixEnd; rowIndex += 9) {
      for (let index = rowIndex + columnShift, limit = index + 3; index < limit; index++) {
        allValues.push(this.cellsValues[index]);
      }
    }

    return allValues;
  }
}

module.exports = Matrix;
