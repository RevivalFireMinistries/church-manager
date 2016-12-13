/**
 * Created by russel on 16/07/08.
 */
var log4js = require('log4js');
var express = require('express');

var  app = module.exports = express.createServer();
var port = process.env.PORT || 80;

app.use(express.static(__dirname + '/'));
logger = log4js.getLogger("file-appender");
app.listen(port, function(){
    logger.info("Fire Manager Web Server listening on: http://localhost:%s", port);
});