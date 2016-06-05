class Cell {
  constructor (index = 0, value) {
    this.value = null;
    this.index = index;
    this.editable = true;
    this.selected = false;
    this.element = document.createElement('DIV');

    try {
      this.setValue(value);
      this.editable = false;
    } catch (err) {
      // Ignore it.
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

    if (this.value === null) {
      this.value = value;
    } else if (typeof this.value === 'object') {
      if (value in this.value) {
        delete(this.value[value]);
        if (Object.keys(this.value).length === 1) {
          this.value = parseInt(Object.keys(this.value).pop());
        }
      } else {
        this.value[value] = value;
      }
    } else {
      let valueObj = {}
      valueObj[value] = value;
      valueObj[this.value] = this.value;
      this.value = valueObj;
    }

    this._updateView();
  }

  clear (value) {
    this.value = null;
  };

  getValue () {
    return typeof this.value == 'number' ? this.value : null;
  };

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
    if (typeof this.value == 'number') cssClasses.push('value-' + this.value);
    if (this.value && typeof this.value == 'object') cssClasses.push('multiple');

    this.element.className = cssClasses.join(' ');
    this.element.dataset.index = this.index;

    if (this.value === null) {
      this.element.innerHTML = `<span>&nbsp;</span>`;
    } else if (typeof this.value === 'object') {

      let html = '';
      for (let i = 1; i < 10; i++) {
        let value = this.value[i] || '&nbsp;';
        html += `<span>${value}</span>`;
      }
      this.element.innerHTML = html;
    } else if (this.value !== null) {
      this.element.innerHTML = `<span>${this.value}</span>`;
    }
  }
}

module.exports = Cell;
