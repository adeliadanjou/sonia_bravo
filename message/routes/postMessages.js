const express = require('express');
const postMessageRoute = express.Router();
const validation = require('../validations/validations')
const uuidv4 = require('uuid/v4');
const pendingMessageSave = require('../clients/pendingMessageSave')
const {
    creditQueue
} = require('../messageQueue/messageQueue');
const logger = require('../logs/winston')
let recovery = false;

postMessageRoute.post('/messages', (req, res, next) => {

    if (validation(req, res)) {
        messageObj = prepareMessage(req);
        if (isQueueLengthOk(recovery, res)) {
            pendingMessageSave(messageObj).then(() => {
                creditQueue.add(messageObj)
                logger.warn("Pending Message Saved")
                res.send(`processing your message ${messageObj.myId}`)
            })
        }
        else {
            logger.warn("Many connections in postMessageRoute")
            res.send('Many connections, please try later!')} } 
    else {
        logger.warn("Not valid destination or body")
    }
});


function prepareMessage(req) {
    const myId = uuidv4()  
    return {
        type: "Check Credit",
        myId: myId,
        destination: req.body.destination,
        body: req.body.body,
        status: "PENDING",
    }
}


function isQueueLengthOk(recovery,res) {

    return creditQueue.count()
        .then(queuecount => {
            
            if(recovery === false){
                if(queuecount >10){
                    recovery=true;
                    return false;
                }
                if(queuecount <10){return true}
            }

            if(recovery === true){
                if(queuecount <5){
                    recovery=false;
                    return true;
                }
                if(queuecount >5){
                  return false}
            }
           

        })
}



module.exports = postMessageRoute;