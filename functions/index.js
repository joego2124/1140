const functions = require("firebase-functions");
const admin = require('firebase-admin');

//import from individual files
const trainModel = require('./TrainModelFunctions')

var trackLayout = require("./TrackLayout.json");

//imports from train model
exports.onEDoorUpdate = trainModel.onEDoorUpdate;
exports.physicsTick = trainModel.physicsTick;
exports.changeTrainLength = trainModel.changeTrainLength;
exports.changePassengers = trainModel.changePassengers;
// exports.trainConsoleTest = trainModel.trainConsoleTest;

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
        for (let i = train.RouteIndex; i < train.RouteIndex + 2; i++) {
          if (i < train.Route.length) {
            authorizedBlocks.push(train.Route[i]); //add authorized block's blockId to array
          }
        }
      }
      console.log(authorizedBlocks);
      //convert authorized blocks to lineLayout format
      let lineLayout = trackLayout[train.Line + "Line"].map(block => {
        return {
          blockId: block.blockId,
          authority: (authorizedBlocks.find(v => v == block.blockId) != undefined ? 1 : 0),
        }
      });
  
      database.ref(`/CTC/SuggestedAuthority`).set(lineLayout);
    });
  });
});