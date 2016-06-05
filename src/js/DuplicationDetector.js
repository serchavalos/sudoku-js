class DuplicationDetector {
  constructor (elemSelector, PubSub) {
    this.overlay = document.querySelector(elemSelector);
    this.isResolved = false;
    this.pubSub = PubSub;
    this.viewNeedsUpdate = false;
  }

  init() {
    this.pubSub.subscribe('on-board-completed', this.onBoardCompleted.bind(this));
  }

  onBoardCompleted(topic, board) {
    this.isResolved = !this._hasDuplicatedValues(board);

    this.viewNeedsUpdate = true;
  }

  updateView() {
    if (this.viewNeedsUpdate === false) {
      return;
    }

    this.overlay.classList.toggle('visible', this.isResolved);
    this.viewNeedsUpdate = false;
  }

  _hasDuplicatedValues(board) {
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
  }

  _hasDuplicated(values) {
    var uniqueValues = [];

    values.forEach(function(item) {
      if (uniqueValues.indexOf(item) < 0 ) {
        uniqueValues.push(item);
      }
    });

    return !(uniqueValues.length === values.length);
  }
}

module.exports = DuplicationDetector;
