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
	const [blockList, setBlockList] = useState([]);
	const [selectedBlock, setSelectedBlock] = useState(`1`);
	const [lineName, setLineName] = useState("RedLine");

	// Update trains list
	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	function getBlockListData() {
		let tempList = [];
		for (const [key,value] of Object.entries(jsonTree)) {
			tempList.push(value);
		}
		setBlockList(tempList);
	}

	// Get the line name
	// useEffect(() => 
	// 	if( )
	// 	console.log(`IN TRACKMODEL: ${lineColor}`),
	// 	[selectedBlock]
	// 	);
	useEffect(() => console.log(`IN TRACKMODEL: ${selectedBlock}`), [selectedBlock]);
	useEffect(() => console.log(`linename: `, lineName), [lineName]);

	useEffect(() => getBlockListData(), [jsonTree]);

	return (
		<>
			<div>
				<TrackView setSelectedBlock={setSelectedBlock} setLineName={setLineName} trainsList={trainsList} blockList={blockList} />
			</div>
			<div style={{
				position: "absolute",
				top: "70px",
				left: "100px"
			}}>
				<h2> {`Currently Selected: ${selectedBlock}`} </h2>
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
				<PropertiesPanel selectedBlock={selectedBlock} />
				<StatesPanel selectedBlock={selectedBlock} />
			</div>
			
		</>
	)
}

export default TrackModel
