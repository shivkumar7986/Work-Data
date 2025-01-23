var path = require('path')
var express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render('login-signup')
})

app.get("/login", (req, res) => {
    res.render('login')
})

app.post('/logged', (req, res) => {
    let userName = req.body.name;
    let userPass = req.body.pass;
    console.log(userName);
    console.log(userPass);

    let userDt = [{ "username": userName, "userpassword": userPass }];
    console.log(userDt)
    if (userName == 'admin' && userPass == '12345') {
        res.render('adminblock')
    }
        res.render('coustmerblock',  { results :userDt})

    res.render('login')    
})

app.get("/signup", (req, res) => {
    res.render('signup')
})

app.get("/admin", (req, res) => {
    res.render('adminblock')
})
app.get("/coustomer", (req, res) => {
    res.render('coustmerblock')
})


app.get("/userlist", (req, res) => {
    res.render('userlist')
    
})

app.listen(3000)