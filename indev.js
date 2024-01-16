/*
Welcome to the indev js file. Here you will find what i am currently doing, and how far i am in making the next feature
*/
//#region idea1
// Setup

let watchers = [];

class Watcher {
  constructor(options) {
    this.condition = options.condition;
    this.callback = options.callback;
    this.variable = options.variable;
    this.watchersArray = options.watchersArray || watchers;
    this.removeSelf = Number(options.removeSelf) || null;
    this.alias = String(options.alias) || undefined;
    this.tor = options.tor || false;
    this.triggerOnReassign = typeof options.triggerOnReassign === 'boolean' ? options.triggerOnReassign : false; // Ensure triggerOnReassign is a boolean
    /* to be used by the program NOT YOU */
    this.callbackCount = 0;
    this.watchersArray.push(this);
  }

  checkCondition(value, variable) {
    if (this.variable && this.variable !== variable) {
      return;
    }

    if (this.triggerOnReassign || value !== this.lastValue) {
      if (Array.isArray(this.condition)) {
        for (let condition of this.condition) {
          if (condition(value)) {
            this.callback();
            this.callbackCount++;
            break;
          }
        }
      } else if (typeof (value) == "object") {
        for (const [key, kvalue] of Object.entries(value)) {
          if (this.condition(kvalue)) {
            this.callback();
            this.callbackCount++;
          }
        }
      } else if (this.condition(value)) {
        this.callback();
        this.callbackCount++;
      }
    }

    this.lastValue = value;

    if (this.removeSelf !== null && !isNaN(this.removeSelf)) {
      if (this.callbackCount === this.removeSelf) {
        this.remove();
      }
      if (this.callbackCount > this.removeSelf) {
        console.warn("Watcher removed late; Alias: " + this.alias + ";" + " expected: " + this.removeSelf + "; actual: " + this.callbackCount);
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
        if(typeof(prop) == "object") {
          for (const [key, value] of Object.entries(object1)) {
            for (var i=0;i<watchersArray.length;i++) {
              //well, isnt this just checking if the value of the key 
              // is the same? thats not good. We need to get the right
              //var not just the right value.
              if(watchersArray.variable == key) {
                return key;
              }
            }
            console.log(`${key}: ${value}`);
          }
        }
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

// Create a watched value by assigning it to the function
var myVar = cwv();

// Throws error, and since we defined an alias we can know which one it is
let watcher1 = new Watcher({
  condition: val => val == 6,
  callback: () => console.log("Value is equal to 6"),
  alias: "watcher number 1",
  triggerOnReassign: false // Set to true if you want to trigger on reassign
});

myVar.value = 6; // This will trigger
myVar.value = 6; // This will not trigger
myVar.value = 7; // Change the variable (wont trigger)
myVar.value = 6; // This will trigger

var subHolder = cwv();

subHolder.value = {
  key1: "no woah.",
}

let subScanner = new Watcher({
  condition: val => val == "Woah!",
  callback: () => console.log(""),
  variable: subHolder,
});

subHolder.value = {
  key1: "Woah!",
}
//#endregion

//#region idea2
// Setup

let watchers = [];

class Watcher {
  constructor(options) {
    this.condition = options.condition;
    this.callback = options.callback;
    this.variable = options.variable;
    this.watchersArray = options.watchersArray || watchers;
    this.removeSelf = Number(options.removeSelf) || null;
    this.alias = String(options.alias) || undefined;
    this.tor = options.tor || false;
    this.triggerOnReassign = typeof options.triggerOnReassign === 'boolean' ? options.triggerOnReassign : false; // Ensure triggerOnReassign is a boolean
    /* to be used by the program NOT YOU */
    this.callbackCount = 0;
    this.watchersArray.push(this);
  }

  checkCondition(value, variable) {
    if (this.variable && this.variable !== variable) {
      return;
    }

    if (this.triggerOnReassign || value !== this.lastValue) {
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
    }

    this.lastValue = value;

    if (this.removeSelf !== null && !isNaN(this.removeSelf)) {
      if (this.callbackCount === this.removeSelf) {
        this.remove();
      }
      if (this.callbackCount > this.removeSelf) {
        console.warn("Watcher removed late; Alias: " + this.alias + ";" + " expected: " + this.removeSelf + "; actual: " + this.callbackCount);
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
      } else if (!Reflect.has(target, prop)) {
        target[prop] = cwv(undefined, watchersArray);
      }
      return Reflect.get(target, prop);
    },
    set: function (target, prop, newVal) {
      if (prop === 'value') {
        value = newVal;
        watchersArray.forEach(watcher => watcher.checkCondition(newVal, proxy));
      } else {
        if (typeof newVal === 'object' && newVal !== null) {
          newVal = cwv(newVal, watchersArray);
        }
        Reflect.set(target, prop, newVal);
      }
      return true;
    }
  });
  return proxy;
}

var myVar = cwv();
myVar.value = {};

let myWatcher = new Watcher({
  condition: val => val == "Hi!",
  callback: () => console.log("Hi back!"),
  variable: myVar.value,
});

myVar.value.key1 = "Hi!"
//#endregion
