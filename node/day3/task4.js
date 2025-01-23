// 4.  read the contents of file and print the response in text area

var express = require('express');
const app = express();
var cors = require('cors');
var fs = require('fs');

app.use(cors())

fs.readFile('htmldata.txt', 'utf8' , (err, data)=>{
    if(err) throw err;
    
    app.get("/" ,(req,res)=>{
    
        res.end(JSON.stringify(data))
    
    })
}) 




app.listen(3000);