const functions = require("firebase-functions");
const admin = require('firebase-admin');

exports.onBrakeFailure = functions.database.ref('/TrainList/{trainId}/BrakeFailure').onUpdate((change, context) => {
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/EBrakeStatus`).set(true));
    promises.push(database.ref(`/TrainList/${trainId}/CommandedPower`).set(0));
    return Promise.all(promises);
});

exports.onEngineFailure = functions.database.ref('/TrainList/{trainId}/EngineFailure').onUpdate( (change, context) => {
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/EBrakeStatus`).set(true));
    promises.push(database.ref(`/TrainList/${trainId}/CommandedPower`).set(0));
    return Promise.all(promises);
})

exports.onSignalFailure = functions.database.ref('/TrainList/{trainId}/SignalFailure').onUpdate( (change, context) => {
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/EBrakeStatus`).set(true));
    promises.push(database.ref(`/TrainList/${trainId}/CommandedPower`).set(0));
    return Promise.all(promises);
})

exports.onEBrakePull = functions.database.ref('/TrainList/{trainId}/EBrakeStatus').onUpdate( (change, context) => {
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/CommandedPower`).set(0));
    return Promise.all(promises);
})

exports.onSBrakePull = functions.database.ref('/TrainList/{trainId}/SBrakeStatus').onUpdate( (change, context) => {
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/CommandedPower`).set(0));
    return Promise.all(promises);
})

exports.onIntTempChange = functions.database.ref('/TrainList/{trainId}/InternalTemperature').onUpdate( (change, context) => {
    const requestedTemp = change.after.val();
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    if(requestedTemp <= 72 && requestedTemp >= 68){
        promises.push(database.ref(`/TrainList/${trainId}/InternalTemperature`).set(requestedTemp));
    }
    return Promise.all(promises);
})

exports.onDoorOpen = functions.database.ref('/TrainList/{trainId}/EDoorStatus').onUpdate( (change, context) => {
    const currentStatus = change.after.val();
    const trainId = context.params.trainId;
    const database = admin.database();
    return database.ref(`/TrainList/${trainId}/Velocity`).get().then( (snapshot) => {
        console.log('Door Status: ' + currentStatus);
        console.log('Velocity: ' + snapshot.val());
        if(currentStatus == true){
            if(snapshot.val() == 0){
                database.ref(`/TrainList/${trainId}/EDoorStatus`).set(true);
            }
        }
    });
})