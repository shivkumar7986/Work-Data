
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const session = require('express-session');

const registerModel = require('./models/registor');
const productModel = require('./models/products');
const cartModel = require('./models/usercart');

app.use(session({
    resave: false,
    saveUnintified: false,
    secret: 'chintapakdamdam'
}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
var x = ""
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },

        filename: (req, file, cb) => {
            x = Date.now() + path.extname(file.originalname)
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })

app.get("/", function (req, res) {
    res.render('home')
});


app.get("/trendingdrips", async function (req, res) {
    const allproducts = await productModel.find();
    let user = req.session.username;
    res.render('userview', { "a": allproducts, "abdul": user })
});

app.get('/treandingdrips/register', function (req, res) {
    res.render('register')
})

app.post('/trendingdrips/registering', async function (req, res) {
    let uid = req.body.userid;
    let usernm = req.body.username;
    let eml = req.body.email;
    let pwd = req.body.password;

    try {
        const registerdUser = await registerModel.create({
            id: uid,
            username: usernm,
            email: eml,
            password: pwd
        })

        res.redirect("/trendingdrips/login")
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/treandingdrips/login', function (req, res) {
    res.render('login')
})

app.post('/trendingdrips/acclogin', async function (req, res) {
    let usernm = req.body.username;
    let pwd = req.body.password;

    req.session.username = usernm;
    req.session.password = pwd;

    try {
        const checkuser = await registerModel.findOne({ username: usernm, password: pwd });
        // console.log(checkuser);  // Debugging to check user

        if (usernm === 'admin' && pwd === 'admin123') {
            res.redirect('/trendingdrips/admin');
        }
        else if (checkuser) {
            res.redirect('/trendingdrips');
        }
        else {
            res.redirect('/treandingdrips/register');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');  // Handle any unexpected errors
    }
});

app.get('/trendingdrips/admin', async function (req, res) {
    const allproducts = await productModel.find()
    console.log(allproducts);
    res.render('admin', { "a": allproducts })
})


app.post('/trendingdrips/admin/addproducts', upload.single('img'), async function (req, res) {
    let pid = req.body.pid;
    let pnm = req.body.name;
    let prs = req.body.price;

    const addedProduct = await productModel.create({
        productImg: x,
        productId: pid,
        productName: pnm,
        productPrice: prs
    })
    res.redirect('/trendingdrips/admin')
})

app.get('/trendingdrips/admin/deleteproducts/:id', async function (req, res,) {
    try {
        let pid = req.params.id;
        const deletedproduct = await productModel.findOneAndDelete({ productId: pid })
        res.redirect('/trendingdrips/admin')
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/trendingdrips/cart/:id', async (req, res) => {
    try {
        let unm = req.params.id;
        let u = await registerModel.find({ username: unm });
        let uid = u[0]._id;

        const allproducts = await cartModel.find({ userId: uid })
        console.log(allproducts);

        res.render('cart', { "a": allproducts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



app.get('/trendingdrips/addcart/:pid/:user', async function (req, res) {
    let pid = req.params.pid;
    let unm = req.params.user;

    const user = await registerModel.find({ username: unm });
    const uId = user[0]._id;
    const u = user[0].username;


    const product = await productModel.find({ productId: pid });
    const proImg = product[0].productImg;
    const proName = product[0].productName;
    const proPrice = product[0].productPrice;

    console.log(proImg);
    console.log(proName);
    console.log(proPrice);

    const addingcart = await cartModel.create({
        userId: uId,
        productImg: proImg,
        productName: proName,
        productPrice: proPrice
    })
    res.redirect('/trendingdrips/cart/' + u)
})

app.get('/trendingdrips/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    })
})

app.listen(3000)