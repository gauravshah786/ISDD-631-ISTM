var express = require('express');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');
require('dotenv').config();
admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
});

var db = admin.firestore();
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const getCartData = async (uid) => {
  const cartRef = db.collection('cart');
  const cartData = [];
  await cartRef.where('uid','==', uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const rec = doc.data();
          cartData.push({
            id:rec.id,
            qty:rec.qty,
            price:rec.price
          });
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
    return cartData;
}

app.get('/', async (req, res) => {
    res.render('index');
});

app.get('/checkout', async (req, res) => {
  const data = await getCartData(req.query.uid);
  res.render('checkout', {data});
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/shopping-cart', async (req, res) => {
    const data = await getCartData(req.query.uid);
    res.render('shopping-cart', {data});
});

app.get('/cartdata', async (req, res) => {
  const data = await getCartData(req.query.uid);
  res.send({data});
});

app.get('*', (req, res) => {
  res.render('error-page');
});

app.listen(port, () => {
  console.log('app is running on port:', port);
});
