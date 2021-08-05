import Firebase from "firebase";
import { useState } from 'react'
import TrainsPanel from "../CTC/TrainsPanel";
var trackLayout = require("../CTC/TrackLayout.json");

function makeTrainSim(newTrainId) {
    
    var train = {};
    train.trainId = newTrainId;
    train.velocity = 0;
    train.setpointspeed = 0;
    train.speedlimit = 0;
    train.sbrakestatus = false;
    train.ebrakestatus = false;
    train.brakefailure = false;
    train.enginefailure = false;
    train.signalfailure = false;
    train.kp = 35;
    train.ki = 1;
    train.ek = 0;
    train.ekm1 = 0;
    train.uk = 0;
    train.ukm1 = 0;
    train.manualmode = false;
    train.power = 0;
    train.authority = false;

    Firebase.database().ref(`/TrainList/${newTrainId}/Velocity`).on('value', snapshot => { train.velocity = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/SetpointSpeed`).on('value', snapshot => { train.setpointspeed = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/SpeedLimit`).on('value', snapshot => { train.speedlimit = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/SBrakeStatus`).on('value', snapshot => { train.sbrakestatus = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/EBrakeStatus`).on('value', snapshot => { train.ebrakestatus = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/BrakeFailure`).on('value', snapshot => { train.brakefailure = snapshot.val(); });    
    Firebase.database().ref(`/TrainList/${newTrainId}/EngineFailure`).on('value', snapshot => { train.enginefailure = snapshot.val(); });    
    Firebase.database().ref(`/TrainList/${newTrainId}/SignalFailure`).on('value', snapshot => { train.signalfailure = snapshot.val(); });  
    Firebase.database().ref(`/TrainList/${newTrainId}/Line`).on('value', snapshot => { train.line = snapshot.val(); });        
    Firebase.database().ref(`/TrainList/${newTrainId}/CurrentBlock`).on('value', snapshot => {
         train.block = snapshot.val();
         Firebase.database().ref(`/${train.line}/${train.block}/Authority`).once('value', (snapshot) => {
             train.blockauthority = snapshot.val();
         });
         });
    
    
    // Firebase.database().ref(`/TrainList/${newTrainId}/BlockAuthority`).on('value', snapshot => { train.blockauthority = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Kp`).on('value', snapshot => { train.kp = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Ki`).on('value', snapshot => { train.ki = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ek`).on('value', snapshot => { train.ek = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ekm1`).on('value', snapshot => { train.ekm1 = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/uk`).on('value', snapshot => { train.uk = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ukm1`).on('value', snapshot => { train.ukm1 = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/ManualMode`).on('value', snapshot => { train.manualmode = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Power`).on('value', snapshot => { train.power = snapshot.val(); });

    console.log('Preconversion velocity: ', train.velocity, train.trainId);
    train.velocity = train.velocity / 2.237;
    console.log('Postconversion velocity: ', train.velocity, train.trainId);
    train.setpointspeed = train.setpointspeed = 2.237;

    train.calculatePower = function () {

        console.log(`--- CALCULATING POWER: ${train.trainId} ---`)
        let powermax = 120;
        let anyfailure = !train.blockauthority /*|| train.sbrakestatus*/ || train.ebrakestatus || train.brakefailure || train.enginefailure || train.signalfailure;
        if(anyfailure){
            console.log(train.blockauthority);
            console.log(train.sbrakestatus);
            console.log(train.ebrakestatus);
            console.log(train.brakefailure);
            console.log(train.enginefailure);
            console.log(train.signalfailure);
            train.power = 0;
            train.sbrakestatus = 1;
            console.log('Power set low (0)')
        }
        else{
            console.log('- ek: ', train.ek);
            console.log('- ekm1: ', train.ekm1);
            console.log('- uk: ', train.uk);
            console.log('- ukm1: ', train.ukm1);
            console.log('- velocity:', train.velocity);
            train.sbrakestatus = 0;
            if(train.manualmode){
                train.ek = train.setpointspeed - train.velocity
            }
            else{
                train.ek = train.speedlimit - train.velocity
            }
            if(train.power < powermax){
                train.ukm1 = train.uk;
                train.uk = train.ukm1 + 0.5 * (train.ek + train.ekm1)
            }
            else{
                train.ukm1 = train.uk;
                train.uk = train.ukm1;
            }
            train.ekm1 = train.ek;
            train.power = (train.kp * train.ek) + (train.ki * train.uk);
            if(train.power > powermax){
                train.power = powermax;
            }
            else if(train.power < 0){
                train.power = 0;
            }
            console.log('+ ek: ', train.ek);
            console.log('+ ekm1: ', train.ekm1);
            console.log('+ uk: ', train.uk);
            console.log('+ ukm1: ', train.ukm1);
            console.log('+ velocity:', train.velocity);
            console.log('Power Calculation: ', train.power)
            Firebase.database().ref(`/TrainList/${train.trainId}/ek`).set(train.ek);
            Firebase.database().ref(`/TrainList/${train.trainId}/ekm1`).set(train.ekm1);
            Firebase.database().ref(`/TrainList/${train.trainId}/uk`).set(train.uk);
            Firebase.database().ref(`/TrainList/${train.trainId}/ukm1`).set(train.ukm1);
        }
        Firebase.database().ref(`/TrainList/${train.trainId}/Power`).set(train.power);
        Firebase.database().ref(`/TrainList/${train.trainId}/SBrakeStatus`).set(train.sbrakestatus);
    }

    return train;
}

export default makeTrainSim;
