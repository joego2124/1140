const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

exports.onBrakeFailure = functions.database.ref('/TrainList/{trainId}/BrakeFailure').onUpdate((change, context) => {
    const after = 0;
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/ExternalTemperature`).set(after));
    return Promise.all(promises);
});

exports.onEngineFailure = functions.database.ref('/TrainList/{trainId}/EngineFailure').onUpdate( (change, context) => {
    const after = 0;
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/ExternalTemperature`).set(after));
    return Promise.all(promises);
})

exports.onSignalFailure = functions.database.ref('/TrainList/{trainId}/SignalFailure').onUpdate( (change, context) => {
    const after = 0;
    const trainId = context.params.trainId;
    const promises = [];
    const database = admin.database();
    promises.push(database.ref(`/TrainList/${trainId}/ExternalTemperature`).set(after));
    return Promise.all(promises);
})