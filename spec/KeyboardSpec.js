var Keyboard = require('../src/js/Keyboard.js');

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
            spyOn(document, 'dispatchEvent');

            var keyNine = document.querySelector('#keyboard-container li[data-key-value="9"]');
            var keyClear = document.querySelector('#keyboard-container li[data-key-value="clear"]');
            var keyboard = new Keyboard('#keyboard-container');

            keyboard.init();

            keyNine.click();
            var expectedEvent = new Event('on-number-pressed');
            expectedEvent.attr = {'pressedNumber': 9};
            expect( document.dispatchEvent ).toHaveBeenCalledWith(expectedEvent);

            keyClear.click();
            var expectedEvent = new Event('on-clear-pressed');
            expect( document.dispatchEvent ).toHaveBeenCalledWith(expectedEvent);

        });
    });
});
