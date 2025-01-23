const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const empModel = require('./model/employee');
const loginModel = require('./model/login');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/oopsprojects', function (req, res) {
    res.render('login')
})


app.post('/userlogin', async function (req, res) {
    let u = req.body.username;
    let p = req.body.password;

    if (u == 'admin' && p == 'admin123') {
        res.redirect('/oopsprojects/admin')
    }
    else {
        let employee = await loginModel.find({username:u , password:p});
        if(employee.length>0){
            
            res.redirect('/oopsprojects/employee/' + employee[0].empId)
        }
    }
})

app.get('/oopsprojects/admin', async function (req, res) {

    const allemp = await empModel.find()
    console.log(allemp);
    res.render('adminpage.ejs', { "a": allemp })
})

app.get('/oopsprojects/employee/:id', async function (req, res) {

    try{
    
        const emp = await empModel.find({id: req.params.id})
        res.render('employeepage' , {"a" : emp})
    }catch(err){

    }
    
})


app.post('/addemployees', async function (req, res) {
    let id = req.body.id;
    let nm = req.body.name;
    let sal = req.body.salary;
    let age = req.body.age;

    const empcreated = await empModel.create({
        id: id,
        name: nm,
        salary: sal,
        age: age
    })
    res.redirect('/oopsprojects/admin')
})

app.get('/deleteemployee/:id', async function (req, res) {
    let eid = req.params.id;
    const deletedemp = await empModel.findOneAndDelete({ id: eid })
    res.redirect('/oopsprojects/admin')
})

app.get('/editemployee/:id', async function (req, res) {
    let eid = req.params.id;
    let editemp = await empModel.find({ id: eid })
    console.log(editemp);
    res.render('empedit', { "a": editemp })
})


app.post('/updateemployees', async function (req, res) {

    let pid = req.body.t1;
    let pnm = req.body.t2;
    let psal = req.body.t3;
    let page = req.body.t4;

    try {
        let updatedemp = await empModel.updateOne({ id: pid }, {
            $set: {
                name: pnm,
                salary: psal,
                age: page
            }
        })
        res.redirect('/oopsprojects/admin')
    }
    catch (err) {
        console.log(err);
    }

})


app.get('/oopsprojects/password/:id', async function (req, res) {
    try{
        let pid = req.params.id;

        let emp = await empModel.find({id: pid});

        res.render('asignpwd' , {"a": emp} )
    }
    catch(err){
        console.log(err)
    }
})

app.post('/oopsprojects/assignpwd' ,  function(req , res){
    try{
         loginModel.create({
            id: req.body.id,
            username : req.body.username,
            password : req.body.password,
            empId : req.body.empId
        })

        res.redirect('/oopsprojects')
    }
    catch(err){
        console.log(err);
    }
})
app.listen(4000);