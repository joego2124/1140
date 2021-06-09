import logo from './pittlogo.png';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import config from './config';

import Firebase from "firebase";

function CTC() {

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
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					CTC Dashboard
				</p>
				<div>
				<Button 
					variant={ ledState ? "secondary" : "primary" } 
					size="lg" 
					onClick={
						() => {
							const newState = !ledState
							setLedState(newState);
							setLedData(newState);
						}
					}>
					{ ledState ? "Turn OFF LED" : "Turn ON LED" }
				</Button>
				</div>
			</header>
		</div>
	)
}

export default CTC