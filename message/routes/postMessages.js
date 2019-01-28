const express = require('express');
const postMessageRoute = express.Router();
const validation = require('../validations/validations')
const uuidv4 = require('uuid/v4');
const pendingMessageSave = require('../clients/pendingMessageSave')
const {
    creditQueue
} = require('../messageQueue/messageQueue');
let recovery = false;

postMessageRoute.post('/messages', (req, res, next) => {

    if (validation(req, res)) {
        messageObj = prepareMessage(req);
        if (isQueueLengthOk(recovery, res)) {
            pendingMessageSave(messageObj).then(() => {
                creditQueue.add(messageObj)
                res.send(`processing your message ${messageObj.myId}`)
            })
        }
        else {res.send('Many connections, please try later!')} } 
    else {
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


function isQueueLengthOk(recovery,res) {

    return creditQueue.count()
        .then(queuecount => {
            
            if(!recovery){
                if(queuecount >10){
                    recovery=true;
                    res.send("Many petitions, please try later!")
                    return false;
                }
                if(queuecount <10){return true}
            }

            if(recovery){
                if(queuecount <5){
                    recovery=false;
                    return true;
                }
                if(queuecount >5){
                  res.send("Many petitions, please try later!")
                  return false}
            }
           

        })
}



module.exports = postMessageRoute;