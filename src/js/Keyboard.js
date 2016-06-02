var Keyboard = function(idContainer, PubSub) {
    this.containerElem = document.querySelector(idContainer);
    this.pubSub = PubSub;
};

Keyboard.prototype.init = function() {
    this.containerElem.addEventListener('click', (function (event) {
        event.preventDefault();

        var keyElem, event;
        if (!(keyElem = event.target).classList.contains('keyboard-key')) {
            return;
        }

        if (keyElem.dataset.keyValue === 'clear') {
            this.pubSub.publish('on-clear-key-pressed');
            return;
        }

        if (!isNaN(keyValue = parseInt(keyElem.dataset.keyValue))) {
            this.pubSub.publish('on-number-key-pressed', keyValue);
        }

    }).bind(this));
};

module.exports = Keyboard;
