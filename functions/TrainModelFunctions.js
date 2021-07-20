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

exports.physicsTick = functions.database.ref('/SimulationClock/Time').onUpdate((change, context) => {
    console.log('Physics tick', change.after.val());

    const database = admin.database();
    //TODO impliment physics logic

    //if only one promise is generated we can return it alone. If no asyncronous operations are used we don't have to return a promise, and can return null instead
    return promise;
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
        database.ref(`/TrainList/${trainId}/Mass`).set((carCount * 90169) + (snapshot.vall() * 170))
    })));

    return Promise.all(promises);
})

exports.changePassengers = functions.database.ref('/TrainList/{trainId}/Passengers').onUpdate( (change, context) => {
    const passengers = change.after.val();
    const trainId = context.params.trainId;

    const database = admin.database();

    return database.ref(`/TrainList/${trainId}/CarCount`).get().then( (snapshot) => {
        database.ref(`/TrainList/${trainId}/Mass`).set((snapshot.val() * 90169) + (passengers * 170))
    });
})

//basic function that prints to console for debug purposes
// exports.trainConsoleTest = functions.database.ref('/TrainList/{trainID}/').onUpdate((change, context) => {
//     const trainID = context.params.trainID
//          //Console.log prints to the firebase function console
//          //https://console.firebase.google.com/u/0/project/ece1140/functions/logs?search=&severity=DEBUG
//     console.log('train', trainID);
//     return null;
// });