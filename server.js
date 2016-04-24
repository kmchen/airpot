var express     = require('express')
var mongoose   = require('mongoose');

var Review = require('./app/models/reviews');

var app = express();

// set port
var port = process.env.port || 8080;

var router = express.Router();

// Middleware
//router.use(function(req, res, next) {
  //console.log('Something is happending');
  //next();
//})

// Test route
router.get('/', function(req, resp) {
  resp.json({status: 'OK'});
})
//
// Register routes prefixed with api
app.use('/api', router);


// /api/all/stats
router.route('/all/stats')
  .get(function(req, res) {
    Review.find(function(err, reviews) {
      if (err)
        console.log('--------------- error')
      console.log('--------------- helloworld', reviews)
      res.json(reviews);
    }); 
  });

// Setup DB
mongoose.connect('mongodb://localhost/airport');
var db = mongoose.connection;
db.once('open', function() {
    // we're connected!
    console.log('We are connected!!')
});

app.listen(port);
console.log('server starts on port ', port)
