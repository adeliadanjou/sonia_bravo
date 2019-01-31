const express = require('express');
const getMetrics = express.Router();
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;

const req_counter = new client.Counter({
  name: 'request_count',
  help: 'request_count_help',
  labelNames: ['path', 'method']
});


let metricsCounter = function (req,res,next) {
  method = req.method
  path = req.path
  if(path !== "/metrics" && path !== "/health"){
    req_counter.labels(path, method).inc();
  }
  
  next()
  }
  

collectDefaultMetrics({ timeout: 5000, prefix: 'messages_default_metrics_' });

getMetrics.get('/metrics', (req,res,next) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
})

module.exports = {getMetrics, metricsCounter};