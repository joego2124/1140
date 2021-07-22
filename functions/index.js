const functions = require('firebase-functions');
const admin = require('firebase-admin');

//import from individual files
const trainModel = require('./TrainModelFunctions');
const trainControllerDriver = require('./TrainContollerFunctions');

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
// exports.physicsTick = trainModel.physicsTick;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
// exports.trainConsoleTest = trainModel.trainConsoleTest;

exports.waysideTick = wayside.runLogic;
exports.onBrakeFailure = trainControllerDriver.onBrakeFailure;
exports.onEngineFailure = trainControllerDriver.onEngineFailure;
exports.onSignalFailure = trainControllerDriver.onSignalFailure;
exports.onIntTempChange = trainControllerDriver.onIntTempChange;
exports.onDoorOpen = trainControllerDriver.onDoorOpen;
exports.onSetpointSpeed = trainControllerDriver.onSetpointSpeed;

exports.trainAdded = trainModel.trainAdded;
exports.trainRemoved = trainModel.trainRemoved;
// exports.trainConsoleTest = trainModel.trainConsoleTest;
