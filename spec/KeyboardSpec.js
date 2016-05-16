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

    describe('#onClick', function() {
        it('should add an event listener to the container element', function() {
            var callback = function(){};
            keyboard.onClick(callback);

            expect( keyboard.containerElem.eventListener ).toEqual(callback);
        });
    });

    describe('#selectNumber', function() {
        it('should give a value to "selectedNumber" property', function() {
            var keyElem = {
                'dataset': {'keyValue': 4}
            };
            keyboard.selectNumber(keyElem);

            expect( keyboard.selectedNumber ).toEqual(4);
        });
    });

    describe('#getSelectedNumber', function() {
        it('should return a value', function() {
            expect( keyboard.getSelectedNumber() ).toBe(null); // nothing selected yet

            var keyElem = {
                'dataset': {'keyValue': 6}
            };
            keyboard.selectNumber(keyElem);

            expect( keyboard.getSelectedNumber() ).toEqual(6);
        });
    });
});
