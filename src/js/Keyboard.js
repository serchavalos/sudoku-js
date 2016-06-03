class Keyboard {
  constructor(idContainer, PubSub) {
    this.containerElem = document.querySelector(idContainer);
    this.pubSub = PubSub;
  }

  init() {
    this.containerElem.addEventListener('click', event => {
      event.preventDefault();

      var keyElem, keyValue;
      if (!(keyElem = event.target).classList.contains('keyboard-key')) {
        return;
      }

      if ((keyValue = keyElem.dataset.keyValue) === 'clear') {
        this.pubSub.publish('on-clear-key-pressed');
        return;
      }

      if (!isNaN(keyValue = parseInt(keyValue))) {
        this.pubSub.publish('on-number-key-pressed', keyValue);
      }
    })
  }
};

module.exports = Keyboard;
