import React, { useState, useEffect } from 'react';

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';
import AddTrainModal from './AddTrainModal';

import { DatabaseGet, DatabaseSet }  from "../Database";

var trackLayout = require("./TrackLayout.json");

function routeTrain(stations) {
	let yardId = trackLayout.blocks.find(v => v.section === "YARD").blockId;
	let prevStationId = yardId, prevBlockId = yardId;
	let route = [];

	//get subroute between stations
	function pathfind(startBlockId, endBlockId) {
		let solutions = [];
		let subRoute = [], visited = [];
		let found = false;
		
		//recursive function to find sub route
		function bfs(currId) {
			//get current block from track layout
			let currBlock = trackLayout.blocks.find(v => v.blockId == currId);
			
			//recursion end cases
			if (currId == endBlockId || found) {
				found = true;
				return;
			}
	
			console.log(`currId: ${currId}, prevBlockId: ${prevBlockId}`);
	
			subRoute.push(currId) //add current block id to sub route 
			
			//iterate through current block's connections
			currBlock.connectors.forEach(connections => {
				//iterate through connection block id's
				connections.forEach(nextBlockId => {
					//check to make sure next block id exists
					if (nextBlockId === null) return;

					//check same travel configuration hasn't occurred previously
					if (visited.find(v => v.from == currId && v.to == nextBlockId) != undefined) return;

					//check we're not going backwards and repeating
					if (nextBlockId === prevBlockId) return;

					visited.push({from: currId, to: nextBlockId});
					prevBlockId = currId;
					return bfs(nextBlockId);
				});
			});
	
			if (!found) subRoute.pop(currId); //remove current block id after exhausting all options
		}
	
		bfs(startBlockId);
	
		return subRoute;
	}

	prevBlockId = 34;
	console.log(pathfind(35, 34));

	//iterate through each station and find path
	// stations.sort((a, b) => a - b).forEach(nextStationId => {
	// 	let subroute = pathfind(prevStationId, nextStationId);
	// 	route = route.concat(subroute);
	// 	prevStationId = nextStationId;
	// });

	// console.log("routing back to yard");

	// //go back to yard
	// prevBlockId = route[route.length - 1];
	// route = route.concat(pathfind(prevStationId, yardId));
	// route.push(yardId); //push yard block as final since pathfind does not
	
	return route;
}

function CTC() {

	const [scheduleModalShow, setScheduleModalShow] = useState(false);
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	console.log(routeTrain([35, 16]));

	return (
		<div>
			<header className="App-header">
				<TrainsPanel 
					setSelectedTrain={setSelectedTrain}
					setAddTrainModal={setAddTrainModal}
					trainsList={trainsList}
				/>
				<MainPanel 
					setModalShow={setScheduleModalShow} 
					selectedTrain={selectedTrain}
				/>
				<TrackView
					selectedTrain={selectedTrain}
					routeTrain={routeTrain}
				/>
			</header>
			<ScheduleModal
        show={scheduleModalShow}
        onHide={() => setScheduleModalShow(false)}
				trainsList={trainsList}
      />
			<AddTrainModal 
				show={addTrainModal}
				onHide={() => setAddTrainModal(false)}
			/>
		</div>
	)
}

export default CTC
