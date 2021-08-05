import train from './PowerSim';
import Firebase from "firebase";
import makeTrainSim from './PowerSim';

var simList = [];

Firebase.database().ref('/TrainIds').on('value', snapshot => {
    simList = [];
    if(snapshot.val() != undefined && snapshot.val() != null){
        Object.entries(snapshot.val()).forEach(arr => { 
            simList.push(makeTrainSim(arr[1]));
        });
    }
});

function updatePower() {
    simList.forEach( train => {
        train.calculatePower();
    })
}

export default updatePower;