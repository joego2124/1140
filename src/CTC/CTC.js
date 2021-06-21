import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import config from '../config';
import Firebase from "firebase";
import { SpeedContext } from '../SpeedProvider';
import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';

function CTC() {

	const [speedState] = useContext(SpeedContext);

	const [ledState, setLedState] = useState(false);

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	function getLedData() {
		let ref = Firebase.database().ref('/LED_STATUS');
		ref.on('value', snapshot => {
			const state = `${snapshot.val()}`;
			setLedState(state === "ON" ? true : false);
		});
	}

	function setLedData(newState) {
		Firebase.database().ref('/LED_STATUS').set(newState ? "ON" : "OFF");
	}

	useEffect(() => getLedData(), []);

	return (
		<div>
			<header className="App-header">
				<TrainsPanel />
				<TrackView/>
			</header>
		</div>
	)
}

export default CTC
