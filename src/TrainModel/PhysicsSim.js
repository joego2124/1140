import train from './TrainSim';
import Firebase from "firebase";
import makeTrainSim from './TrainSim';

var simList;

Firebase.database().ref('/TrainIds').on('value', snapshot => {
    simList = [];
    if(snapshot.val() != null && snapshot.val() != undefined){
        Object.entries(snapshot.val()).forEach(arr => { 
            simList.push(makeTrainSim(arr[1]));
        });
    }
});

function physicsTick() {

    // console.log(simList);
    if (simList != undefined) {
        simList.forEach( train => {
                train.simulateTrain();
                // console.log(train.trainId);
        });
    }
}

export default physicsTick;