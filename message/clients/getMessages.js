const express = require('express');
const getMessagesRoute = express.Router();
const Message = require("../models/Message");
const logger = require('../logs/winston')

getMessagesRoute.get('/messages', (req, res, next) => {
	var MessagePrimary = Message("primary");

	MessagePrimary.find({}, (error, messagesFromDB) => {
		if (error) {
			logger.error(error)
			next(error);
		} else {
      logger.info("GetMessages Route worked well")
			res.status(200).json(messagesFromDB);
		}
	});
});

module.exports = getMessagesRoute;