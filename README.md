# Variable Watcher Library

## Overview

This JavaScript library allows users to create "watchers" that observe a variable, triggering specified actions when certain conditions are met. Whether you want to monitor changes in a variable's value or apply custom logic, this library empowers you to efficiently manage and respond to dynamic data.

## Features

- **Dynamic Watchers**: Create dynamic watchers with customizable conditions and callbacks.
- **Multiple Conditions**: Each watcher can have multiple conditions. When any of these conditions are met, the corresponding callback is triggered.
- **Proxy-based Variable (`cwv`)**: Utilize a proxy-based variable that automatically triggers associated watchers when its value changes.

## Practical use

When a program has a variable being modified a lot of times from many different sources, its between manually checking the variable each time its modified, or creating an interval that constantly checks the variable. With watchers, you dont need to use resources to constantly check the variable, or even manually check it. All of that is handled for you, and since it only checks when the variable is updated, resources are used much less.

## Getting Started

### Setup

Include the code from watchers.js in your project and (optionally) set up an array to store watchers.

```javascript
// Setup
let watchers = [];
```

### `Watcher(options)`

Create a watcher with specific conditions and callbacks.

#### Parameters:

- `options`: An object containing the following properties:
 - `condition` (function or array of functions): A function or an array of functions defining the conditions for triggering the callback.
 - `callback` (function): A function to execute when all conditions are met.
 - `variable` (optional): The variable to watch. If not provided, the watcher will observe the default variable created by `cwv`.
 - `watchersArray` (optional): An array to store the created watchers. Defaults to a global array if not provided.
 - `removeSelf` (optional): (number) The amount of triggers the watcher should perform before removing itself. Defaults to none.

#### Example:

```javascript
// Single condition
let watcher1 = new Watcher({
 condition: val => val == 6,
 callback: () => console.log("Value is equal to 6"),
 variable: myVar,
});

// Multiple conditions
let watcher2 = new Watcher({
 condition: [val => val > 5, val => val < 10],
 callback: () => console.log("Value is between 5 and 10"),
 watchersArray: watchers,
});
```

In the first example, the watcher has a single condition. When the value of the watched variable equals 6, the callback function is executed.

In the second example, the watcher has multiple conditions. It uses an array of functions to define the conditions. The callback function is executed only when all conditions are met, i.e., when the value of the watched variable is greater than 5 and less than 10.

### `cwv(initialValue, watchersArray)`

Create a proxy-based variable (`cwv`) that automatically triggers associated watchers when its value changes.

#### Parameters:

- `initialValue`: The initial value of the variable.
- `watchersArray` (optional): An array to store watchers associated with the variable. Defaults to a global array if not provided.

#### Returns:

A proxy object representing the variable.

#### Example:

```javascript
let variable = cwv(0, watchers);
```

## Examples

Create watchers with different conditions and callbacks, then update variable values to trigger watchers.

```javascript
let variable1 = cwv("Initial Value", watchersArray)

let watcher1 = new Watcher({
 condition: val => [val == 6, val == 8],
 callback: () => console.log("Value is either 6 or 8"),
 variable: cwv(0, watchers),
});

let watcher2 = new Watcher({
 condition: val => [val == 10, val == 20],
 callback: () => console.log("Value is either 10 or 20"),
 watchersArray: watchers,
});

variable1.value = 6; // Logs: Value is either 6 or 8
variable1.value = 8; // Logs: Value is either 6 or 8
variable1.value = 10; // Logs: Value is either 10 or 20
variable1.value = 20; // Logs: Value is either 10 or 20
```

## License

This library is licensed under the [MIT License](LICENSE).

Feel free to contribute, report issues, or suggest improvements!
