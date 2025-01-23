const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const databse = require('./config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require("multer");
const cors = require('cors')
const userModel = require('./models/usermodel');
const productModel = require('./models/product');
const product = require('./models/product');

app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));;

var imgname ;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads'));
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

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true // Allow cookies to be sent
}));



app.get("/", async (req, res) => {
    let products = await productModel.find();
    res.json(products)

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


app.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) return res.status(404).send("User not found!");

        // Check password with bcrypt
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send("Internal server error!");
            }

            if (result) {
               
                const token = jwt.sign({ id: user._id, email: user.email }, 'shhh', { expiresIn: '7d' });

                
                return res.json({
                    user: {
                        name: user.name,
                        email: user.email,
                        
                    },
                    token: token 
                });
            } else {
                return res.status(401).send("Invalid credentials!");
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send("Internal server error!");
    }
});


app.get("/logout", (req, res) => {
    res.cookie('token', '');
    res.json({
        message:'logout done!!'
    })
})

app.get("/admin", async (req, res) => {
    const products = await productModel.find()
    // console.log(products);
    res.json(products)
})


app.post("/admin/addproducts", upload.single('img'), async (req, res) => {
    try {
        const { pid, pname, pprice } = req.body;

        // Check if the productId already exists
        const existingProduct = await productModel.findOne({ productId: pid });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this ID already exists." });
        }

        // Create a new product
        const product = await productModel.create({
            productImg: req.file.filename, // Use req.file.filename for the uploaded image
            productId: pid,
            productName: pname,
            productPrice: pprice
        });

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        // Handle other errors
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate product ID detected." });
        }
        res.status(500).json({ message: "Internal server error." });
    }
});

app.get("/admin/deleteproducts/:id"  , async (req,res)=>{
    let pid = req.params.id;
    const deletedproduct = await productModel.findOneAndDelete({_id : pid})
    res.json(deletedproduct)
})

app.get("/admin/editproduct/:id"  , async (req,res)=>{
    let pid = req.params.id;
    const editproduct = await productModel.find({productId : pid})
    res.json(editproduct)
})

app.post('/admin/updateproduct', upload.single('img') , async (req, res) => {
    try {
        const data = {
            productImg: req.file.filename,
            productId: req.body.pid,
            productName: req.body.pname, 
            productPrice: req.body.pprice,
        };
        console.log(data);
        
        await productModel.updateOne({ productId: req.body.pid }, data);
        
        res.redirect('/admin');
    } catch (err) {
        res.send(err);
    }
});

app.get("/viewproduct/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const product = await productModel.findById(id); 
      console.log(product);
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Product not found." });
    }
  });
  



// app.get("/addtocart/:id" , async (req,res)=>{
//     let user = await userModel.findOne({_id: req.user.userId});
//     console.log(user);

//     let pid = req.params.id;
//     let product = await productModel.findOne({productId : pid})
//     console.log(product);

//     user.cart.push(product._id)
//     await user.save();
//     res.send("product added succesfully!!")
   
// })
// app.get("/removefromcart/:id" , isloogedin, async (req,res)=>{
//     try {
//         // Find the logged-in user
//         let user = await userModel.findOne({ _id: req.user.userId });

//         // Filter out the product from the user's cart
//         user.cart = user.cart.filter(productId => productId.toString() !== req.params.id);

//         // Save the updated user document
//         await user.save();

//         // Redirect the user back to the cart page
//         res.redirect("/userCart");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("An error occurred while removing the product from your cart.");
//     }
   
// })


// app.get("/userCart", isloogedin, async (req, res) => {
//     // Find the user and get their cart (which contains product IDs)
//     let user = await userModel.findOne({ _id: req.user.userId });
    
//     // Extract product IDs from the user's cart
//     let productIds = user.cart;
    
//     // Find the actual products from the productModel using the IDs
//     let cartItems = await productModel.find({ _id: { $in: productIds } });
//     console.log(cartItems);
//     // Render the 'userCart' page, passing the cart items
//     res.render("userCart", { cartItems });
// });



// // Middleware to check if logged in
// function isloogedin(req, res, next) {
//     const token = req.cookies.token;  
//     if (!token) {
//         return res.status(403).send("You must be logged in!!!");
//     }

//     try {
//         const data = jwt.verify(token, "shhh");
//         req.user = data;
//         console.log(req.user);
//         next();
//     } catch (err) {
//         res.status(403).send("Invalid token!!!");
//     }
// }

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
