import React, { useEffect, useState } from 'react';

import config from '../config';
import Firebase from "firebase";
import PropertiesPanel from './PropertiesPanel';
import StatesPanel from './StatesPanel';
import TrackView from './TrackView';
import { DatabaseGetMulti } from '../components/DatabaseMulti';
import { DatabaseGet, DatabaseSet }  from "../Database";

function TrackModel() {

	document.body.style.overflow='hidden';

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	const [trainsList, setTrainsList] = useState({});
	const [jsonTree, setJsonTree] = useState([]);
	const [blockLists, setBlockLists] = useState({});
	const [redBlocks, setRedBlocks] = useState([]);
	const [greenBlocks, setGreenBlocks] = useState([]);
	const [selectedBlock, setSelectedBlock] = useState(`1`);
	const [lineName, setLineName] = useState("RedLine");

	//update trains and blocks list
	useEffect(() => {
		// Firebase.database().ref('/TrainList').on('value', snapshot => {
		// 	let list = snapshot.val();
		// 	if(list != undefined && list != null){
		// 		list.databasePath = "/TrainList";
		// 	}
		// 	else
		// 		list = [];
		// 	setTrainsList(list);
		// });
		Firebase.database().ref('/GreenLine').on('value', snapshot => {
			let blocks = [];
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

	// Update trains list
	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	// function getBlockListData() {
	// 	let tempList = [];
	// 	for (const [key,value] of Object.entries(jsonTree)) {
	// 		tempList.push(value);
	// 	}
	// 	setBlockList(tempList);
	// }

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

	useEffect(() => console.log(`IN TRACKMODEL: `, selectedBlock), [selectedBlock]);
	useEffect(() => console.log(`linename: `, lineName), [lineName]);

	// useEffect(() => getBlockListData(), [jsonTree]);

	return (
		<>
			<div>
				<TrackView setSelectedBlock={setSelectedBlock} setLineName={setLineName} trainsList={trainsList} blockLists={blockLists} />
			</div>
			<div style={{
				position: "absolute",
				top: "70px",
				left: "100px"
			}}>
				<h2> {`Currently Selected: ${selectedBlock.BlockNumber} (${selectedBlock.Line})`} </h2>
			</div>
			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-start",
				alignItems: "flex-end",
				alignContent: "flex-start",
				bottom: 0,
				width: "100%",
				position: "absolute",
			}}>
				<PropertiesPanel selectedBlock={selectedBlock} lineName={lineName} />
				<StatesPanel selectedBlock={selectedBlock} lineName={lineName} />
			</div>
			
		</>
	)
}

export default TrackModel
