'use strict';

var will = require('willy').will;
var fnInjector = require('../app.js');

describe('injecting a function', function () {
  var targetFn;

  beforeEach(function () {
    targetFn = function () {};
  });

  it('should execute the injected fn', function () {
    var injectedCalled;
    targetFn = fnInjector(targetFn, function () {
      injectedCalled = true;
    });
    targetFn();

    will(injectedCalled).be(true);
  });

  it('should pass the target fn and other args to the injected fn', function () {
    var args;
    var originalTarget = targetFn;

    targetFn = fnInjector(targetFn, function () {
      args = Array.prototype.slice.apply(arguments);
    });

    targetFn(1776, 'Zaphod');

    will(args[0]).be(originalTarget);
    will(args.length).be(3);
    will(args).have([1776, 'Zaphod']);
  });

  it('should not screw with scope', function () {
    var scope;
    var target = function () {};
    target = fnInjector(target, function () {
      scope = this;
    });

    target.apply(Math);
    will(scope).be(Math);
  });
});
