import React, { useEffect, useState } from 'react';

import config from '../config';
import Firebase from "firebase";
import PropertiesPanel from './PropertiesPanel';
import StatesPanel from './StatesPanel';
import TrackView from './TrackView';

function TrackModel() {

	document.body.style.overflow='hidden';

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	const [parentName, setParentName] = useState('Block1');

	return (
		<>
			<div>
				<p></p>
				<TrackView setParentName={setParentName}/>
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
				<PropertiesPanel parentName={parentName}/>
				<StatesPanel />
			</div>
		</>
	)
}

export default TrackModel
