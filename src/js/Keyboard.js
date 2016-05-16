var Keyboard = function Keyboard(document, idContainer) {
  this.containerElem = document.querySelector(idContainer);
  this.selectedNumber = null;
  this.keyElems = document.querySelectorAll(idContainer + ' .keyboard-key');
};

Keyboard.prototype.onClick = function onClick(callback) {
 this.containerElem.addEventListener('click', callback);
};

Keyboard.prototype.selectNumber = function(keyElem) {
  var keyValue = parseInt(keyElem.dataset.keyValue);
  if (isNaN(keyValue) || keyValue === 0) {
    return; // Invalid number received
  }

  this.selectedNumber = keyValue;
};

Keyboard.prototype.getSelectedNumber = function getSelectedNumber() {
  return this.selectedNumber;
};

module.exports = Keyboard;
