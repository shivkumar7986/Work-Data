const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine" , "ejs");
app.set("views" ,path.join(__dirname, "views") )

const PORT = process.env.PORT || 4000 ;

app.use("/uploads" , express.static(path.join(__dirname, "uploads")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  })

const fileFilter = function fileFilter (req, file, cb) {
   if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
   }
   else{
    cb(null, false)
   }
}  
  
  const upload = multer({ storage :storage, fileFilter: fileFilter});

app.get("/" , (req,res)=>{
    res.render("home")
})

app.post("/uploadfile" , upload.single('img') ,(req,res)=>{
    try{
        res.status(200).send("file uploaded succesfully!!!")
    }
    catch (err){
        console.log(err);
    }
})

app.listen(PORT , ()=>{
    console.log("App Running On Port 4000");
})