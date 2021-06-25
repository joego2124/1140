import React, { useEffect } from 'react';

import config from '../config';
import Firebase from "firebase";
import { SpeedContext } from '../SpeedProvider';
import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';

function CTC() {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	// function getLedData() {
	// 	let ref = Firebase.database().ref('/LED_STATUS');
	// 	ref.on('value', snapshot => {
	// 		const state = `${snapshot.val()}`;
	// 		setLedState(state === "ON" ? true : false);
	// 	});
	// }

	// function setLedData(newState) {
	// 	Firebase.database().ref('/LED_STATUS').set(newState ? "ON" : "OFF");
	// }

	// useEffect(() => getLedData(), []);

	return (
		<div>
			<header className="App-header">
				<TrainsPanel />
				<MainPanel />
				<TrackView/>
			</header>
		</div>
	)
}

export default CTC
