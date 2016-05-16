var Keyboard = require('../src/js/Keyboard.js');

describe('Board', function() {
    var keyboard, documentMock = {
        'querySelector': function() {
            return {
                'eventListener': null,
                'addEventListener': function(event, callback) {
                    this.eventListener = callback;
                }
            };
        },

        'querySelectorAll': function() {
            return [];
        }
    };

    beforeEach(function() {
        keyboard = new Keyboard(documentMock, 'id-container');
    });

    describe('#init', function() {
        it('should add an event listener to the container element', function() {
            var callback = function(){};
            keyboard.init();

            expect( typeof keyboard.containerElem.eventListener ).toEqual('function');
        });
    });
});
