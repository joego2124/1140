import React, { useState, useEffect } from 'react';
import Firebase from "firebase";

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';
import AddTrainModal from './AddTrainModal';

import { DatabaseGet, DatabaseSet }  from "../Database";

var trackLayout = require("./TrackLayout.json");

//parallel breadth first search on bidirectional line respecting unidirectional train travel
function bfs(startBlockId, endBlockId, _prevBlockId, lineLayout) {
	console.log(`[CTC] STARTING PATHFIND, startBlockId: ${startBlockId} endBlockId: ${endBlockId}`);

	//define initial blocks
	let startBlock = lineLayout.find(v => v.blockId === startBlockId);
	let _prevBlock = lineLayout.find(v => v.blockId === _prevBlockId);
	
	//define stack with starting block
	let stack = [[{current: startBlock, previous: _prevBlock}]]; 

	let count = 0;

	while (stack.length > 0) {
		count++;
		if (count > 300) break; // hard limit
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
					// if (currentBlock.blockId === 29 && neighborBlockId != null) {
					// 	console.log(neighborBlockId, neighborBlockId != prevBlock.blockId, currentBlock.connectors[i].find(id => id === prevBlock.blockId));
					// }
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
	const [redBlocks, setRedBlocks] = useState([]);
	const [greenBlocks, setGreenBlocks] = useState([]);
	const [blockLists, setBlockLists] = useState({});

	//update trains and blocks list
	useEffect(() => {
		Firebase.database().ref('/TrainList').on('value', snapshot => {
			let list = snapshot.val();
			if(list != undefined && list != null){
				list.databasePath = "/TrainList";
			}
			else
				list = [];
			setTrainsList(list);
		});
		Firebase.database().ref('/GreenLine').on('value', snapshot => {
			let blocks = [];
			console.log(snapshot.val());
			for (const [index, block] of Object.entries(snapshot.val())) {
				blocks.push(block);
			}
			blocks.databasePath = "/GreenLine";
			setGreenBlocks(blocks);
		});
		Firebase.database().ref('/RedLine').on('value', snapshot => {
			let blocks = [];
			for (const [index, block] of Object.entries(snapshot.val())) {
				blocks.push(block);
			}
			blocks.databasePath = "/RedLine";
			setRedBlocks(blocks);
		});
	}, []);

	useEffect(() => {
		console.log("[CTC] red or green database line blocks changed");
		let newBlockList = {"red": redBlocks, "green": greenBlocks};
		if (selectedBlock.Line != undefined) {
			let color = selectedBlock.Line.toLowerCase().includes("red") ? "red" : "green";
			let blockIndex = selectedBlock.BlockNumber < 0 ? 0 : selectedBlock.BlockNumber;
			let updatedSelectedBlock = newBlockList[color][blockIndex];
			updatedSelectedBlock.databasePath = `${newBlockList[color].databasePath}/${blockIndex}`;
			setSelectedBlock(updatedSelectedBlock);
		}
		setBlockLists(newBlockList);
	}, [redBlocks, greenBlocks]);

	useEffect(() => console.log(`[CTC] new selectedBlock, ${selectedBlock.databasePath}`), [selectedBlock]);
	useEffect(() => console.log(`[CTC] new selectedTrain, ${selectedTrain.databasePath}`), [selectedTrain]);

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
					blockLists={blockLists}
				/>
			</header>
			<ScheduleModal
				show={scheduleModalShow}
				onHide={() => setScheduleModalShow(false)}
				trainsList={trainsList}
				routeTrain={routeTrain}
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
