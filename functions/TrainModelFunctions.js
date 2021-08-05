const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

exports.onEDoorUpdate = functions.database.ref('/TrainList/{trainId}/EDoorStatus').onUpdate((change, context) => {
    const after = change.after.val();
    const trainId = context.params.trainId;
    //array of promises
    const promises = [];
    //reference to the database
    const database = admin.database();
    //preforming database writes and ensuring that each asyncronous operation get its promise in the array
    promises.push(database.ref(`/TrainList/${trainId}/LeftDoorStatus`).set(after));
    promises.push(database.ref(`/TrainList/${trainId}/RightDoorStatus`).set(after));
    promises.push(database.ref(`/TrainList/${trainId}/EBrakeStatus`).set(after));
    //return a combination of all the previous promises, this ensures firebase will not clean this function till all promises are fufilled
    return Promise.all(promises);
});

exports.changeTrainLength = functions.database.ref('/TrainList/{trainId}/CarCount').onUpdate( (change, context) => {
    //value after change, change.before has previous value
    const carCount = change.after.val();
    //parameter from database path (see wild card in ref() ^^^)
    const trainId = context.params.trainId;

    const promises = [];
    const database = admin.database();

    promises.push(database.ref(`/TrainList/${trainId}/Length`).set(carCount * 105.643));
    //since the database write uses a value from the previous operation we will ensure it only gets called once the previous operation is done.
    //the entire stack of calls will return one promise that we must add to the list to return from our function
    promises.push(passengers = database.ref(`/TrainList/${trainId}/Passengers`).get().then( (snapshot => {
        database.ref(`/TrainList/${trainId}/Mass`).set((carCount * 81800) + (snapshot.val() * 170))
    })));

    return Promise.all(promises);
})

exports.changePassengers = functions.database.ref('/TrainList/{trainId}/Passengers').onUpdate( (change, context) => {
    const passengers = change.after.val();
    const trainId = context.params.trainId;

    const database = admin.database();

    return database.ref(`/TrainList/${trainId}/CarCount`).get().then( (snapshot) => {
        database.ref(`/TrainList/${trainId}/Mass`).set((snapshot.val() * 81800) + (passengers * 170))
    });
})

exports.trainAdded = functions.database.ref(`/TrainList/{trainId}`).onCreate( (snapshot, context) => {
    const trainId = context.params.trainId;
    console.log('Train Added', trainId);

    // return admin.database().ref(`/TrainIds`).push(trainId);
    return admin.database().ref(`/TrainIds/${trainId}`).set(trainId);
})

exports.trainRemoved = functions.database.ref(`/TrainList/{trainId}`).onDelete( (snapshot, context) => {
    const trainId = context.params.trainId;
    console.log('Train Removed', trainId);
    
    // return admin.database().ref(`/TrainIds`).remove(trainId);
    return admin.database().ref(`/TrainIds/${trainId}`).remove();
})