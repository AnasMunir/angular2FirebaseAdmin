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
    databaseURL: "https://onelegacy-f0695.firebaseio.com/",
    storageBucket: "gs://onelegacy-f0695.appspot.com/"
})

const db = admin.database();

var ref = db.ref('/users/');
ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});

function handleError(error) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}
/* GET api listing. */
router.get('/test', (req, res) => {
    console.log("******* Api Works *******");
    res.status(200).send('api works');
});

router.get("/users", function (req, res) {
    // res.json({
    //     message: `You're logged in as with Firebase UID: Anas`
    // });
    db.ref("/users/")
    ref.once("value").then((data => data))
    ref.once("value", (snapshot) => {
        console.log(snapshot);
        // res.status(200).json(snapshot)
        res.status(200).send(snapshot)
    }).catch(error => {
        handleError(error)
    });
});

router.post('/delete_video', (req, res) => {
    console.log('data recieved: ', req.body);
    console.log(req.body);
    let uid = req.body.uid;
    let videoKey = req.body.videoKey;
    let storageNumber = req.body.storageNumber;
    console.log("uid: " + uid);
    console.log('videoKey: ' + videoKey);
    console.log("storageNumber: " + storageNumber);

    db.ref('/users/' + uid + '/videos/' + videoKey).remove()
        .then(
        () => {
            let object = { message: "video successfully deleted", data: "heelo its me" };
            console.log(object);
            res.status(200).send(200, { message: "video successfully deleted", data: "heelo its me" });
            res.status(200).send(JSON.stringify(object));
        }
        )
        .catch(
        (error) => {
            console.assert(error);
            handleError(error)
        }
        )
    res.status(200).send(db.ref('/users/' + uid + '/videos/' + videoKey).remove());
})

module.exports = router;