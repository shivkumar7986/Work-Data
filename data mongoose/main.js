
var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
const path=require("path");
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
app.set('view engine', 'ejs'); 
var port     = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.set('views', path.join(__dirname, 'views'));

app.use('/assets',express.static(__dirname + '/public'));

var Employee = require('./models/employee');
var Login = require('./models/login');
 
mongoose.connect(database.url);

console.log(database.url);

//get all employee data from db
app.get('/', function (req, res) {
	res.render('login');
})

app.post('/login',async (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	if(username == "admin" && password == "admin"){
        res.redirect('/admin');
    }
	else{
		var query= {username:username,password:password};
		let employee = await Login.find(query);
		if(employee.length>0){
			res.redirect('/api/employeeslogin/'+employee[0].empId);
		}
	}
})

app.get('/api/employeeslogin/:id', async function(req, res) {
	try {
		let id = req.params.id;
		console.log(id);
		var query = { id: id };
		let employee = await Employee.find(query);
		console.log(employee);
		res.render('profile', {
			results: employee
		});
	} catch (err) {
		res.send(err);
	}
});

app.get('/admin', async function(req, res) {
	// use mongoose to get all todos in the database

	let result = await  Employee.find();
    //res.status(200).json(result);
	//let employee = Employee.find().query;
	//console.log(res.json(result))
	//console.log(result);
	res.render('employee_views',{
				results: JSON.stringify(result)
				
			  });
		 // return all employees in JSON format

});
app.get('/api/add',(req, res) => {
	res.render("employee_a");
 });
// create employee and send back all employees after creation
app.post('/api/employees_create', function(req, res) {
	// create mongose method to create a new record into collection
	Employee.create({
		id:req.body.id,
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	});
console.log("Employee created")
//res.redirect("/")
res.json("Done")

});



app.get('/api/employeesfind/:id', async function(req, res) {
	try {
		let id = req.params.id;
		console.log(id);
		var query = { id: id };
		let employee = await Employee.find(query);
		console.log(employee);
		res.render('employee_edit', {
			results: employee
		});
	} catch (err) {
		res.send(err);
	}
});







app.post('/api/employeesupdate', async function(req, res) {
	try {
		var data = {
			id: req.body.id,
			name: req.body.name,
			salary: req.body.salary,
			age: req.body.age
		};
		console.log("hi");
		console.log(data);
		var query = { id: req.body.id1 };

		// update the employee
		await Employee.updateOne(query, data);
		res.redirect("/");
	} catch (err) {
		res.send(err);
	}
});





app.get('/employeesdelete/:employee_id', async function(req, res) {
	try {
		console.log(req.params.employee_id);
		let id = req.params.employee_id;
		await Employee.deleteOne({
			id: id
		});
		res.redirect("/");
	} catch (err) {
		res.send(err);
	}
});

app.get('/api/pswd/:id', async function(req, res) {
	try {
		let id = req.params.id;
		//console.log(id);
		var query = { id: id };
		let employee = await Employee.find(query);
		//console.log(employee);
		res.render('assignPswd', {
			results: employee
		});
	} catch (err) {
		res.send(err);
	}
});
app.post('/assignpswd', function(req, res) {
	try{
		Login.create({
			id: req.body.id,
			username: req.body.username,
			password: req.body.password,
			empId: req.body.empId
		});
		console.log("Password created");
		res.redirect("/");
	
	}
	catch (err) {
		res.send(err);
	}
});







app.listen(port);
console.log("App listening on port : " + port);