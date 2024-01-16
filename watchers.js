// Setup

let watchers = [];

class Watcher {
  constructor(options) {
    this.condition = options.condition;
    this.callback = options.callback;
    this.variable = options.variable;
    this.watchersArray = options.watchersArray || watchers;
    this.removeSelf = options.removeSelf || null;
    this.callbackCount = 0;
    this.watchersArray.push(this);
  }

  checkCondition(value, variable) {
    if (this.variable && this.variable !== variable) {
      return;
    }
    if (Array.isArray(this.condition)) {
      for (let condition of this.condition) {
        if (condition(value)) {
          this.callback();
          this.callbackCount++;
          break;
        }
      }
    } else if (this.condition(value)) {
      this.callback();
      this.callbackCount++;
    }

    if (this.removeSelf !== null) {
      if (this.callbackCount === this.removeSelf) {
        this.remove();
      }
      if (this.callbackCount > this.removeSelf) {
        console.warn("Watcher removed late, expected: " + this.removeSelf + "; actual: " + this.callbackCount);
        this.remove();
      }
    }
  }

  remove() {
    const index = this.watchersArray.indexOf(this);
    if (index > -1) {
      this.watchersArray.splice(index, 1);
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
