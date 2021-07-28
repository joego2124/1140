import Firebase from "firebase";
import { useState } from 'react'
var trackLayout = require("../CTC/TrackLayout.json");

function makeTrainSim(newTrainId) {
    var train = {};
    train.trainId = newTrainId;
    // create temps for variables used in power calculation

    Firebase.database().ref(`/TrainList/${newTrainId}/Power`).on('value', snapshot => { train.power = snapshot.val(); });
    // pull all variables from above from the firebase

    train.calculatePower = function () {
      
    }

    return train;
}

export default makeTrainSim;
// export default {trainId, setTrainId, simulateTrain};