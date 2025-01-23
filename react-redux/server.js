const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors')
const productModel = require('./models/product')


const PORT = process.env.PORT || 4000;

app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

var imgname;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , 'uploads'));
    },
    filename: (req, file, cb) => {
        imgname = Date.now() + path.extname(file.originalname)
        cb(null, imgname);
    }
  })
  
  const upload = multer({ storage: storage })

mongoose.connect('mongodb://localhost:27017/mongopractice');


app.get('/' , async (req,res)=>{
    const response = await productModel.find();
    res.status(200).json(response)
})

app.listen(PORT , ()=>{
    console.log(`app is running on port ${PORT}`);
})