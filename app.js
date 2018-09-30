const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home', { msg: 'Hello World!' });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
