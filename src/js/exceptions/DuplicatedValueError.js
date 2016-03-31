var DuplicatedValueError = function DuplicatedValueError() {};

DuplicatedValueError.prototype = new Error();

module.exports = DuplicatedValueError;