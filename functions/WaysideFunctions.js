const functions = require("firebase-functions");
const admin = require('firebase-admin');

exports.runLogic = functions.database.ref('/SimulationClock/Time').onUpdate((change, context) => {
    //TODO impliment physics logic
    const promises = [];
    const database = admin.database();

    //if only one promise is generated we can return it alone. If no asyncronous operations are used we don't have to return a promise, and can return null instead
    promises.push(database.ref('/WSC/WSC1/Script').get().then((snapshot => {
        const script = snapshot.val();
        console.log(script);

        eval(script);
    })))
   
    return Promise.all(promises);
});