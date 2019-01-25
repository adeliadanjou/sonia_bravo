const express = require('express');
const postMessageRoute = express.Router();
const validation = require('../validations/validations')
// const creditValidation = require('../../credit/validations/creditValidation')

postMessageRoute.post('/messages', (req, res, next) => {

    if (validation(req, res)) {
        messageObj = prepareMessage(req);
        isQueueLengthOk(res) ? pendingMessageSave(messageObj).then(() => {
            creditQueue.add(messageObj)
            res.send(`processing your message ${messageObj.myId}`)
        }) : console.log("Cola desactivada"), res.send('Many connections, please try later!')

    } else {
        console.log("Not valid destination or body")
    }
});


function prepareMessage(req) {
    const myId = uuidv4()
    // creo el objeto a añadir a add:   
    return {
        type: "Check Credit",
        myId: myId,
        destination: req.body.destination,
        body: req.body.body,
        status: "PENDING",
    }
}

function isQueueLengthOk() {
    let recovery = true;

    return creditQueue.count()
        .then(queuecount => {
            if (queuecount > 6) { recovery = false }
            if (queuecount > 10 && recovery === false || queuecount < 10 && recovery === false) {
                return false
            } else { return true }
        })
}



module.exports = postMessageRoute;