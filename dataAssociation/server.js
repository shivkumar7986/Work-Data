const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const userModel = require('./model/user');
const postModel = require('./model/posts');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('home')  
})

app.post('/register', async (req, res) => {
    let { username, name, email, age, password } = req.body;

    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send('user already registered!!!!');

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                email,
                age,
                password: hash
            })

            let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
            res.cookie('token', token);
            res.send('registered succesfully');
        })
    })

})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    
    if (!user) return res.status(404).send('somthing went wrong');

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
            res.cookie('token', token);
            return res.redirect('/profile')
        }
        else res.redirect('/login')
    })
})


app.get('/profile', isLoggedIn, async function (req, res) {
    
 let user = await userModel.findOne({email: req.user.email});
  
 let userPosts = await postModel.find({user: user._id})
    console.log(userPosts);
    res.render('profile', {user , userPosts});
})

app.post('/post', isLoggedIn, async function (req, res) {
   try{
    let user = await userModel.findOne({ email: req.user.email });
    let {content} = req.body;

    let post = await postModel.create({
        user: user._id,
        content
    })
    
    user.post.push(post._id);
    await user.save();

    
    res.redirect('/profile')
   }
   catch (err){
    console.log("Error :" ,err );
   }
})

app.get('/like/:id' , isLoggedIn , async function(req,res){

    let post = await postModel.findOne({_id: req.params.id});
    if(post.likes.indexOf(req.user.userid) === -1){
        post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1 )
    }

    await post.save();

    // console.log(post);
    
    res.redirect('/profile');
})

app.get('/logout', (req, res) => {
    res.cookie("token", '');
    res.redirect('/login')
})

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.send("you must be logged in ");
    else {
        let data = jwt.verify(req.cookies.token, 'shhhh')
        req.user = data;
        next();
    }

}

app.listen(4000, () => {
    console.log('port listening on 3000');
})