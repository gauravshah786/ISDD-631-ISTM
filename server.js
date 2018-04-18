var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;
// var router = express.Router();

// var path = __dirname + '/views/';
// app.use('/',router);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/',function(req, res){
  res.render('index');
});

app.get('/about',function(req, res){
  res.render('about');
});

app.get('/checkout',function(req, res){
  res.render('checkout');
});

app.get('/contact',function(req, res){
  res.render('contact');
});

app.get('/edit-profile',function(req, res){
  res.render('edit-profile');
});

app.get('/forget-password',function(req, res){
  res.render('forget-password');
});

app.get('/login',function(req, res){
  res.render('login');
});

app.get('/menu-detail',function(req, res){
  res.render('menu-detail');
});

app.get('/menu-grid',function(req, res){
  res.render('menu-grid');
});

app.get('/order-history',function(req, res){
  res.render('order-history');
});

app.get('/register',function(req, res){
  res.render('register');
});

app.get('/reset-password',function(req, res){
  res.render('reset-password');
});

app.get('/shopping-cart',function(req, res){
  res.render('shopping-cart');
});

app.get('/user-profile',function(req, res){
  res.render('user-profile');
});

app.get('*', function(req, res){
  res.render('error-page');
});

// app.post('/login',function(req,res){
//
// });
//
// app.post('/register', function(req,res){
//
// });

// app.get('*', function(req, res){
//   res.render('error-page');
// });

  app.listen(port, function () {
  console.log('app is running on port:', port);
});
