import React, { useEffect } from 'react';

import config from '../config';
import Firebase from "firebase";
import MainPanel from './MainPanel';

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
			<MainPanel />
			<MainPanel />
		</div>
	)
}

export default TrackModel
