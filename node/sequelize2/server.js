const express = require('express');
const sequelize = require('./config/database');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// imported routes
const citiesRoute = require('./routes/cities');
const countriesRoute = require('./routes/countries');
const statesRoute = require('./routes/states');
const usersRoute = require('./routes/users')

// use routes
app.use('/api/country' , countriesRoute);
app.use('/api/state' , statesRoute);
app.use('/api/city' , citiesRoute);
app.use('/api/user' , usersRoute);


const PORT = process.env.PORT || 4000 ; 

sequelize.authenticate()
    .then(()=>{
        console.log('Database connected.....');
        app.listen(PORT , ()=>{
            console.log(`port is running on ${PORT} `);
        })
    })
    .catch( err =>{
        console.log('Error:' + err);
    })

