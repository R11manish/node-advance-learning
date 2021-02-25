const fs = require("fs");

setTimeout(() => console.log("timer 1 finished"), 0);

setImmediate(() => console.log("immediate 1 finished"));

console.log("hello from the top level of code");

fs.readFile("test-file.txt", () => {
  console.log("i/o finished");
  console.log('--------------------------------------')
  setTimeout(() => console.log("timer 2 finished"), 0);
  setTimeout(() => console.log("timer 3 finished"), 3000);
  setImmediate(() => console.log("immediate 2 finished"));
  process.nextTick(()=>console.log('process.nextTickExecuted()'));
});
