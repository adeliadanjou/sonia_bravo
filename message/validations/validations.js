const uuidv4 = require('uuid/v4');
const pendingMessageSave = require('../clients/pendingMessageSave')
const {
  creditQueue
} = require('../messageQueue/messageQueue');

let validation = function (req) {

  const {
    destination,
    body,

  } = req.body;

  if (typeof destination !== "string" || typeof body !== "string") {
    return false

  } else if (destination === "" || body === "") {
    return false

  } else {

    return true

  }
}

module.exports = validation