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

const updateSuggestedAuthority = (database, line) => {
  //iterate through all trains and recalculate suggested authority
  return database.ref(`/TrainList`).once('value').then(trainListSnapshot => {
    const trainListObj = trainListSnapshot.val();
  
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
    let lineLayout = [];
    trackLayout[`${line.toLowerCase().includes("red") ? "red" : "green"}Line`].forEach(block => {
      if (block.blockId % 1 == 0) {
        lineLayout.push({
          blockId: block.blockId < 0 ? 0 : block.blockId,
          authority: (authorizedBlocks.find(v => v == block.blockId) != undefined ? 1 : 0),
        });
      }
    });

    console.log(`[Functions/updateSuggestedAuthority] Train Suggested Authority Updated`);
    database.ref(`/CTC/SuggestedAuthority/${line}`).set(lineLayout);
  });
}

exports.onCTCTrainCurrentBlockChange = functions.database.ref('/TrainList/{trainId}/CurrentBlock').onUpdate((change, context) => {
  const database = admin.database();

  const after = change.after.val();
  const trainId = context.params.trainId;

  return database.ref(`/TrainList/${trainId}`).once('value').then(trainSnapshot => {
    const train = trainSnapshot.val();
    console.log(`[Functions/onCTCTrainCurrentBlockChange] Train ${trainId} moved to , block ${train.CurrentBlock} on ${train.LineName}, target block: ${train.Route[train.RouteIndex + 1]}`);

    //increment train route index
    database.ref(`/TrainList/${trainId}`).set({...train, RouteIndex: train.RouteIndex + 1});

    updateSuggestedAuthority(database, train.Line);
  });
});

exports.onCTCNewTrain = functions.database.ref('/TrainList/{trainId}').onCreate(snapshot => {
  const train = snapshot.val(); 
  console.log(`[Functions/onCTCTrainCurrentBlockChange] Train ${train.TrainId} created on ${train.Line}`);
  return updateSuggestedAuthority(admin.database(), train.Line);
});
