const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 4500;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo= require('./config/mongodb');
const users = require('./routes/users');
// const yummly = require('/yummly_api/yummly');


//Middleware, body parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//Middleware, cors
app.use(cors());

//Middleware passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


//set static folder
app.use(express.static(path.join(__dirname, 'client')));

//connects data base: Mongodb
mongoose.connect(mongo.host);

//lets us know if mongo is connected
mongoose.connection.on('connected', () => {
    console.log('connected to datatbase' + mongo.host);
} );

//on error
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err);
} );



app.use('/users', users);

//route to homepage
app.get('/', (req, res) => {
    res.send('html will go here');
});

//starts server.
app.listen(port, () => {
    console.log('Server started on port' + port);
});
