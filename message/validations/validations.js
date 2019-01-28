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