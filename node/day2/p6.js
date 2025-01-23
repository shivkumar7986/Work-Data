var http = require('http');
var url = require('url');


function factfun(num){
    let res = 1;
    if(num==0 || num ==1){
        return 1;
    }
    else{
       for(let i = 2 ; i<=num ; i++){
         res = res * i
        }
        return res
    }
}

http.createServer((req,res)=>{
    res.writeHead(200 , {'content-type': 'text/html'});
    var dt = url.parse(req.url,true).query;
    var num = parseInt(dt.num)
    let result = factfun(num);
    let text = `<h2> Factorial : ${result}`;
    res.end(text);
}).listen(3000);