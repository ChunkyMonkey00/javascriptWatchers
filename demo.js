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

//Update v0.0.2 (remove and multiple conditions) demos
let var1 = cwv(0);
let var2 = cwv(0);

let watcher5 = new Watcher({
  condition: val => val > 69,
  callback: () => console.log('Value is greater than 69'),
  variable: var1
});

var1.value = 70; // Logs: Value is greater than 5

watcher5.remove();

var1.value = 71; // Nothing happens


let watcher6 = new Watcher({
  condition: val => [val > 10, val < -10, val == 0.32],
  callback: () => {
    console.log("One condition was met.");
  },
  variable: var2
});

/* REMOVE SELF UPDATE */

//Create a watched value by assigning it to the function
//No need to give it an initial value btw
var myVar = cwv();

//Assign value by using .value method
myVar.value = "Hi!";

//Create a watcher
new Watcher({
  condition: val => val == "Bye!",
  callback: () => console.log("They left :("),
});

//Will trigger the watcher above
myVar.value = "Bye!";

//If you intend on removing the watcher (always a good practice)
//Use a variable and assign the new watcher
let newWatcher = new Watcher({
  condition: val => val == "Hello!",
  callback: () => console.log("They're back :)"),
});

myVar.value = "Hello!";

//Removes the newWatcher
newWatcher.remove();

//Or you can specify how many calls it takes to remove itself
let newWatcher2 = new Watcher({
  condition: val => val == "Helloo!",
  callback: () => console.log("They're pretty happy :)"),
  removeSelf: 2,
});

//Removes the watcher BUT throws a warn (because watcher count)
//starts at 0 and it should have removed itself at -1/
let newWatcher3 = new Watcher({
  condition: val => val == "Yippee!",
  callback: () => console.log("They're REALLY happy :)"),
  removeSelf: -1,
});

//Does not remove, since it cant parse as a number
let newWatcher4 = new Watcher({
  condition: val => val == "Wooh!",
  callback: () => console.log("They're INSANELY happy :)"),
  removeSelf: "ehe",
});

//Logs
myVar.value = "Helloo!";
//Does not log
myVar.value = "Hello!";
//Logs
myVar.value = "Yippee!";
//Does not log
myVar.value = "Yippee!";
//Logs
myVar.value = "Wooh!";
//Logs
myVar.value = "Wooh!";

var2.value = 11; // Triggers condition
var2.value = -11; // Triggers condition
var2.value = 0.32; // Triggers condition
