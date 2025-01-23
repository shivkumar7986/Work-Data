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
const orderModel = require('./models/order')


app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

var imgname;
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



app.post('/registor', async (req, res) => {
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
            res.send("user registered successfully")
            res.render(user)
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
        message: 'logout done!!'
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

app.get("/admin/deleteproducts/:id", async (req, res) => {
    let pid = req.params.id;
    const deletedproduct = await productModel.findOneAndDelete({ _id: pid })
    res.json(deletedproduct)
})

app.get("/admin/editproduct/:id", async (req, res) => {
    let pid = req.params.id;
    const editproduct = await productModel.find({ productId: pid })
    res.json(editproduct)
})

app.post('/admin/updateproduct', upload.single('img'), async (req, res) => {
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


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from Authorization header
    // console.log(token);
    // console.log(token);
    try {
        const verified = jwt.verify(token, 'shhh'); // Replace with your actual secret key
        req.userId = verified.id;

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

app.get('/verify/:pid', verifyToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const pid = req.params.pid;
        console.log("Product ID:", pid);

        // Fetch product by productId
        const product = await productModel.findOne({ productId: pid });
        console.log("Product:", product);

        user.cart.push(product._id)
        await user.save()


        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.get('/cart', verifyToken, async (req, res) => {
    try {
        // Find the user by ID
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Array to hold the full product details
        const cartItems = [];

        // Loop through each product ID in the user's cart
        for (let productId of user.cart) {
            const product = await productModel.findById(productId); // Fetch each product by its ID
            if (product) {
                cartItems.push(product); // Add the full product details to the cartItems array
            }
        }

        // Send back the populated cart items
        res.json({ items: cartItems, user: user });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

// const mongoose = require('mongoose');

app.get('/remove-cart-item/:id', verifyToken, async (req, res) => {
    try {
        // Find the user by ID
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const pid = new mongoose.Types.ObjectId(req.params.id); // Convert pid to ObjectId
        console.log("Product ID to remove:", pid);

        // Remove the product from the cart
        user.cart = user.cart.filter(_id => !_id.equals(pid)); // Use .equals() for ObjectId comparison

        // Save the updated user document
        await user.save();

        res.json({ message: 'Product removed from cart', cart: user.cart });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/logged-in-user', verifyToken, async (req, res) => {
    const user = await userModel.findById(req.userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user)
})

app.post('/showcart/payment', async (req, res) => {
    const { username, name, email, product } = req.body;

    // Calculate total amount
    const totalAmount = product.reduce((total, item) => {
        const price = Number(item.productPrice);
        const quantity = Number(item.productQuantity);

        return total + price * quantity;
    }, 0);

    let billNumber;

    const bill = await orderModel.find()

    console.log(bill);

    if (bill.length == 0) {
        billNumber = 100
        console.log('default billno' + billNumber);

    }
    else {
        const heighestbill = await orderModel.find({}).sort({ 'billNo': -1 }).limit(1)
        billNumber = heighestbill[0].billNo;

        console.log(heighestbill[0].billNo);
        billNumber += 1
        console.log('updated bill no:' + billNumber);
    }


    const orderProduct = new orderModel({
        billNo: billNumber,
        username,
        name,
        email,
        products: product,
        totalAmount,
    });

    await orderProduct.save();

    res.status(200).json({ message: 'Payment processed successfully.' });
});



app.post('/admin/orders', async (req, res) => {
    const dt = await orderModel.find();
    // console.log(dt);
    res.json(dt)
})

app.post('/admin/orders/status/:id/:status', async (req, res) => {
    console.log(req.params.id);
    console.log(req.params.status);
    let statusUpdate = await orderModel.updateOne({ billNo: req.params.id }, { $set: { orderStatus: req.params.status } })
    res.json(statusUpdate)
})

app.post('/coustomer/bill', async (req, res) => {
    const { billNo, email } = req.body
    const dt = await orderModel.find({ 'billNo': billNo, 'email': email });
    console.log(dt);
    res.json(dt)
})

app.post('/coustomer/orders',verifyToken , async (req, res) => {
    const user = await userModel.findById(req.userId).select('-password'); ;
    console.log(user.email)

    const allOrders = await orderModel.find({email:user.email})
    console.log(allOrders);
    res.json(allOrders)
})


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
