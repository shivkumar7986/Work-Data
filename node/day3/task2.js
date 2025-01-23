// var path = require('path');
var express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

app.get("/", (req,res)=>{
    var dt = [
        {id : 100,product : "pen",price : 10},
        {id : 101,product : "pencil",price : 5},
        {id : 102,product : "erasor",price : 5},
        {id : 103,product : "sharpner",price : 5},
        {id : 104,product : "scale",price : 10},
        {id : 105,product : "scissor",price : 25},
        {id : 106,product : "sparkle",price : 10},
        {id : 107,product : "chart",price : 5},
        {id : 108,product : "clay",price : 20},
        {id : 109,product : "notebook",price : 50}
       ] 
    res.json(dt);
})

app.listen(3000)