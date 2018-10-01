const Review = require('../models/review');
const mongoose = require('mongoose');
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

module.exports = function(app, Review) {

  app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
      })
      .catch(err => {
        console.log(err);
      });
  });

}
module.exports = Review;
