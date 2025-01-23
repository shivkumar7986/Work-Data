const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const userModel = require('./model/user');
const user = require('./model/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
    res.send("welcomet to home page!!! if you want to add stundent detail , please visit /createUser")
})

app.get('/createuser',async function(req,res){
       const userSchma = await userModel.create({
            name: 'nisha',
            age: 21,
            marks:95
        })

        res.send(userSchma)
})

app.get('/updateuser' ,async function(req,res){
    const update = await userModel.findOneAndUpdate({name: 'shiv'} , {$set :{marks : 70} } );
    
    res.send( update)
})

app.get('/alluser' ,async function(req,res){
    const alluser = await userModel.find();
    res.send(alluser )
})

app.get('/delete' , async function (req,res) {
    const deleteuser = await userModel.findOneAndDelete({name: 'shivam'});

    res.send(deleteuser)
})

app.listen(3000)