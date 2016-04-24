var express    = require('express')
var mongoose   = require('mongoose');

var Review    = require('./app/models/reviews');
var Constant  = require('./app/constant');

var app = express();

// set port
var port = process.env.port || 8080;

var router = express.Router();

// Middleware
//router.use(function(req, res, next) {
  //console.log('Something is happending');
  //next();
//})

// /api/all/stats returns a collection  of  all airports  stats,  
// the collection  should  be  ordered by  the count of  reviews
// each  item  in  the collection  should  have  the following information:    
// - names of  the airport 
// - count of  reviews in  system  
router.route('/all/stats')
  .get(function(req, res) {
    Review.aggregate([
      {$group: {_id: "$airport_name", review_count: {$sum: 1}}},
      {$project : { _id : 0 , airport_name: "$_id" , review_count : 1 }}],
      // Sorting pipeline
      //{ "$sort": { "airport_name": -1 } },
      // Optionally limit results
      //{ "$limit": 5 }
      function(err, result) {
        if (err)
          console.error('Fail to query /api/all/stats', err)
        res.json(result)
      }
    );
  });

// api/[airport]/stats returns some stats for a specific  airport
// - airport name, 
// - count of reviews,
// - average “overall_rating”  
// - count of recommendations “recommended”
router.route('/:airport/stats')
  .get(function(req, res) {
    Review.aggregate([
      {$match: {  airport_name: req.params.airport}},
      {$group: {  _id: "$airport_name",
                  avg_overall_rating: { $avg: '$overall_rating' },
                  recommended_cnt: {$sum: { $cmp: [ "$recommended", 0 ]}},
                  review_cnt: {$sum: 1}}},
      {$project : { _id : 0 ,
                    airport_name: "$_id",
                    avg_overall_rating: 1,
                    recommended_cnt: 1,
                    review_cnt : 1 }}],
      function(err, result) {
        if (err)
          console.error('Fail to query /api/'+ req.params.airpot+'/stats', err);
        res.json(result);
      }
    );
  });

// api/[airport]/reviews returns a collection  of  reviews ordered by date
// The latest  review  is  returned  as  first element 
// each  review  in  the collection  should  have  the following information:    
// - overall_rating  
// - recommendation
// - date
// - author_country
// - content
router.route('/:airport/reviews')
  .get(function(req, res) {
    Review.aggregate([
      {$match: {  airport_name: req.params.airport}},
      {$sort: {date: -1}},
      {$project : { _id : 0 ,
                    date: 1,
                    content: 1,
                    author_country: 1,
                    recommended: 1,
                    overall_rating: 1}}],
      function(err, result) {
        if (err)
          console.error('Fail to query /api/'+ req.params.airpot+'/reviews', err);
        res.json(result);
      }
    );
  });

// Register routes prefixed with api
app.use('/api', router);

// Mongo setup and sanity check
mongoose.connect(Constant.mongo.endpoint);
var db = mongoose.connection;
db.once('open', function() {
    console.log('Successfully connected to MongoDB on port')
});
db.on('error',
    console.error.bind(console, 'connection error:')
);

app.listen(port);
console.log('server starts on port ', port)
