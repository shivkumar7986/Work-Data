const express = require('express');
const app = express();
const path= require('path');
const multer = require('multer');

app.set('view engine' , 'ejs');
app.set('views' ,path.join(__dirname , 'views'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/uploads" , express.static(path.join(__dirname, '/uploads')));

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null , 'upload');
    },
    filename: (req,file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) =>{
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null , true);
    }
    else{
        cb(null , false);
    }
}


const upload = multer({ storage :storage, fileFilter: fileFilter});

app.get("/", (req,res)=>{
    res.render('multer');
})


app.post('/uploads' , upload.single('image'), (req,res, next) =>{
    try {
        return res.status(202).json({
            message: 'File upload succesfully'
        });
    }catch (error){
        console.error(error);
    }
});


app.listen(3000);