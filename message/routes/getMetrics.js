const express = require('express');
const getMetrics = express.Router();
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const counter = new client.Counter({
  name: 'request_count',
  help: 'request_count_help'
});

collectDefaultMetrics({ timeout: 5000, prefix: 'messages_default_metrics_' });

getMetrics.get('/metrics', (req,res,next) => {
  counter.inc(); 
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
})

module.exports = getMetrics