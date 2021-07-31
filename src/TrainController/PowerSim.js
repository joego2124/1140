import Firebase from "firebase";
import { useState } from 'react'
var trackLayout = require("../CTC/TrackLayout.json");

function makeTrainSim(newTrainId) {
    var train = {};
    train.trainId = newTrainId;
    train.velocity = 0;
    train.setpointspeed = 0;
    train.kp = 35;
    train.ki = 1;
    train.ek = 0;
    train.ekm1 = 0;
    train.uk = 0;
    train.ukm1 = 0;
    train.manualmode = false;
    train.power = 0;
    train.authority = 0;

    Firebase.database().ref(`/TrainList/${newTrainId}/Velocity`).on('value', snapshot => { train.velocity = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/SetpointSpeed`).on('value', snapshot => { train.setpointspeed = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Authority`).on('value', snapshot => { train.authority = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Kp`).on('value', snapshot => { train.kp = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Ki`).on('value', snapshot => { train.ki = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ek`).on('value', snapshot => { train.ek = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ekm1`).on('value', snapshot => { train.ekm1 = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/uk`).on('value', snapshot => { train.uk = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ukm1`).on('value', snapshot => { train.ukm1 = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ManualMode`).on('value', snapshot => { train.manualmode = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Power`).on('value', snapshot => { train.power = snapshot.val(); });

    train.velocity = train.velocity / 2.237;
    train.setpointspeed = train.setpointspeed = 2.237;

    train.calculatePower = function () {

        let powermax = 120;

        if(train.authority == 0){
            train.power = 0;
        }
        else if(train.manualmode == true){
            if(train.power < powermax){
                train.ukm1 = train.uk;
                train.uk = train.ukm1 + 0.5 * (train.ek + train.ekm1)
            }
            else if(train.power >= powermax){
                train.ukm1 = train.uk;
                train.uk = train.ukm1;
            }
            train.power = (train.Kp * train.ek) + (train.Ki * train.uk);
            Firebase.database().ref(`/TrainList/${this.trainId}/Power`).set(100);
        }
        else if(train.manualmode == false){
            if(train.power < powermax){
                train.ukm1 = train.uk;
                train.uk = train.ukm1 + 0.5 * (train.ek + train.ekm1)
            }
            else if(train.power >= powermax){
                train.ukm1 = train.uk;
                train.uk = train.ukm1;
            }
            train.power = (train.Kp * train.ek) + (train.Ki * train.uk); 
            Firebase.database().ref(`/TrainList/${this.trainId}/Power`).set(50);
        }
    }

    return train;
}

export default makeTrainSim;
