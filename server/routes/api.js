const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const admin = require("firebase-admin");
// const stripe = require("stripe")("sk_test_jehay9rajNW6wTgBygvKygXr");

const serviceAccount = require("./onelegacy-f0695-firebase-adminsdk-tgt8l-64f5135516.json")

// const urlencodeParser = bodyParser.urlencoded({ extended: false })
// var jsonParser = bodyParser.jsonParser()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onelegacy-f0695.firebaseio.com/"
})

const db = admin.database();
var ref = db.ref('/users/');
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
/* GET api listing. */
router.get('/test', (req, res) => {
    res.status(200).send('api works');
});

router.get("/users", function (req, res) {
    ref.once("value", (snapshot) => {
        console.log(snapshot.val());
        // res.status(200).json(snapshot)
        res.status(200).send(json(snapshot.val()))
    }).catch(error => {
        handleError(res, error, "firebase faliure")
    });
});

module.exports = router;