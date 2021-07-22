const functions = require("firebase-functions");
const admin = require('firebase-admin');

//import from individual files
const trainModel = require('./TrainModelFunctions')

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
// exports.physicsTick = trainModel.physicsTick;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
exports.trainAdded = trainModel.trainAdded;
exports.trainRemoved = trainModel.trainRemoved;
// exports.trainConsoleTest = trainModel.trainConsoleTest;

