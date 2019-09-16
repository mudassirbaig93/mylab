//import Raven from "raven-js";

// Using raven lib to log messages on sentry, will have to create account on sentry first
function init() {
  // Instantiate Raven
  // Raven.config("API_KEY", {meta_data obj}).install();
}

function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log
};
