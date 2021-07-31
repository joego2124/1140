import train from './TrainSim';
import Firebase from "firebase";
import makeTrainSim from './TrainSim';

var simList;

Firebase.database().ref('/TrainIds').on('value', snapshot => {
    const state = snapshot.val();
    // console.log('read train ids')
    simList = [];
    state.forEach(element => {
        // console.log(element);
        // const newtrain = Object.assign({}, train);
        // // newtrain.trainId = element;
        // newtrain.setTrainId(element);
        // simList.push(newtrain);

        simList.push(makeTrainSim(element));
    });
});

function physicsTick() {
    // console.log("physics tick");

    // if(trainIds == undefined)
    //     Firebase.database().ref('/TrainIds').on('value', snapshot => {
	// 		const state = snapshot.val();
	// 		trainIds = state;
    //         console.log('read train ids')
	// 	});

    // console.log(simList);
		if (simList != undefined) {
			simList.forEach( train => {
					train.simulateTrain();
					// console.log(train.trainId);
			});
		}
}

export default physicsTick;