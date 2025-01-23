var http = require('http');
var dt = require('./p3');

http.createServer(function(req,res){

    res.writeHead(200,{'content-type':'text/html'})
    res.write( "<h1>The date and time are currently :" + dt.myDate());
    res.write( "<h1> Sum of two no's:" + dt.sum(3,4));
    res.write("<h2> Fact of a no :" + dt.fact(5));
    res.end();

}).listen(3000);

console.log("server listening on port 1010")