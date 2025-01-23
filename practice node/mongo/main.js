const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const databse = require('./config/databse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require("multer");

const userModel = require('./models/ursemodel');
const productModel = require('./models/product');

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

var imgname ;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },

    filename: (req, file, cb) => {
       imgname = Date.now() + path.extname(file.originalname)
        cb(null, imgname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }) 

mongoose.connect(databse.url);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, "views"));

app.get("/", async (req, res) => {
    let products = await productModel.find();
    res.render("home" , {"product": products});

})

app.get('/register', (req, res) => {
    res.render("register")
})

app.post('/registering', async (req, res) => {
    const { name, username, email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("user already registered!!!");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                name,
                username,
                email,
                password: hash
            })

            let token = jwt.sign({ email: email, password: user._id }, "shhh");
            res.cookie('token', token);
            res.send("user registered successfully")
        })
    })
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email })

    if (!user) return res.status(500).send("something went wrong!!!")

    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: email, userId: user._id }, "shhh");
            res.cookie('token', token);
            
            // Admin  check
            if (email === "admin@gmail.com") {  
                res.redirect('admin'); 
            } else {
                res.redirect('/')
            }
        } else {
            res.status(401).send("Invalid credentials!");
        }
    });
})

app.get("/logout", (req, res) => {
    res.cookie('token', '');
    res.redirect('/login');
})

app.get("/admin", isloogedin, async (req, res) => {
    const products = await productModel.find()
    console.log(products);
    res.render('admin' , {"products": products});
})
app.post("/admin/addproducts", upload.single('img') ,isloogedin, async (req, res) => {
    let {img ,pid ,pname ,pprice} = req.body;

    const product = await productModel.create({
        productImg: imgname ,
        productId:pid,
        productName : pname,
        productPrice: pprice
    })
    res.redirect('/admin')
})

app.get("/admin/deleteproducts/:id" , isloogedin , async (req,res)=>{
    let pid = req.params.id;
    const deletedproduct = await productModel.findOneAndDelete({productId : pid})
    res.redirect('/admin')
})

app.get("/addtocart/:id" , isloogedin, async (req,res)=>{
    let user = await userModel.findOne({_id: req.user.userId});
    console.log(user);

    let pid = req.params.id;
    let product = await productModel.findOne({productId : pid})
    console.log(product);

    user.cart.push(product._id)
    await user.save();
    res.send("product added succesfully!!")
   
})
app.get("/removefromcart/:id" , isloogedin, async (req,res)=>{
    try {
        // Find the logged-in user
        let user = await userModel.findOne({ _id: req.user.userId });

        // Filter out the product from the user's cart
        user.cart = user.cart.filter(productId => productId.toString() !== req.params.id);

        // Save the updated user document
        await user.save();

        // Redirect the user back to the cart page
        res.redirect("/userCart");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while removing the product from your cart.");
    }
   
})


app.get("/userCart", isloogedin, async (req, res) => {
    // Find the user and get their cart (which contains product IDs)
    let user = await userModel.findOne({ _id: req.user.userId });
    
    // Extract product IDs from the user's cart
    let productIds = user.cart;
    
    // Find the actual products from the productModel using the IDs
    let cartItems = await productModel.find({ _id: { $in: productIds } });
    console.log(cartItems);
    // Render the 'userCart' page, passing the cart items
    res.render("userCart", { cartItems });
});



// Middleware to check if logged in
function isloogedin(req, res, next) {
    const token = req.cookies.token;  
    if (!token) {
        return res.status(403).send("You must be logged in!!!");
    }

    try {
        const data = jwt.verify(token, "shhh");
        req.user = data;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(403).send("Invalid token!!!");
    }
}

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
