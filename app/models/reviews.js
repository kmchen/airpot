var mongoose  = require('mongoose');

var Schema    = mongoose.Schema;

var ReviewSchema = new Schema({
  airport_name: String,
  link: String,
  title: String,
  author: String,
  author_country: String,
  date: String,
  content: String,
  experience_airport: String,
  date_visit: String,
  type_traveller: String,
  overall_rating: Number,
  queuing_rating:Number,
  terminal_cleanliness_rating: Number,
  terminal_seating_rating: Number,
  terminal_signs_rating: Number,
  food_beverages_rating: Number,
  airport_shopping_rating: Number,
  wifi_connectivity_rating: Number,
  airport_staff_ratingL: Number,
  recommended: Number,
}, { collection: 'review' })

module.exports = mongoose.model('Review', ReviewSchema);

// TODO : to be removed
//{ "_id" : ObjectId("571cb45d81b51c656449ab01"), "airport_name" : "aberdeen-airport", "link" : "/airport-reviews/aberdeen-airport", "title" : "Aberdeen Airport customer review", "author" : "Justin Johnson", "author_country" : "United Kingdom", "date" : "2014-09-06", "content" : "As a regular user of Aberdeen airport I can safely say its one of the worse airports I have experienced the toilets airside are disgusting and usually smell quite appalling also the Servisair lounge is extremely poor and the choice of snacks / food is very basic considering the amount of footfall and the claim of Numberernational status it is extremely poor. Security and baggage reclaim is inefficient and far too small.", "experience_airport" : "", "date_visit" : "", "type_traveller" : "", "overall_rating" : 2, "queuing_rating" : 2, "terminal_cleanliness_rating" : 3, "terminal_seating_rating" : "", "terminal_signs_rating" : "", "food_beverages_rating" : "", "airport_shopping_rating" : 2, "wifi_connectivity_rating" : "", "airport_staff_rating" : "", "recommended" : 0 }
