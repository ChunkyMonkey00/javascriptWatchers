const { Watcher, cwv } = require('./watchers');

test('Watcher triggers callback on condition', () => {
  let triggered = false;
  let watcher = new Watcher({
    condition: val => val === 6,
    callback: () => { triggered = true; },
    variable: cwv(5)
  });
  
  watcher.variable.value = 6;  // Change value to 6, triggering callback
  expect(triggered).toBe(true); // Assert that callback was triggered
});
