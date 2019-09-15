const config = require("config");
module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    throw new Error(
      "FATAL error, jwtPrivateKey env var is not defined... run export vidly_jwtPrivateKey=value"
    ); // uncaught exception handler in logging module will pick this
  }
};
