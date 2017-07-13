const express = require("express");
const path = require("path");
const app = express();

// const bodyParser = require('body-parser');
// const api = require('./server/routes/api');

// Parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

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
