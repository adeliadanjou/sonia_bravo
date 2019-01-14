const messageApp = require('../messageApp/messageApp')
const messageSave = require('../clients/messageSave')
const pay = require('../clients/pay')

let validation = function (req, res) {

  const {
    destination,
    body
  } = req.body;

  if (typeof destination !== "string" || typeof body !== "string") {
    res.status(400);
    res.send("Please enter valid strings in both areas");

  } else if (destination === "" || body === "") {
    res.status(400);
    res.send("Destination or body cannot be empty");
  } else {

    messageApp(destination, body)
      .then(resp => {

        let status = "OK"
        messageSave(destination, body, status)

        res.status(200);
        res.send(`${resp.data}`)

        //bloqueamos restas al crédito para que se resten de una en una:
        lock()
          pay()
        unlock()

      })
      .catch(e => {

        if (e.status === undefined) {
          let status = "TIMEOUT"
          messageSave(destination, body, status)
          res.status(408)
          res.send('Oh oh! Timeout!!!!')
        } else {
          let status = "NO ENVIADO"
          messageSave(destination, body, status)
          res.status(500)
          res.send('Algo ocurrió patrón! Send Again')
        }


      })
  }

}

module.exports = validation;