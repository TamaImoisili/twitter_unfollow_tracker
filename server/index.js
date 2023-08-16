var express = require('express');
const cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
const { Strategy } = require('passport-twitter').Strategy;

var app = express();

// Configure sessions and passport
app.use(cors);
app.use(logger('dev'));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());


passport.use(new Strategy({
    consumerKey: "OpTuNjEA5599zJ4PP4No9jyit",
    consumerSecret: "GoKvk0dvIJFkrtqdcuLVq9oZkNM2WUdLDKZvVU4ycDkz3keRVV",
    callbackURL: 'http://localhost:3000/twitter/return'

}, function (token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function (user, callback) {
    callback(null, user);
})

passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
})

app.get('/sign-in', (req, res) => {
    res.redirect('http://localhost:4200/sign-in');
});
app.get('/home', (req, res) => {
    res.redirect('http://localhost:4200/home');
});
app.get('/', (req, res) => {
    res.redirect('http://localhost:4200/');
});

app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/return', passport.authenticate('twitter', {
    failureRedirect: '/sign-in'
}), function (req, res) {
    // Send a message to the client-side code in the popup window
    res.send('<script>window.opener.postMessage("authenticated", "*");</script>');

    // Redirect the main window to the home page
    res.redirect('/home');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
