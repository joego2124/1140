const functions = require("firebase-functions");
const firebase = require('firebase-admin');


exports.runLogic = functions.database.ref('/SimulationClock/Time').onUpdate((change, context) => {
    //TODO impliment physics logic
    const promises = [];
    const database = firebase.database();

    //if only one promise is generated we can return it alone. If no asyncronous operations are used we don't have to return a promise, and can return null instead
    promises.push(database.ref('/WSC/').get().then((snapshot => {
        const waysides = snapshot.val();

        // for (wayside in waysides){
        //     if(wayside.includes('WSC'))
        //     {
        //         if(waysides[wayside].Script != null && waysides[wayside].Script != undefined){
        //         var script = waysides[wayside].Script;
        //         console.log(script);
        //         eval(script);
        //         }
        //     }
        // }


        eval(waysides['WSC1'].Script)
            .then(res => eval(waysides['WSC2'].Script))
            .then(res => eval(waysides['WSC3'].Script))
            .then(res => eval(waysides['WSC4'].Script))
            .then(res => eval(waysides['WSC5'].Script))
            .then(res => eval(waysides['WSC6'].Script))
        // eval(waysides['WSC2'].Script);
    })))
   
    return Promise.all(promises);
});