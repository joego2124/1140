import React, { useEffect } from 'react';
import config from '../config';
import Firebase from "firebase";
import { SpeedContext } from '../SpeedProvider';
import BrakingOptions from './BrakingOptions';
import DoorOptions from './DoorOptions';
import TrainStatus from './TrainStatus';
import TrainsPanel from '../CTC/TrainsPanel.js';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function TrainContoller() {

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
			<Container>
				<Col xs={4}>
					<DoorOptions />
				</Col>
				<Col xs={4}>
					<BrakingOptions />
				</Col>
			</Container>
			<header className="App-header">
				<TrainStatus />
                <TrainsPanel />
			</header>
		</div>
	)
}

export default TrainContoller
