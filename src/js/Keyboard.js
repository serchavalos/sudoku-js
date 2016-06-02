var Keyboard = function Keyboard(idContainer) {
    this.containerElem = document.querySelector(idContainer);
};

Keyboard.prototype.init = function init(PubSub) {
    this.containerElem.addEventListener('click', (function (event) {
        event.preventDefault();

        var keyElem, event;
        if (!(keyElem = event.target).classList.contains('keyboard-key')) {
            return;
        }

        if (keyElem.dataset.keyValue === 'clear') {
            PubSub.publish('on-clear-key-pressed');
            return;
        }

        if (!isNaN(keyValue = parseInt(keyElem.dataset.keyValue))) {
            PubSub.publish('on-number-key-pressed', keyValue);
        }

    }).bind(this));
};

module.exports = Keyboard;
