// Testing/demo portion

let normVar = cwv(0);
let obj = cwv(0);
let dictVar = cwv({ value: 0 });

let watcher1 = new Watcher({
  condition: val => val == 6,
  callback: () => console.log("Value is equal to 6"),
  variable: normVar,
  watchersArray: watchers
});

let watcher2 = new Watcher({
  condition: val => val == 8,
  callback: () => console.log("Value is equal to 8"),
  watchersArray: watchers,
  variable: normVar
});

let watcher3 = new Watcher({
  condition: val => val == 7,
  callback: () => console.log("Value is equal to 7")
});

let watcher4 = new Watcher({
  condition: val => val > 10,
  callback: () => {
    console.log("Value is greater than 10");
    console.log("This also runs");
  },
  variable: obj
});

obj.value = 4; // Does not log since it's not associated with normVar
obj.value = 5; // Does not log
obj.value = 6; // Does not log
obj.value = 7; // Logs: Value is equal to 7
obj.value = 8; // Does not log
normVar.value = 5; // Does not log
normVar.value = 6; // Logs: Value is equal to 6
normVar.value = 7; // Logs: Value is equal to 7
normVar.value = 8; // Logs: Value is equal to 8
obj.value = 11; // Logs: Value is greater than 10, This also runs
