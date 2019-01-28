const logger = require('../logs/winston')

let validation = function (req) {

  const {
    destination,
    body,

  } = req.body;

  if (typeof destination !== "string" || typeof body !== "string") {
    logger.warn("Destination & Body are not strings and must be strings")
    return false

  } else if (destination === "" || body === "") {
    logger.warn("Destination & Body cannot be empties")
    return false

  } else {

    return true
  }
}

module.exports = validation