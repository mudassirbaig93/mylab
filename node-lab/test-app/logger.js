const EventEmitter = require("events");
class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", { test_arg: "test_arg_val" });
  }
}

module.exports = Logger;
