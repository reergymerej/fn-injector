'use strict';

module.exports = function (target, fn) {
  return function () {
    var args = Array.prototype.slice.apply(arguments);
    args.unshift(target);
    fn.apply(this, args);
  };
};
