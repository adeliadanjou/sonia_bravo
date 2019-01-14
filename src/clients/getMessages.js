const express = require('express');
const getMessagesRoute = express.Router();
const Message = require("../models/Message");

getMessagesRoute.get('/messages',  (req, res, next) =>{
  Message.find({}, (error, messagesFromDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(messagesFromDB);
		}
	});
});

module.exports = getMessagesRoute;