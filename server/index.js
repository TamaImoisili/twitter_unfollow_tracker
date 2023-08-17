const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');

// REQUIRED: for reading .env file
require('dotenv').config();

const Strategy = require('passport-twitter').Strategy;

var app = express();

const port = process.env.PORT || 3030;
var whitelistUrls = ['http://localhost:8080/']
// Configure sessions and passport
  app.use(
    cors({
      origin: whitelistUrls,
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
      ],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
    })
  );
app.use(logger('dev'));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());

const twitterConsumerKey = process.env.CONSUMER_KEY || "";
const twitterConsumerSecret = process.env.CONSUMER_SECRET || "";

passport.use(new Strategy({
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterConsumerSecret,
    callbackURL: `http://localhost:3030/twitter/return`

}, function (token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function (user, callback) {
    callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
})
app.get('/health', (req, res) => {
    res.send('Server is up and running');
});
app.get('/sign-in', (req, res) => {
    console.log("failure redirecting user...")
    res.redirect('http://localhost:8080/#/sign-in');
});
app.get('/home', (req, res) => {
    console.log("home redirecting user...")
    res.redirect('http://localhost:8080/#/home');
});
app.get('/', (req, res) => {
    console.log("Redirecting user...")
    res.redirect('http://localhost:8080/#');
});

app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter', {
    failureRedirect: '/sign-in'
}), function (req, res) {
    // Send a message to the client-side code in the popup window
    //console.log("return redirecting user...")
    res.redirect('/home');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});