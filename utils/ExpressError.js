class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;

// This does nothing — you're just accessing a property, not assigning anything.
// module.exports.ExpressError = ExpressError;          =>const { ExpressError } = require("../utils/ExpressError.js");
// module.exports = { ExpressError };                   =>const { ExpressError } = require("../utils/ExpressError.js");

// ⚠️ Common Mistake (YOU DID THIS 😄)=>

// module.exports.ExpressError; // ❌ useless
