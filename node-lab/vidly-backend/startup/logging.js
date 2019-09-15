const winston = require("winston");
module.exports = function() {
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  process.on("uncaughtException", ex => {
    console.log("GOT AN UNCAUGHT EXCEPTION", ex);
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", ex => {
    console.log("GOT AN UNHANDLED REJECTION");
    winston.error(ex.message, ex);
  });
};
