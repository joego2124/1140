import Firebase from "firebase";
import { useState } from 'react'
var trackLayout = require("../CTC/TrackLayout.json");

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function makeTrainSim(newTrainId) {
    var train = {};
    train.trainId = newTrainId;
    train.power = 0;
    train.acceleration = 0;
    train.velocity = 0;
    train.mass = 1;
    train.position = 0;
    train.sbrake = false;
    train.ebrake = false;
    train.line = 'GreenLine';
    train.blocknumber = 0;
    train.previousblocknumber = 0;
    train.blocklength = 0;
    train.grade = 0;
    train.switchstate = 0;

    Firebase.database().ref(`/TrainList/${newTrainId}/Power`).on('value', snapshot => { train.power = clamp(snapshot.val(), -120, 120); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Acceleration`).on('value', snapshot => { train.acceleration = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Velocity`).on('value', snapshot => { train.velocity = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Mass`).on('value', snapshot => { train.mass = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Position`).on('value', snapshot => { train.position = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/SBrakeStatus`).on('value', snapshot => { train.sbrake = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/EBrakeStatus`).on('value', snapshot => { train.ebrake = snapshot.val(); });

    Firebase.database().ref(`/TrainList/${newTrainId}/Line`).on('value', snapshot => { train.line = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/CurrentBlock`).on('value', snapshot => { train.blocknumber = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/PreviousBlock`).on('value', snapshot => { train.previousblocknumber = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/BlockLength`).on('value', snapshot => { train.blocklength = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Grade`).on('value', snapshot => { train.grade = snapshot.val(); });

    // train.simulateTrain = ( () => {
    //     console.log('simulating', this.trainId);
    // } );
    train.simulateTrain = function () {
<<<<<<< HEAD
            // console.log('simulating', this.trainId, Math.abs(this.velocity));
=======
            console.log('simulating', this.trainId, this.power);
>>>>>>> CTC

            if(this.ebrake == true) {
                //e brakes
                if(Math.abs(this.velocity) < 10){
                    Firebase.database().ref(`/TrainList/${this.trainId}/Velocity`).set(0);
                    Firebase.database().ref(`/TrainList/${this.trainId}/Acceleration`).set(0);
                } else {
                    //get sign of direction and set brake force in opposite direction
                    Firebase.database().ref(`/TrainList/${this.trainId}/Acceleration`).set( 
                        (this.velocity/Math.abs(this.velocity)) * -8.96 );
                }
            } else {
                if(this.sbrake == true){
                    //s brakes
                    if(Math.abs(this.velocity) < 4){
                        Firebase.database().ref(`/TrainList/${this.trainId}/Velocity`).set(0);
                        Firebase.database().ref(`/TrainList/${this.trainId}/Acceleration`).set(0);
                    } else {
                        //get sign of direction and set brake force in opposite direction
                        Firebase.database().ref(`/TrainList/${this.trainId}/Acceleration`).set( 
                            (this.velocity/Math.abs(this.velocity)) * -3.9 );
                    }
                } else {
                    //no brakes
                    console.log( 
                        ((this.power * 740)/(this.mass * (this.velocity != 0 ? this.velocity : 1) )) - (32.2 * Math.sin(this.grade)) );
                    Firebase.database().ref(`/TrainList/${this.trainId}/Acceleration`).set( 
                        ((this.power * 740)/(this.mass * (this.velocity != 0 ? this.velocity : 1) )) - (32.2 * Math.sin(this.grade)) );
                }
            }

            Firebase.database().ref(`/TrainList/${this.trainId}/Velocity`).set( 
                this.velocity + this.acceleration );

            Firebase.database().ref(`/TrainList/${this.trainId}/Position`).set( 
                this.position + this.velocity );


            //enter new block
            if(this.position > this.blocklength) {
                this.position = this.position % this.blocklength;
                // console.log('test');
                //get new block id


                //get signal state
                // var switchstate = 0;
                // console.log(this.blocknumber);
                Firebase.database().ref(`/${this.line}/${this.blocknumber}/SwitchState`).once('value', snapshot => {
                    this.switchstate = snapshot.val();
                    // console.log(this.blocknumber,'state', snapshot.val(), this.switchstate, 'db');
                });

                const temp = this.blocknumber;
                //setup sim for red line
                const line = trackLayout.greenLine;

                //hard code to account for yard
                var connectors;
                if(this.blocknumber != 0) {
                    const block = line.find( x => x.blockId == this.blocknumber);
                    // console.log('block', block)
                    if(block == undefined ) {
                        console.warn("RAN OFF EDGE OF TRACK: block not found");
                        return;
                    }
                    connectors = block.connectors[(this.switchstate < block.connectors.length -1 ? this.switchstate : 0)];
                    // console.log(connectors, block.connectors, this.switchstate);
                } else {
                    connectors = [58,62];
                }
                var newblock = connectors.find( x => x != null && (x > 0 ? x : 0) != this.previousblocknumber);
                if (newblock < 0) newblock = 0;
                
                if(newblock == undefined ) {
                    console.warn("RAN OFF EDGE OF TRACK: valid connection not found");
                    return;
                }

                Firebase.database().ref(`/TrainList/${this.trainId}/CurrentBlock`).set(newblock);
                Firebase.database().ref(`/TrainList/${this.trainId}/PreviousBlock`).set(temp);

                Firebase.database().ref(`/${this.line}/${newblock < 0 ? Math.ceil(newblock) : Math.floor(newblock)}/Occupancy`).set(1);
                Firebase.database().ref(`/${this.line}/${temp}/Occupancy`).set(0);

                //set new block values
                Firebase.database().ref(`/${this.line}/${newblock}/BlockGrade`).once('value', snapshot => {
                    Firebase.database().ref(`/TrainList/${this.trainId}/Grade`).set(snapshot.val());
                });
                Firebase.database().ref(`/${this.line}/${newblock}/BlockLength`).once('value', snapshot => {
                    Firebase.database().ref(`/TrainList/${this.trainId}/BlockLength`).set(snapshot.val());
                });
                Firebase.database().ref(`/${this.line}/${newblock}/Authority`).once('value', snapshot => {
                    Firebase.database().ref(`/TrainList/${this.trainId}/BlockAuthority`).set(snapshot.val());
                });
                Firebase.database().ref(`/${this.line}/${newblock}/SpeedLimit`).once('value', snapshot => {
                    Firebase.database().ref(`/TrainList/${this.trainId}/SpeedLimit`).set(snapshot.val());
                });
            }
    }

    return train;
}

export default makeTrainSim;
// export default {trainId, setTrainId, simulateTrain};