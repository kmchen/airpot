var express    = require('express')
var mongoose   = require('mongoose');

var Constant  = require('./app/constant');
var Router  = require('./app/router');

var app = express();

// Register routes prefixed with api
app.use('/api', Router);

// Mongo setup and sanity check
mongoose.connect(Constant.mongo.endpoint);
var db = mongoose.connection;
db.once('open', function() {
    console.log('Successfully connected to MongoDB on port')
});
db.on('error',
    console.error.bind(console, 'connection error:')
);

app.listen(Constant.port);
console.log('server starts on port ', Constant.port)
