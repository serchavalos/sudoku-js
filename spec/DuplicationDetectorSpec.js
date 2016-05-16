var DuplicationDetector = require('../src/js/DuplicationDetector.js');

describe('A DuplicationDetector', function() {
    var duplicationDetector, completeBoardMock, incompleteBoardMock, uniqueValues;

    beforeEach(function() {
        duplicationDetector = new DuplicationDetector();
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

    describe('#hasDuplicated', function() {
        it('should return true when one value of a given array is a duplicate of another one', function() {
            expect( duplicationDetector.hasDuplicated([1,2,3,4,4]) ).toBe(true);
        });

        it('should return false when all given values of an array are unique', function() {
            expect( duplicationDetector.hasDuplicated([1,2,3,4,5]) ).toBe(false);
        });
    });

    describe('#hasDuplicatedValues', function() {
        it('should return true when a given board has duplicated values', function (){
            expect( duplicationDetector.hasDuplicatedValues(incompleteBoardMock) ).toBe(true);
        });

        it('should return false when a given board has unique values', function (){
            expect( duplicationDetector.hasDuplicatedValues(completeBoardMock) ).toBe(false);
        });
    });
});
