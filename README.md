# Variable Watcher Library

## Overview

This JavaScript library allows users to create "watchers" that observe a variable, triggering specified actions when certain conditions are met. Whether you want to monitor changes in a variable's value or apply custom logic, this library empowers you to efficiently manage and respond to dynamic data.

## Features

- **Dynamic Watchers**: Create dynamic watchers with customizable conditions and callbacks.
- **Proxy-based Variable (`cwv`)**: Utilize a proxy-based variable that automatically triggers associated watchers when its value changes.

## Getting Started

### Setup

Include the library in your project and set up an array to store watchers.

```javascript
// Setup
let watchers = [];
```

### `Watcher(options)`

Create a watcher with specific conditions and callbacks.

#### Parameters:

- `options`: An object containing the following properties:
  - `condition` (function): A function defining the condition for triggering the callback.
  - `callback` (function): A function to execute when the condition is met.
  - `variable` (optional): The variable to watch. If not provided, the watcher will observe the default variable created by `cwv`.
  - `watchersArray` (optional): An array to store the created watchers. Defaults to a global array if not provided.

#### Example:

```javascript
let watcher = new Watcher({
  condition: val => val == 6,
  callback: () => console.log("Value is equal to 6"),
  variable: cwv(0, watchers),
});
```

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

### `checkCondition(value, variable)`

Check the condition of a watcher.

#### Parameters:

- `value`: The current value of the variable.
- `variable`: The variable being watched.

#### Example:

```javascript
watcher.checkCondition(newVal, proxy);
```

## Examples

Create watchers with different conditions and callbacks, then update variable values to trigger watchers.

```javascript
let watcher1 = new Watcher({
  condition: val => val == 6,
  callback: () => console.log("Value is equal to 6"),
  variable: cwv(0, watchers),
});

let watcher2 = new Watcher({
  condition: val => val == 8,
  callback: () => console.log("Value is equal to 8"),
  watchersArray: watchers,
});

watcher1.variable.value = 6; // Logs: Value is equal to 6
watcher2.variable.value = 8; // Logs: Value is equal to 8
```

## License

This library is licensed under the [MIT License](LICENSE).

Feel free to contribute, report issues, or suggest improvements!
