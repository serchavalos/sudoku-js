var Keyboard = function Keyboard(idContainer) {
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

Keyboard.prototype.updateView = function updateView() {
  var index = this.selectedNumber - 1;

  Array.prototype.forEach.call(this.keyElems, function(keyElem) {
    keyElem.classList.remove('selected');
  });

  this.keyElems[index].classList.add('selected');
};

module.exports = Keyboard;