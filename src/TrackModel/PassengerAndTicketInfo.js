import Firebase from "firebase";

var totalTickets = 0;

// Description: Returns a random number between 0 and max.
function getRandomInt( max ) {
    return Math.floor(Math.random() * max);
}

// Description: Sets ticket sales for each station along the route for each train
function generateTicketSales( ) {
    var stationLists = {
        GreenLine: [],
        RedLine: [],
    };

    // Get train list and create list of stations.
    Firebase.database().ref('/TrainList').once('value', snapshot => {
        Object.entries(snapshot.val()).forEach(trainArr => { 
            Object.entries(trainArr[1].Stations).forEach(arr => { 
                let blockId = arr[1];
                let lineArr = stationLists[trainArr[1].Line];
                // if statement ensures we don't push repeats
                if (lineArr.find(id => id === blockId) == undefined) {
                    lineArr.push(blockId);
                }
            });
        });
        Object.entries(stationLists).forEach(arr => { 
            let lineName = arr[0];
            let totalTickets = 0;
            console.log(`${lineName}: ${arr[1]}`);
            arr[1].forEach(stationId => {
                let tempTickets = getRandomInt( 50 );
                // totalTickets += tempTickets;

                // Set ticket value for stations
                Firebase.database().ref(`/${lineName}/${stationId}/Station/Tickets`).set( Number(tempTickets) );
                // Set throughput value
                // Firebase.database().ref(`/${lineName}/${stationId}/Station/Tickets`).set( Number(tempTickets) );
            });
        });
    });

    return(
        totalTickets
    )
}

export default generateTicketSales;