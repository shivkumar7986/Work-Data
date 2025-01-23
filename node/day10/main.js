const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine' , 'ejs' );
app.set('views' ,path.join(__dirname , 'view'));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'productsdata'
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected!!!!!!!");
});

app.use('/uploads' , express.static(path.join(__dirname, '/uploads')))
var x=""
const storage = multer.diskStorage({
    destination: (req, file ,cb) => {
        cb(null , 'uploads');
    },

    filename: (req,file,cb) => {
        x=Date.now() + path.extname(file.originalname)
        cb(null , Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
const upload = multer({storage: storage , fileFilter : fileFilter})

app.get('/' , (req,res)=>{
    var sql = `select * from productlist`;
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log(result);
        res.render('home' , {"a": result})
    })
    
});

app.post('/addproduct' , upload.single('image') , (req,res)=>{
    // let pImg = req.file.image;
    let pId = req.body.productId;
    let pName = req.body.productName;
    let pPrice= req.body.productPrice;

    var sql = `insert into productlist values('${x}' , ${pId} , '${pName}' , ${pPrice})`;
    con.query(sql, function(err){
        if(err) throw err;
        console.log("product inserted succesfully");
        res.redirect('/')
    })
})


app.get('/deleteprod/:id', function(req,res){
    var pid= req.params.id;
    var sql = `delete from productlist where id = ${pid}`
    con.query(sql, function(err){
        if(err) throw err;
        console.log('product deleted succesfully!!!!!');
        res.redirect('/');
    })
})

app.get('/editprod/:id' , function(req,res){
    var pid = req.params.id;
    var sql = `select * from productlist where id = ${pid}`
    con.query(sql, function(err,dt){
        if(err) throw err;
        console.log(dt);
        res.render('edit' , {"a":dt})
    })
})

app.post('/updateprod',upload.single('i1') , (req,res)=>{
    let pp = req.file.i1;
    let pi = req.body.myid;
    let pn = req.body.i3;
    let pr = req.body.i4;

    var sql = `update productlist set pictures = '${x}'  , name = '${pn}' , price = ${pr} where id = ${pi}`;
    con.query(sql, function(err){
        if(err) throw err;
        console.log('update succesfull!!!!');
        res.redirect('/')
    })
})

app.listen(3000);