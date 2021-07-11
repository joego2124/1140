const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.firstFunction = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;

    var b = eval('if (1) {10} else {20}');

    

    res.json({result: b});
})