var Keyboard = function Keyboard(idContainer) {
    this.containerElem = document.querySelector(idContainer);
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

        document.dispatchEvent(event);
    }).bind(this));
};

module.exports = Keyboard;
