import React, { useEffect, useState } from 'react';

import config from '../config';
import Firebase from "firebase";
import PropertiesPanel from './PropertiesPanel';
import StatesPanel from './StatesPanel';
import TrackView from './TrackView';
import UploadLayoutButton from './UploadLayoutButton';
import { left } from '@popperjs/core';

import { DatabaseGet, DatabaseSet }  from "../Database";

function TrackModel() {

	document.body.style.overflow='hidden';

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	const [parentName, setParentName] = useState('Block1');
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	return (
		<>
			{/* <div style={{
				paddingTop: 20,
				textAlign: "left",
				paddingLeft: 100
			}}>
				<UploadLayoutButton />
			</div> */}
			{/* <div style={{
				paddingTop: 50,
				textAlign: "right",
				paddingRight: 340
			}}>
				<h2>Test of Interactive Track Layout</h2>
			</div> */}
			<div>
			{/* <div style={{paddingTop: 140,
							textAlign: "right",
							paddingRight: 500 }}> */}
					<TrackView setParentName={setParentName} trainsList={trainsList}/>
			</div>
			<div>
				<h2 style={{paddingTop: 220,
							textAlign: "left",
							paddingLeft: 80 }}>
					Currently Selected: {parentName}
				</h2>
			</div>
			<div style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "flex-end",
				bottom: 0,
				width: "100%",
				position: "absolute",
			}}>
				{/* <PropertiesPanel parentName={parentName}/>
				<StatesPanel parentName={parentName}/> */}
			</div>
		</>
	)
}

export default TrackModel
