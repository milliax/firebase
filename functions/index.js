const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });

const express = require("express");
const app = express();

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const query = require('./routes/query.js')
const add = require('./routes/add.js')

// use routes
app.use("/q", query);
app.use("/add", add);

exports.redirect = functions
    .https.onRequest(app);
