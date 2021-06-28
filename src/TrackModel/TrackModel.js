import React, { useEffect } from 'react';

import config from '../config';
import Firebase from "firebase";
import PropertiesPanel from './PropertiesPanel';
import StatesPanel from './StatesPanel';

function TrackModel() {

	document.body.style.overflow='hidden';

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	return (
		<div style={{
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "flex-end",
			bottom: 0,
			width: "100%",
			position: "absolute",
		}}>
			<PropertiesPanel />
			<StatesPanel />
		</div>
	)
}

export default TrackModel
