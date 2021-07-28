import React, { useState, useEffect } from 'react';

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';
import AddTrainModal from './AddTrainModal';

import { DatabaseGet, DatabaseSet }  from "../Database";

var trackLayout = require("./TrackLayout.json");

//parallel breadth first search on bidirectional line respecting unidirectional train travel
function bfs(startBlockId, endBlockId, _prevBlockId, lineLayout) {
	console.warn("STARTING PATHFIND");

	//define initial blocks
	let startBlock = lineLayout.find(v => v.blockId === startBlockId);
	let _prevBlock = lineLayout.find(v => v.blockId === _prevBlockId);
	
	//define stack with starting block
	let stack = [[{current: startBlock, previous: _prevBlock}]]; 

	while (stack.length > 0) {

		//get the current branch from stack
		let currBranches = stack[stack.length - 1], newBranches = [];
		// console.log(stack[stack.length - 1]);

		//evaluate each leaf in branch
		for (let k = 0; k < currBranches.length; k++) {
			let currentBlock = currBranches[k].current;
			let prevBlock = currBranches[k].previous;

			// console.log(`currentBlock: ${currentBlock.blockId}, prevBlock: ${prevBlock.blockId}`);

			//if the current leaf block is the destination
			if (currentBlock.blockId == endBlockId) {
				console.log("found solution");
				let solution = [currentBlock.blockId];
				let tempBlock = prevBlock; //temp block for reference

				//reiterate backwards through all branches to root to get path traveled
				for (let i = stack.length - 2; i > 0; i--) {
					let currentLayer = stack[i];
					let currentBlockLink = currentLayer.find(v => v.current == tempBlock);
					solution.push(currentBlockLink.current.blockId);
					tempBlock = currentBlockLink.previous;
				}

				return solution.reverse(); //return to caller function
			}

			//iterate through all possible connections in current leaf block
			for (let i = 0; i < currentBlock.connectors.length; i++) {
				for (let j = 0; j < currentBlock.connectors[i].length; j++) {
					let neighborBlockId = currentBlock.connectors[i][j]; //neighboring block
					//make sure block exists and isn't the previous block
					if (neighborBlockId != null && neighborBlockId != prevBlock.blockId) { 
						//make sure the move to neighboring block is valid
						if (currentBlock.connectors[i].find(id => id === prevBlock.blockId) != undefined) {
							//add move and push leaf to new branch
							let neighborBlock = lineLayout.find(v => v.blockId === neighborBlockId);
							newBranches.push({
								current: neighborBlock,
								previous: currentBlock,
							});
						}
					}
				}
			}
		}

		stack.push(newBranches);
	}
	
	console.warn(`END PATHFIND: NO SOLUTION FOUND FROM ${startBlockId} TO ${endBlockId} STARTING AT ${_prevBlockId}`);
}

function routeTrain(stations, lineColor) {
	let lineLayout = lineColor == "red" ? trackLayout.redLine : trackLayout.greenLine;
	let prevStationId = lineColor === "red" ? -1.1 : -1.5;
	let route = [prevStationId, lineColor === "red" ? -1 : -1.6];
	
	// console.log("starting route train");

	// iterate through each station and find path
	stations.forEach(nextStationId => {
		let subroute = bfs(route[route.length - 1], nextStationId, route[route.length - 2], lineLayout);
		console.log(subroute);
		route = route.concat(subroute);
		prevStationId = nextStationId;
	});

	return route;
}

function CTC() {

	const [scheduleModalShow, setScheduleModalShow] = useState(false);
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [selectedBlock, setSelectedBlock] = useState({});
	const [trainsList, setTrainsList] = useState({});
	
	//update trains list
	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);
	
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
					selectedBlock={selectedBlock}
				/>
				<TrackView
					selectedTrain={selectedTrain}
					trainsList={trainsList}
					setSelectedBlock={setSelectedBlock}
				/>
			</header>
			<ScheduleModal
        show={scheduleModalShow}
        onHide={() => setScheduleModalShow(false)}
				trainsList={trainsList}
      />
			<AddTrainModal 
				show={addTrainModal}
				trainsList={trainsList}
				onHide={() => setAddTrainModal(false)}
				routeTrain={routeTrain}
			/>
		</div>
	)
}

export default CTC
