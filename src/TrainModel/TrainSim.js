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
    train.StationSide = '';
    train.CurrentStation = 'Yard';
    train.NextStation = '';
    train.Station = 0;
    train.HasStoppedAtSation = false;
    train.passengers = 0;

    Firebase.database().ref(`/TrainList/${newTrainId}/Power`).on('value', snapshot => { train.power = clamp(snapshot.val(), 0, 120); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Acceleration`).on('value', snapshot => { train.acceleration = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Velocity`).on('value', snapshot => { train.velocity = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Mass`).on('value', snapshot => { train.mass = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Position`).on('value', snapshot => { train.position = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/SBrakeStatus`).on('value', snapshot => { train.sbrake = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/EBrakeStatus`).on('value', snapshot => { train.ebrake = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/NextStation`).on('value', snapshot => { train.NextStation = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/CurrentStation`).on('value', snapshot => { train.CurrentStation = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Passengers`).on('value', snapshot => { train.passengers = snapshot.val(); });

    Firebase.database().ref(`/TrainList/${newTrainId}/Line`).on('value', snapshot => { train.line = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/CurrentBlock`).on('value', snapshot => { train.blocknumber = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/PreviousBlock`).on('value', snapshot => { train.previousblocknumber = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/BlockLength`).on('value', snapshot => { train.blocklength = snapshot.val(); });
    Firebase.database().ref(`/TrainList/${newTrainId}/Grade`).on('value', snapshot => { train.grade = snapshot.val(); });

    // train.simulateTrain = ( () => {
    //     console.log('simulating', this.trainId);
    // } );
    train.simulateTrain = function () {
            console.log('simulating', this.trainId, this.power);

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
                    var acc = ((this.power * 740)/(this.mass * (this.velocity != 0 ? this.velocity : .1) )) - (32.2 * Math.sin(this.grade*Math.PI/180));
                    // console.log( 'power:',this.power, 'mass:',this.mass,'velocity:',this.velocity,'grade:',this.grade,'acceleration:', acc );
                    Firebase.database().ref(`/TrainList/${this.trainId}/Acceleration`).set( acc );
                    if(acc < 0) console.warn('BACKSLIDE ON TRAIN ',this.trainId)
                }
            }

            Firebase.database().ref(`/TrainList/${this.trainId}/Velocity`).set( 
                Math.max( this.velocity + this.acceleration, 0) );

            Firebase.database().ref(`/TrainList/${this.trainId}/Position`).set( 
                Math.max( this.position + this.velocity, 0 ) );

            //handle station
            if(this.velocity == 0 && this.Station != 0 && this.HasStoppedAtSation == false) {
                this.HasStoppedAtSation = true;
                const departingPassengers = Math.floor((Math.random() * this.passengers) + 1);
                Firebase.database().ref(`/${this.line}/${this.blocknumber}/Station/PassengersDeparting`).set(departingPassengers);
                Firebase.database().ref(`/TrainList/${this.trainId}/Passengers`).set(this.passengers - departingPassengers);
                this.HasStoppedAtSation = true; 
            }


            //enter new block
            if(this.position > this.blocklength) {
                //handle station flag
                this.HasStoppedAtSation = false;

                this.position = this.position % this.blocklength;
                
                //get new block id
                Firebase.database().ref(`/${this.line}/${this.blocknumber}/SwitchState`).once('value', snapshot => {
                    this.switchstate = snapshot.val();
                    // console.log(this.blocknumber,'state', snapshot.val(), this.switchstate, 'db');
                });

                const oldblock = this.blocknumber;
                //setup sim for red line
                const line = this.line == 'GreenLine' ? trackLayout.greenLine : trackLayout.redLine;

                //hard code to account for yard
                var connectors, newblock;
                do{
                    if(this.blocknumber != 0) {
                        const block = line.find( x => x.blockId == (newblock ?? this.blocknumber));
                        // console.log('block', block)
                        if(block == undefined ) {
                            console.warn("RAN OFF EDGE OF TRACK: block not found");
                            return;
                        }
                        connectors = block.connectors[(this.switchstate < block.connectors.length -1 ? this.switchstate : 0)];
                        // console.log(connectors, block.connectors, this.switchstate);
                    } else {
                        if(this.line = 'GreenLine') connectors = [62];
                        if(this.line = 'RedLine') connectors = [9];
                    }
                    newblock = connectors.find( x => x != null && (x > 0 ? x : 0) != this.previousblocknumber);
                    //preform bounds checking on block id
                    if(newblock == undefined ) {
                        console.warn("RAN OFF EDGE OF TRACK: valid connection not found");
                        return;
                    }
                    if (newblock < 0) newblock = 0;
                }
                while(newblock !== Math.floor(newblock))

                Firebase.database().ref(`/TrainList/${this.trainId}/CurrentBlock`).set(newblock);
                Firebase.database().ref(`/TrainList/${this.trainId}/PreviousBlock`).set(oldblock);

                Firebase.database().ref(`/${this.line}/${newblock}/Occupancy`).set(1);
                Firebase.database().ref(`/${this.line}/${oldblock}/Occupancy`).set(0);

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

                Firebase.database().ref(`/${this.line}/${newblock}/Station`).once('value', snapshot => {
                    this.Station = snapshot.val();
                });

                //load becon info
                // var beacon;
                Firebase.database().ref(`/${this.line}/${newblock}/${(newblock-oldblock) > 0 ? 'Beacon+1' : 'Beacon-1'}`).once('value', snapshot => {
                    var beacon=snapshot.val();
                    if( beacon?.CurrentStation != 0 ) {
                        if( this.NextStation == beacon.CurrentStation || (this.CurrentStation == 'Yard') ){
                            Firebase.database().ref(`/TrainList/${this.trainId}/CurrentStation`).set(beacon.CurrentStation);
                            Firebase.database().ref(`/TrainList/${this.trainId}/NextStation`).set(0);
                            this.StationSide = beacon.StationSide;
                        }
                    } 
                });
                Firebase.database().ref(`/${this.line}/${oldblock}/${(newblock-oldblock) > 0 ? 'Beacon-1' : 'Beacon+1'}`).once('value', snapshot => {
                    var beacon=snapshot.val();
                    if( beacon.CurrentStation != 0 ) {
                        if( this.CurrentStation == beacon.CurrentStation){
                            Firebase.database().ref(`/TrainList/${this.trainId}/CurrentStation`).set(0);
                            Firebase.database().ref(`/TrainList/${this.trainId}/NextStation`).set(beacon.NextStation);
                        }
                    } 
                });

            }
    }

    return train;
}

export default makeTrainSim;
// export default {trainId, setTrainId, simulateTrain};