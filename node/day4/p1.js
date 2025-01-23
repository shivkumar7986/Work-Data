var path = require('path');
var express = require('express');
const app = express();

//set view engine and path
app.set('view engine', 'hbs');


app.set('views',path.join(__dirname,'view')); 


app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/about",(req,res)=>{
    res.render('about')
})

app.get("/contact",(req,res)=>{
    res.render('contact')
})

app.listen(3000)