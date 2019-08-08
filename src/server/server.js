const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const {resolve} = require('path');
const fs = require('fs');
const path = require('path');
const withAuth = require('./middleware');
const cookieParser = require('cookie-parser');


const config = {
    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/gallery',
    port: 8000
};

//setup database
mongoose.Promise = global.Promise;
// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.mongoURL, {useNewUrlParser: true}, (error) => {
        if (error) {
            console.error('Please make sure Mongodb is installed and running!');
            throw error;
        } else console.log('connected to database!');
    });
}


const app = express();

//body parser for json. must be done before API routes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //handle body requests
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// Add backend api routes
fs.readdirSync(__dirname + '/api').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
});


app.listen(config.port || 8000,
    () => console.log(`Listening on port ${process.env.PORT || 8000}!`));
