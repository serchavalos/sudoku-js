class Cell {
  constructor (index = 0, value) {
    this.index = index;
    this.editable = true;
    this.selected = false;
    this.element = document.createElement('DIV');

    try {
      this.setValue(value);
      this.editable = false;
    } catch (err) {
      // Ignore it.
      this.value = null;
    }

    this._updateView();
  }

  setValue (value) {
    if (this.editable === false) {
      throw new Error('This is a permanent cell');
    }

    if (typeof value != 'number') {
      throw new Error('Invalid value given. Enter a number');
    }

    if (value < 1 || value > 9) {
      throw new Error('Invalid value given. Enter a number between 1 and 9');
    }

    this.value = value;
    this._updateView();
  }

  clear (value) {
    this.value = null;
  };

  getValue () {
    return this.value;
  };

  isEmpty () {
    return (this.value === null);
  }

  setSelectAttr (select) {
    this.selected = !!(select);
    this._updateView();
  }

  getElement () {
    return this.element;
  }

  _updateView () {
    let row = parseInt(parseInt(this.index / 9) / 3);
    let column = parseInt((this.index % 9) / 3);
    let matrixIndex = column + row * 3;
    let cssClasses =  ['sudoku-cell'];

    if ((matrixIndex % 2) == 0) cssClasses.push('m-odd');
    if (!this.editable) cssClasses.push('fixed');
    if (this.selected) cssClasses.push('selected');
    if (this.value) cssClasses.push('value-' + this.value);

    this.element.className = cssClasses.join(' ');
    this.element.dataset.index = this.index;
    this.element.innerHTML = this.value !== null ?  this.value : '&nbsp;';
  }
}

module.exports = Cell;
