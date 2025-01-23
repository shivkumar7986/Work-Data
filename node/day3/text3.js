var http = require('http');
var url = require('url');
var fileSystem = require("fs");




http.createServer((req, res) => {

    res.writeHead(200, { 'content-type': 'text/html' });
    res.write("welcome to server");
    var dt = url.parse(req.url, true).query;
    var text = dt.t1;

    var a = fileSystem.writeFile("htmldata.txt", text, (err, file) => {
        if (err) throw err
        console.log(" text file created")
    })

    var b = fileSystem.readFile("htmldata.txt" , "utf8" , (err, data)=>{
        if(err) throw err

        console.log(data)

    })

    

}).listen(3000)