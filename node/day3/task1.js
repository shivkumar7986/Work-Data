var http = require('http');
var url = require('url');

function numPower (num , pow){
    let result = Math.pow(num , pow)
    return result;
}

http.createServer((req,res)=>{
    res.writeHead(200 , {'content-type' : 'text/html'});
    let dt = url.parse(req.url, true).query;
    let no = parseInt(dt.num);
    let pow = dt.pow
    let ans = numPower(no , pow);
    let txt = '<h2> Output :' + ans;
    res.end(txt);

}).listen(3000);





