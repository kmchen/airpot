var express    = require('express');

var Router = express.Router();

// /api/all/stats returns a collection of all airports stats ordered by review count
// each item in the collection should have:
// - Airport name
// - Reviews count  
Router.route('/all/stats')
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
// - Airport name
// - Reviews count  
// - Average overall_rating
// - count of recommendations “recommended”
Router.route('/:airport/stats')
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
      function(err, results) {
        if (err)
          console.error('Fail to query /api/'+ req.params.airpot+'/stats', err);
        var r = results[0]
        r.avg_overall_rating = r.avg_overall_rating.toFixed(2)
        res.json(r);
      }
    );
  });

// api/[airport]/reviews returns a collection  of  reviews ordered by date 
// The latest review is  returned  as  first element 
// each review should have the following information:    
// - overall_rating  
// - recommendation
// - date
// - author_country
// - content
Router.route('/:airport/reviews')
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

module.exports = Router;
