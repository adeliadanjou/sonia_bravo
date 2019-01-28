const express = require('express');
const getMessagesStatus = express.Router();
const Message = require("../models/Message");
const logger = require('../logs/winston')

getMessagesStatus.get('/message/:myId/status', (req, res) => {
	var MessagePrimary = Message("primary");

	MessagePrimary.find({
		myId: req.params.myId
	}, (error, messageStatus) => {
		if (error) {
			logger.error(error)
			next(error);
		} else {
			logger.info("getMessagesStatus route works well")
			res.status(200).json(messageStatus);
		}
	});
});

module.exports = getMessagesStatus;