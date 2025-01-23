var http = require('http');
var url = require('url');
console.log(url);
http.createServer((req,res)=>{
    res.writeHead(200, {'content-type' : 'text/html'})
    var q = url.parse(req.url, true).query
    var text = '<h2>Your ID :'+ q.id + '<br> Your Name:'+ q.name;
    console.log(text);
    console.log(q);
    res.end(text);
}).listen(3000)