const functions = require('firebase-functions');
const admin = require('firebase-admin');

//import from individual files
const wayside = require('./WaysideFunctions');
const trainModel = require('./TrainModelFunctions');
const trainControllerDriver = require('./TrainContollerFunctions');

var trackLayout = require("./TrackLayout.json");

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
exports.trainAdded = trainModel.trainAdded;
exports.trainRemoved = trainModel.trainRemoved;

exports.waysideTick = wayside.runLogic;
exports.onBrakeFailure = trainControllerDriver.onBrakeFailure;
exports.onEngineFailure = trainControllerDriver.onEngineFailure;
exports.onSignalFailure = trainControllerDriver.onSignalFailure;
exports.onIntTempChange = trainControllerDriver.onIntTempChange;
exports.onDoorOpen = trainControllerDriver.onDoorOpen;
exports.onSetpointSpeed = trainControllerDriver.onSetpointSpeed;


exports.onCTCTrainCurrentBlockChange = functions.database.ref('/TrainList/{trainId}/CurrentBlock').onUpdate((change, context) => {
  const database = admin.database();

  const after = change.after.val();
  const trainId = context.params.trainId;

  return database.ref(`/TrainList/${trainId}`).once('value').then(trainSnapshot => {

    //increment train route index
    const train = trainSnapshot.val();
    database.ref(`/TrainList/${trainId}`).set({...train, RouteIndex: train.RouteIndex + 1});

    //iterate through all trains and recalculate suggested authority
    return database.ref(`/TrainList`).once('value').then(trainListSnapshot => {
      const trainListObj = trainListSnapshot.val();
      
      const newRouteIndex = train.RouteIndex + 1;
      let authorizedBlocks = [];
      
      //iterate through all trains and get authorized blocks for that train
      for (const [trainId, train] of Object.entries(trainListObj)) {
        for (let i = train.RouteIndex; i < train.RouteIndex + 3; i++) {
          if (i < train.Route.length) {
            authorizedBlocks.push(train.Route[i]); //add authorized block's blockId to array
          }
        }
      }
      
      //convert authorized blocks to lineLayout format
      let lineLayout = trackLayout[train.Line + "Line"].map(block => {
        return {
          blockId: block.blockId,
          authority: (authorizedBlocks.find(v => v == block.blockId) != undefined ? 1 : 0),
        }
      });
  
      console.log(lineLayout);
      database.ref(`/CTC/SuggestedAuthority`).set(lineLayout);
    });
  });
});
