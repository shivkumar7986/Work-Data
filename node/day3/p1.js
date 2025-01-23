var http = require('http');

http.createServer((req,res)=>{
    res.writeHead(200 , {'content-type' : 'text/html'})
    var a = [
        {
            name :"shiv",
            id : 100,
            age : 21,
            phone : 7986925092
        }
    ]

    var dt = JSON.stringify(a);
    res.write(dt);
}).listen(3000);