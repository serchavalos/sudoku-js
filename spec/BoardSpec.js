var Cell = require('../src/js/Cell.js');
var Board = require('../src/js/Board.js');
var fs = require('fs');

describe('A board', function() {
	var board, containerElem;

	beforeEach(function() {
		containerElem = {
			'innerHTML': ''
		};
		var documentMock = {
			'querySelector': function(){
				return containerElem;
			}
		};

		board = new Board(
			documentMock,
			'#board-container',
			[

				null,null,null,null,null,null,null,null,null,
				 1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
				null,null,null,null,null,null,null,null,null,
				 1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
				 1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
				 1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
				null,null,null,null,null,null,null,null,null,
				 1  , 2  , 3  , 4  , 5  , 6  , 7  , 8  , 9  ,
				null,null,null,null,null,null,null,null,null,
			]
		);
	});

	describe('#render', function () {
		it('should return a view for board',  function() {
			// REVIEW: There should be a better way to test a view
			var expectedHtml = fs.readFileSync(__dirname + '/fixtures/board.html', 'utf-8');
			board.updateView();

			expect( containerElem.innerHTML ).toEqual(expectedHtml);
		});
	});

});
