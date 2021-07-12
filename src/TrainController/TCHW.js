import React, { useEffect } from 'react';
import config from '../config';
import Firebase from "firebase";
import Gains from './Gains';
import TrainStatusRO from './TrainStatusRO';
import TrainsPanel from '../CTC/TrainsPanel.js';

function TCHW() {

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
			<div style={{
				paddingLeft: '275px'
			}}>
				<div style={{
					display: 'flex',
					flexDirection: 'row'
				}}>
					<div style={{
						size: '400px',
						paddingBottom: '200px',
						paddingTop: '50px',
						border: '1px solid #ddd',
						flexGrow: '1'
					}}>
						<Gains/>
						<div />
					</div>
				</div>
				<TrainStatusRO />
			</div>
			<TrainsPanel />
		</div>
	)
}

export default TCHW
