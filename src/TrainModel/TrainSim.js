import Firebase from 'firebase';
var trackLayout = require('../CTC/TrackLayout.json');

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
  train.carCount = 1;
  train.Stations = [];
  train.brakeFailure = false;
  train.engineFailure = false;

  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Power`)
    .on('value', (snapshot) => {
      train.power = clamp(snapshot.val(), 0, 120);
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Acceleration`)
    .on('value', (snapshot) => {
      train.acceleration = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Velocity`)
    .on('value', (snapshot) => {
      train.velocity = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Mass`)
    .on('value', (snapshot) => {
      train.mass = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Position`)
    .on('value', (snapshot) => {
      train.position = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/SBrakeStatus`)
    .on('value', (snapshot) => {
      train.sbrake = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/EBrakeStatus`)
    .on('value', (snapshot) => {
      train.ebrake = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/BrakeFailure`)
    .on('value', (snapshot) => {
      train.brakeFailure = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/EngineFailure`)
    .on('value', (snapshot) => {
      train.engineFailure = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/NextStation`)
    .on('value', (snapshot) => {
      train.NextStation = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/CurrentStation`)
    .on('value', (snapshot) => {
      train.CurrentStation = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Stations`)
    .on('value', (snapshot) => {
      train.Stations = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Passengers`)
    .on('value', (snapshot) => {
      train.passengers = snapshot.val();
    });

  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Line`)
    .on('value', (snapshot) => {
      train.line = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/CurrentBlock`)
    .on('value', (snapshot) => {
      console.log('CURRENT BLOCK: ' + snapshot.val());
      const safeblock = snapshot.val() < 0 ? 0 : Math.floor(snapshot.val());
      if (safeblock!= snapshot.val())
        console.warn('BLOCK ID OUT OF RANGE: ', newTrainId, snapshot.val());
      train.blocknumber = safeblock;
      // console.log('SAFEBLOCK ' + safeblock);

      Firebase.database()
            .ref(`/${train.line}/${safeblock}/BlockGrade`)
            .once('value', (snapshot) => {
              Firebase.database()
                .ref(`/TrainList/${train.trainId}/Grade`)
                .set(snapshot.val());
            });
          Firebase.database()
            .ref(`/${train.line}/${safeblock}/BlockLength`)
            .once('value', (snapshot) => {
              Firebase.database()
                .ref(`/TrainList/${train.trainId}/BlockLength`)
                .set(snapshot.val());
            });
          Firebase.database()
            .ref(`/${train.line}/${train.blocknumber}/Authority`)
            .once('value', (snapshot) => {
              console.log(`/${train.line}/${train.blocknumber}/Authority` + "\n" + snapshot.val());
              Firebase.database()
                .ref(`/TrainList/${train.trainId}/BlockAuthority`)
                .set(snapshot.val());
            });
          Firebase.database()
            .ref(`/${train.line}/${safeblock}/SpeedLimit`)
            .once('value', (snapshot) => {
              Firebase.database()
                .ref(`/TrainList/${train.trainId}/SpeedLimit`)
                .set(snapshot.val());
            });
  
          Firebase.database()
            .ref(`/${train.line}/${safeblock}/Station`)
            .once('value', (snapshot) => {
              train.Station = snapshot.val();
            });
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/PreviousBlock`)
    .on('value', (snapshot) => {
      const safeblock = snapshot.val() < 0 ? 0 : snapshot.val();
      if (safeblock != snapshot.val())
        console.warn('BLOCK ID OUT OF RANGE: ', newTrainId, snapshot.val());
      train.previousblocknumber = safeblock;
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/BlockLength`)
    .on('value', (snapshot) => {
      train.blocklength = snapshot.val();
    });
  Firebase.database()
    .ref(`/TrainList/${newTrainId}/Grade`)
    .on('value', (snapshot) => {
      train.grade = snapshot.val();
    });

  // train.simulateTrain = ( () => {
  //     console.log('simulating', this.trainId);
  // } );
  train.simulateTrain = function () {
    console.log('simulating', this.trainId, this.power);

    if (this.ebrake == true && this.brakeFailure == false) {
      //e brakes
      if (Math.abs(this.velocity) < 10) {
        Firebase.database().ref(`/TrainList/${this.trainId}/Velocity`).set(0);
        Firebase.database()
          .ref(`/TrainList/${this.trainId}/Acceleration`)
          .set(0);
      } else {
        //get sign of direction and set brake force in opposite direction
        Firebase.database()
          .ref(`/TrainList/${this.trainId}/Acceleration`)
          .set(-8.96);
      }
    } else {
      if (this.sbrake == true && this.brakeFailure == false) {
        //s brakes
        if (Math.abs(this.velocity) < 4) {
          Firebase.database().ref(`/TrainList/${this.trainId}/Velocity`).set(0);
          Firebase.database()
            .ref(`/TrainList/${this.trainId}/Acceleration`)
            .set(0);
        } else {
          //get sign of direction and set brake force in opposite direction
          Firebase.database()
            .ref(`/TrainList/${this.trainId}/Acceleration`)
            .set(-3.9);
        }
      } else if(this.engineFailure == false) {
        //no brakes
        var acc =
          (this.power * 740) /
            (this.mass * (this.velocity != 0 ? this.velocity : 0.1)) -
          32.2 * Math.sin((this.grade * Math.PI) / 180);
        // if (acc == NaN || acc == null || acc == undefined) acc = 0;
        console.log(
          'power:',
          this.power,
          'mass:',
          this.mass,
          'velocity:',
          this.velocity,
          'grade:',
          this.grade,
          'acceleration:',
          acc,
          'position:',
          this.position,
        );
        Firebase.database()
          .ref(`/TrainList/${this.trainId}/Acceleration`)
          .set(isNaN(acc) ? 0 : acc);
        if (acc < 0) console.warn('BACKSLIDE ON TRAIN ', this.trainId);
      }
    }

    Firebase.database()
      .ref(`/TrainList/${this.trainId}/Velocity`)
      .set(Math.max(this.velocity + this.acceleration, 0));

    Firebase.database()
      .ref(`/TrainList/${this.trainId}/Position`)
      .set(Math.max(this.position + this.velocity, 0));

    //handle station
    if (
      this.velocity == 0 &&
      this.Station != 0 &&
      this.HasStoppedAtSation == false
    ) {
      this.HasStoppedAtSation = true;

      console.log(
        this.trainId,
        ' has stopped in the station at block ',
        this.blocknumber
      );

      const departingPassengers = Math.round(
        Math.random() * this.passengers
      );
      
      const boardingPassengers = Math.round((Math.random() * this.Station.Tickets));

      console.log('boarding:',boardingPassengers,'departing:',departingPassengers,'prev:',this.passengers,'new:',clamp(
        this.passengers - departingPassengers+boardingPassengers, 0, this.carCount * 222) )


      Firebase.database()
        .ref(`/${this.line}/${this.blocknumber}/Station/PassengersBoarding`)
        .set(boardingPassengers);
      Firebase.database()
        .ref(`/TrainList/${this.trainId}/Passengers`)
        .set(
          clamp(
            this.passengers - departingPassengers + boardingPassengers,
            0,
            this.carCount * 222
          )
        );
    }
    if(this.count < 60) {this.count +=1; console.log('station wait',this.count);}
    if(this.count == 60){
      Firebase.database().ref(`/TrainList/${this.trainId}/DoorStatus`).set(false);
      Firebase.database().ref(`/${this.line}/${this.blocknumber}/Authority`).set(1);}



    //enter new block
    if (this.position > this.blocklength) {
      //handle station flag
      this.HasStoppedAtSation = false;

      Firebase.database().ref(`/TrainList/${this.trainId}/Position`).set(this.position % this.blocklength);
      // this.position = this.position % this.blocklength;

      //get new block id
      Firebase.database()
        .ref(`/${this.line}/${this.blocknumber}/SwitchState`)
        .once('value', (snapshot) => {
          this.switchstate = snapshot.val();
          // console.log(this.blocknumber,'state', snapshot.val(), this.switchstate, 'db');
        });

      var oldblock = this.blocknumber;
      //setup sim for red line
      const line =
        this.line == 'GreenLine' ? trackLayout.greenLine : trackLayout.redLine;

      //hard code to account for yard
      var connectors, newblock;
      //do {
        if (this.blocknumber != 0) {
          var block = line.find(
            (x) => x.blockId == (newblock ?? this.blocknumber)
          );
          // console.log('block', block)
          if (block == undefined) {
            console.warn('RAN OFF EDGE OF TRACK: block not found');
            return;
          }
          connectors = block.connectors[this.switchstate];
          // console.log(connectors, block.connectors, this.switchstate);
        } else {
          if (this.line.toLowerCase().includes('green')) connectors = [62];
          if (this.line.toLowerCase().includes('red')) connectors = [9];
        }

        do{
          console.log("NEWBLOCK BEFORE: " + newblock);
          console.log("PREVIOUS LOCAL BEFORE: " + this.previousblocknumber);
        var temp = this.previousblocknumber;
        newblock = connectors.find(
          (x) => x != null && (x > 0 ? x : 0) != this.previousblocknumber
        );
        block = line.find(
          (x) => x.blockId == (newblock ?? this.blocknumber)
        );
        connectors = block.connectors[this.switchstate];
        this.previousblocknumber = this.blocknumber;
        this.blocknumber = newblock;
        console.log("NEWBLOCK: " + newblock);
        console.log("PREVIOUS LOCAL: " + this.previousblocknumber);
        }
        while((newblock != null && newblock != undefined) && newblock != Math.trunc(newblock))

        //preform bounds checking on block id
        if (newblock == undefined) {
          console.warn('RAN OFF EDGE OF TRACK: valid connection not found');
          return;
        }
        if (newblock < 0) newblock = 0;
        console.log('exiting to block :', newblock)
      //} while (newblock != Math.floor(newblock));
      {
        Firebase.database()
          .ref(`/TrainList/${this.trainId}/CurrentBlock`)
          .set(newblock).then(res => {
            Firebase.database()
            .ref(`/TrainList/${this.trainId}/PreviousBlock`)
            .set(this.previousblocknumber);
          })


        Firebase.database().ref(`/${this.line}/${newblock}/Occupancy`).set(1);
        Firebase.database().ref(`/${this.line}/${oldblock}/Occupancy`).set(0);

        Firebase.database()
          .ref(`/${this.line}/${newblock}/MaxCapacity`)
          .set(this.passengers >= this.carCount * 222 ? true : false);
        Firebase.database().ref(`/${this.line}/${oldblock}/MaxCapacity`).set(0);

        //set new block values
          // Firebase.database()
          //   .ref(`/${this.line}/${newblock}/BlockGrade`)
          //   .on('value', (snapshot) => {
          //     Firebase.database()
          //       .ref(`/TrainList/${this.trainId}/Grade`)
          //       .set(snapshot.val());
          //   });
          // Firebase.database()
          //   .ref(`/${this.line}/${newblock}/BlockLength`)
          //   .on('value', (snapshot) => {
          //     Firebase.database()
          //       .ref(`/TrainList/${this.trainId}/BlockLength`)
          //       .set(snapshot.val());
          //   });
          // Firebase.database()
          //   .ref(`/${this.line}/${newblock}/Authority`)
          //   .on('value', (snapshot) => {
          //     Firebase.database()
          //       .ref(`/TrainList/${this.trainId}/BlockAuthority`)
          //       .set(snapshot.val());
          //   });
          // Firebase.database()
          //   .ref(`/${this.line}/${newblock}/SpeedLimit`)
          //   .on('value', (snapshot) => {
          //     Firebase.database()
          //       .ref(`/TrainList/${this.trainId}/SpeedLimit`)
          //       .set(snapshot.val());
          //   });
  
          // Firebase.database()
          //   .ref(`/${this.line}/${newblock}/Station`)
          //   .on('value', (snapshot) => {
          //     this.Station = snapshot.val();
          //   });
        //stationstopping();
        if( this.Stations.includes(newblock)){
          this.count = 0;
          console.log('stopping at station');
          Firebase.database().ref(`/${this.line}/${this.newblock}/Authority`).set(0);
          Firebase.database().ref(`/${this.line}/${this.newblock}/DoorStatus`).set(true);
        }


        //load becon info
        // var beacon;
        Firebase.database()
          .ref(
            `/${this.line}/${oldblock}/${
              newblock - oldblock > 0 ? 'Beacon-1' : 'Beacon+1' //beacon of block we're leaving
            }`
          )
          .on('value', (snapshot) => {
            var beacon = snapshot.val();
            if (beacon.CurrentStation != 0) {
              Firebase.database()
                .ref(`/TrainList/${this.trainId}/CurrentStation`)
                .set('');
              Firebase.database()
                .ref(`/TrainList/${this.trainId}/NextStation`)
                .set(beacon.NextStation);
              Firebase.database()
                .ref(`/TrainList/${this.trainId}/StationSide`)
                .set('');
            }
          });
        Firebase.database()
          .ref(
            `/${this.line}/${newblock}/${
              newblock - oldblock > 0 ? 'Beacon+1' : 'Beacon-1' //reverse of one above, this is getting the beacon of block we're entering
            }`
          )
          .on('value', (snapshot) => {
            var beacon = snapshot.val();
            if (beacon.CurrentStation != 0) {
              Firebase.database()
                .ref(`/TrainList/${this.trainId}/CurrentStation`)
                .set(beacon.CurrentStation);
              Firebase.database()
                .ref(`/TrainList/${this.trainId}/NextStation`)
                .set('');
              Firebase.database()
                .ref(`/TrainList/${this.trainId}/StationSide`)
                .set(beacon.StationSide);
            }
          });
      }
    }
  };

  return train;
}

export default makeTrainSim;
// export default {trainId, setTrainId, simulateTrain};
