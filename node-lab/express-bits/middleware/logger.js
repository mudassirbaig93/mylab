function log(req, res, next) {
  console.log("Logging ....");
  next(); // This call is must to pass request to next middleware function, otherwise we might end up hanging our req
}

module.exports = log;
