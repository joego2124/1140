import train from './PowerSim';
import Firebase from "firebase";
import makeTrainSim from './PowerSim';

var simList = [];

Firebase.database().ref('/TrainIds').on('value', snapshot => {
    simList = [];
    Object.entries(snapshot.val()).forEach(arr => { 
        simList.push(makeTrainSim(arr[1]));
    });
});

function updatePower() {
    console.log("Update Power");
    simList.forEach( train => {
        train.calculatePower();
    })
}

export default updatePower;