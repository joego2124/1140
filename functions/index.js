const functions = require("firebase-functions");
const admin = require('firebase-admin');

//import from individual files
const trainModel = require('./TrainModelFunctions')

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
exports.physicsTick = trainModel.physicsTick;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
// exports.trainConsoleTest = trainModel.trainConsoleTest;

<<<<<<< HEAD
=======
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

	

  response.send("Hello from Firebase!");
});
>>>>>>> update-track-view
