const functions = require("firebase-functions");
const admin = require('firebase-admin');

//import from individual files
const trainModel = require('./TrainModelFunctions')
const wayside = require('./WaysideFunctions')

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
exports.physicsTick = trainModel.physicsTick;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
// exports.trainConsoleTest = trainModel.trainConsoleTest;

exports.waysideTick = wayside.runLogic;

