var IndexError = function IndexError(){};

IndexError.prototype = new Error();

module.exports = IndexError;