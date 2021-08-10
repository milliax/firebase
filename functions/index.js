const functions = require("firebase-functions");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const query = require('./routes/query.js')
const add = require('./routes/add.js')
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://remote.sivir.pw:3000,https://sivir.pw');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
// use routes
app.use("/q", query);
app.use("/add", add);

exports.redirect = functions
    .https.onRequest(app);
