const functions = require("firebase-functions");
const admin = require('firebase-admin');

//import from individual files
const trainModel = require('./TrainModelFunctions');
const trainControllerDriver = require('./TrainContollerFunctions');

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
// exports.physicsTick = trainModel.physicsTick;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
<<<<<<< HEAD
// exports.trainConsoleTest = trainModel.trainConsoleTest;

exports.waysideTick = wayside.runLogic;

=======
<<<<<<< HEAD
exports.onBrakeFailure = trainControllerDriver.onBrakeFailure;
exports.onEngineFailure = trainControllerDriver.onEngineFailure;
exports.onSignalFailure = trainControllerDriver.onSignalFailure;
exports.onIntTempChange = trainControllerDriver.onIntTempChange;
exports.onDoorOpen = trainControllerDriver.onDoorOpen;
exports.onSetpointSpeed = trainControllerDriver.onSetpointSpeed;

=======
exports.trainAdded = trainModel.trainAdded;
exports.trainRemoved = trainModel.trainRemoved;
>>>>>>> 5456021fd7c56adc0a6beaa4774495907b5c49d6
// exports.trainConsoleTest = trainModel.trainConsoleTest;

>>>>>>> 7ebf5c9aa28e20ec40995a3bf1556ecc5087de80
