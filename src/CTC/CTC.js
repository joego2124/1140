import React, { useState, useEffect } from 'react';

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';
import AddTrainModal from './AddTrainModal';

import { DatabaseGet, DatabaseSet }  from "../Database";

var trackLayout = require("./TrackLayout.json");

function bfs(startBlockId, endBlockId, _prevBlockId, lineLayout) {
	console.warn("STARTING PATHFIND");

	let startBlock = lineLayout.find(v => v.blockId === startBlockId);
	let _prevBlock = lineLayout.find(v => v.blockId === _prevBlockId);
	
	let stack = [[{current: startBlock, previous: _prevBlock}]];

	let counter = 0;
	while (true) {

		let currBranches = stack[stack.length - 1], newBranches = [];
		console.log(stack[stack.length - 1]);

		for (let k = 0; k < currBranches.length; k++) {
			let currentBlock = currBranches[k].current;
			let prevBlock = currBranches[k].previous;

			console.log(`currentBlock: ${currentBlock.blockId}, prevBlock: ${prevBlock.blockId}`);

			if (currentBlock.blockId == endBlockId) {
				console.log("found solution");

				let solution = [currentBlock.blockId];
				let tempBlock = prevBlock;
				for (let i = stack.length - 2; i > 0; i--) {
					let currentLayer = stack[i];
					let currentBlockLink = currentLayer.find(v => v.current == tempBlock);
					solution.push(currentBlockLink.current.blockId);
					tempBlock = currentBlockLink.previous;
				}
				console.log(solution);

				return true;
			}

			for (let i = 0; i < currentBlock.connectors.length; i++) {
				for (let j = 0; j < currentBlock.connectors[i].length; j++) {
					let neighborBlockId = currentBlock.connectors[i][j];
					if (neighborBlockId != null && neighborBlockId != prevBlock.blockId) {
						if (currentBlock.connectors[i].find(id => id === prevBlock.blockId) != undefined) {
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
		counter++;
	}
	
	console.warn("END PATHFIND");
}

// function routeTrain(stations) {
// 	let yardId = trackLayout.blocks.find(v => v.section === "YARD").blockId;
// 	let prevStationId = yardId, prevBlockId = yardId;
// 	let route = [];

	

// 	prevBlockId = 34;
// 	console.log(pathfind(35, 34));

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
	
// 	return route;
// }

function CTC() {

	const [scheduleModalShow, setScheduleModalShow] = useState(false);
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	// console.log(routeTrain([35, 16]));
	console.log(bfs(9, 60, -1, trackLayout.redLine));

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
					trainsList={trainsList}
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
