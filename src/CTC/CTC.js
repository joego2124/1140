import React, { useState, useEffect } from 'react';

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';
import AddTrainModal from './AddTrainModal';

import { DatabaseGet, DatabaseSet }  from "../Database";

var trackLayout = require("./TrackLayout.json");

function pathfind(startBlockId, endBlockId) {
	let route = [], visited = [];
	let found = false;
	
	//recursive function to find route
	function bfs(currId) {
		//get current block from track layout
		let currBlock = trackLayout.blocks.find(v => v.blockId == currId);
		
		//recursion end cases
		if (currBlock.blockId == endBlockId || found) {
			found = true;
			return;
		}

		console.log(`currId: ${currId}`);

		visited.push(currId); //add current block id to visited list
		route.push(currId) //add current block id to route 
		
		//iterate through current block's connections
		currBlock.connectors.forEach(connections => {
			//iterate through connection block id's
			connections.forEach(nextBlockId => {
				//check to make sure next block id is valid and not already visited
				// console.log(nextBlockId, visited.find(v => v == nextBlockId));
				if (nextBlockId != null && visited.find(v => v == nextBlockId) == undefined) { 
					return bfs(nextBlockId);
				}
			});
		});

		if (!found) route.pop(currId); //remove current block id after exhausting all options
	}

	bfs(startBlockId);

	return route;
}

function routeTrain(stations) {
	let yardId = trackLayout.blocks.find(v => v.section === "YARD").blockId;
	let prevStationId = yardId;
	let route = [];
	stations.sort((a, b) => a - b).forEach(nextStationId => {
		let subroute = pathfind(prevStationId, nextStationId);
		route.concat(subroute);
		prevStationId = nextStationId;
	});
	route.concat(pathfind(prevStationId, yardId));
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
