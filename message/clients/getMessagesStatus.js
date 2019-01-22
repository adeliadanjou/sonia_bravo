const express = require('express');
const getMessagesStatus = express.Router();
const Message = require("../models/Message");

getMessagesStatus.get('/message/:myId/status', (req, res) => {
	var MessagePrimary = Message("primary");

	MessagePrimary.find({
		myId: req.params.myId
	}, (error, messageStatus) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(messageStatus);
		}
	});
});

module.exports = getMessagesStatus;