import Firebase from "firebase";

// Description: Returns a random number between 0 and max.
function getRandomInt( max ) {
    return Math.floor(Math.random() * max);
}

// Description: Sets ticket sales for each station along the route for each train
function generateTicketSales( totalTickets ) {
    var ticketSum = 0;
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
            arr[1].forEach(stationId => {
                // This can be changed from 120, it's just the max number of tix
                // that can be sold at a station. Aribtrary value
                let tempTickets = getRandomInt( 120 );
                ticketSum += tempTickets;

                // Set ticket value for stations
                if (stationId > 0) {
                    Firebase.database().ref(`/${lineName}/${stationId}/Station/Tickets`).set( Number(tempTickets) );
                }
            });
        });
        // Set throughput value
        // FIXME: I'm dividing by 10 to match what's in TopBar.js, but this may need to be adjusted
        let throughput = ticketSum / 10;
        Firebase.database().ref(`/CTC/Throughput`).set( Number( Math.floor(throughput)) );
    });

    return(
        ticketSum
    )
}

export default generateTicketSales;