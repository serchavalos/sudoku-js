var Keyboard = function Keyboard(document, idContainer) {
    this.document = document;
    this.containerElem = this.document.querySelector(idContainer);
    this.selectedNumber = null;
    this.keyElems = this.document.querySelectorAll(idContainer + ' .keyboard-key');
};

Keyboard.prototype.init = function init() {
    this.containerElem.addEventListener('click', (function (event) {
        event.preventDefault();

        var keyElem, event;
        if (!(keyElem = event.target).classList.contains('keyboard-key')) {
            return;
        }

        if (keyElem.dataset.keyValue === 'clear') {
            event = new Event('on-clear-pressed');
        } else {
            event = new Event('on-number-pressed');
            keyValue = parseInt(keyElem.dataset.keyValue);
            // REVIEW: Add a proper pub/sub library here
            event.attr = {
                'pressedNumber': keyValue
            };
        }

        this.document.dispatchEvent(event);
    }).bind(this));
};

module.exports = Keyboard;
