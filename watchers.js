// Setup

let watchers = [];

class Watcher {
  constructor(options) {
    this.condition = options.condition;
    this.callback = options.callback;
    this.variable = options.variable;
    this.watchersArray = options.watchersArray || watchers;
    this.watchersArray.push(this);
  }

  checkCondition(value, variable) {
    if (this.variable && this.variable !== variable) {
      return;
    }
    if (this.condition(value)) {
      this.callback();
    }
  }
}

function cwv(initialValue, watchersArray) {
  if (watchersArray == undefined) {
    watchersArray = watchers;
  }
  let value = initialValue;
  let proxy = new Proxy({}, {
    get: function (target, prop) {
      if (prop === 'value') {
        return value;
      }
    },
    set: function (target, prop, newVal) {
      if (prop === 'value') {
        value = newVal;
        watchersArray.forEach(watcher => watcher.checkCondition(newVal, proxy));
      }
      return true;
    }
  });
  return proxy;
}
