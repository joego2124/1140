import train from './PowerSim';
import Firebase from "firebase";
import makeTrainSim from './PowerSim';

var simList;

Firebase.database().ref('/TrainIds').on('value', snapshot => {
    const state = snapshot.val();
    console.log('read train ids')
    simList = [];
    state.forEach(element => {
        console.log(element);
        simList.push(makeTrainSim(element));
    });
});

function updatePower() {
    console.log("Update Power");
    simList.forEach( train => {
        train.calculatePower();
    })
}

export default updatePower;