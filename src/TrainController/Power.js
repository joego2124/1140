import train from './PowerSim';
import Firebase from "firebase";
import makeTrainSim from './PowerSim';

var simList;

Firebase.database().ref('/TrainIds').on('value', snapshot => {
    console.log('read train ids')
    simList = [];
    Object.entries(snapshot.val()).forEach(arr => { 
        console.log(arr[1]);
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