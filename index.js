/**
 * decorate
 * @param {...Object | Array} decorators
 * @param {Object} target
 */
module.exports = function decorate() {

  var decorators = Array.prototype.slice.apply(arguments);
  var target = decorators.pop();

  // for easy multiline declaration in CoffeeScript
  if (decorators[0] instanceof Array) {
    decorators = decorators[0];
  }

  if (typeof decorators[0] === 'string') {
    return methodTarget(decorators, target);
  } else {
    return classTarget(decorators, target);
  }

};

function methodTarget(decorators, target) {
  var name = decorators.shift();
  var prototype = decorators.shift().prototype;
  var descriptor = {
    value: target,
    writable: true,
    enumerable: true,
    configurable: true
  };
  for (var i = 0, len = decorators.length; i < len; i++) {
    decorator = decorators[i];
    var newDescriptor = decorator(prototype, name, descriptor);
    if (newDescriptor != null) {
      descriptor = newDescriptor;
    }
  }
  Object.defineProperty(prototype, name, descriptor);
  return prototype[name];
}

function classTarget(decorators, target) {
  for (var i = 0, len = decorators.length; i < len; i++) {
    decorator = decorators[i];
    var newTarget = decorator(target);
    if (newTarget != null) {
       target = newTarget;
    }
  }
  return target;
}
