const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const admin = require("firebase-admin");

// const bodyParser = require('body-parser');
// const api = require('./server/routes/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const serviceAccount = require("./onelegacy-f0695-firebase-adminsdk-tgt8l-64f5135516.json")

// const urlencodeParser = bodyParser.urlencoded({ extended: false })
// var jsonParser = bodyParser.jsonParser()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onelegacy-f0695.firebaseio.com/"
})

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// app.use('/api', api)

function redirectRouter(req, res) {
  res.sendFile("index.html", { root: './dist'})
}
app.use(redirectRouter);

// app.get('/*', (req, res) => {
//     res.sendFile("index.html", { root: './dist'})
// });
app.listen(process.env.PORT || 8080);
