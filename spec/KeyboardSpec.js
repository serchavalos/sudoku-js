var Keyboard = require('../src/js/Keyboard.js');
var PubSub = require('../src/js/PubSub.js');

describe('Keyboard', function() {
    beforeEach(function() {
        document.write(
          '<html><body>'
            + '<div id="keyboard-container">'
              + '<li class="keyboard-key" data-key-value="9">9</li>'
              + '<li class="keyboard-key clear-key" data-key-value="clear">C</li>'
            + '</div>'
          + '</body></html>'
        );
    });

    describe('#init', function() {
        it('should add an event listener to the container element', function() {
            spyOn(PubSub, 'publish');

            var keyNine = document.querySelector('#keyboard-container li[data-key-value="9"]');
            var keyClear = document.querySelector('#keyboard-container li[data-key-value="clear"]');
            var keyboard = new Keyboard('#keyboard-container');

            keyboard.init(PubSub);

            keyNine.click();
            expect( PubSub.publish ).toHaveBeenCalledWith('on-number-key-pressed', 9);

            keyClear.click();
            expect( PubSub.publish ).toHaveBeenCalledWith('on-clear-key-pressed');

        });
    });
});
