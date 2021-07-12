const functions = require("firebase-functions");
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.firstFunction = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;

    var array = [];
    var f1 = "(function hello(a,b) { return a+b;})";
    var f2 = "(function goodbye(a,b) { return a-b;})";

    var num1 = 1;
    var num2 = 2;

    array.push(eval(f1));
    array.push(eval(f2));

    var ref = admin.database().ref("test");
    var childRef = ref.push();

    while(true)
    {
        var c = 0;
        array.forEach(e => c += e(num1,num2));

        childRef.set({
            title: "dbWrite",
            value: c
        });
        num1 += 2;
        num2 += 5;
    }

    res.json({result: c});
})