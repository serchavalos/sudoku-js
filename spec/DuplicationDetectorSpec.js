var DuplicationDetector = require('../src/js/DuplicationDetector.js');
var PubSub = require('../src/js/vendor/PubSub.js');

describe('A DuplicationDetector', function() {

    var detector, completeBoardMock, incompleteBoardMock, uniqueValues;

    beforeEach(function() {
      document.write('<html><body><div class="overlay"></div></body></html>');
      detector = new DuplicationDetector('.overlay', PubSub);
      detector.init();

      uniqueValues = [1,2,3,4,5,6,7,8,9];
      completeBoardMock = {
        'getCurrentColumnValues': function() {return uniqueValues;},
        'getCurrentRowValues': function() {return uniqueValues;},
        'getCurrentMatrixValues': function() {return uniqueValues;}
      };
      incompleteBoardMock = {
        'getCurrentColumnValues': function() {return uniqueValues;},
        'getCurrentRowValues': function() {return [1,2,3,3,3,6,7,8,9];},
        'getCurrentMatrixValues': function() {return uniqueValues;}
      };
    });

    describe('#updateView', function() {
      it('should call "onBoardCompleted" when this event is fired', function () {
        // REVIEW: Tried to use PubSub for testing this but didn't work
        detector.onBoardCompleted('topic', incompleteBoardMock);
        detector.updateView();

        expect( document.querySelector('.overlay').classList.contains('visible') ).toBe(false);
      });

      it('should add "visible" class to the overlay element when the board is complete', function () {
        detector.onBoardCompleted('topic', completeBoardMock);
        detector.updateView();

        expect( document.querySelector('.overlay').classList.contains('visible') ).toBe(true);
      });
    });
});
