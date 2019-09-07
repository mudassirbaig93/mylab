const utils = require("./utils");

utils.sayHello("Mudassir");

const fs = require("fs");
fs.readdir("./", (err, files) => {
  if (err) console.log(`Error ${err}`);
  else console.log(files);
});

console.log("Outside func");

// === Event module =====
var events = require("events").EventEmitter;

var e = new events();

e.emit("start"); //This won't trigger the console.log

//Need to be binded before you emit the event.
e.on("start", arg => {
  console.log("event start just fired!!!!!!!!!!", arg);
});

e.emit("start", { test_arg: "test_arg_val" }); //This will trigger the console.log

// ============ Event Module in real world ======
const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", arg => {
  console.log("event messageLogged just fired!!!!!!!!!!", arg);
});

// ========== http module  (Express is built on this module) ==========
const http = require("http");
const server = http.createServer((req, res) => {
  console.log("Got req");
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});
server.listen(3000);
console.log("Listening on port 3000...");
