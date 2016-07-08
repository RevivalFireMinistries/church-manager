/**
 * Created by russel on 16/07/08.
 */
var express = require('express'),
    app = express(),
    port = process.env.PORT || 80;

app.use(express.static(__dirname + '/'));
app.listen(port, function(){
    console.log("Fire Manager Web Server listening on: http://localhost:%s", port);
});