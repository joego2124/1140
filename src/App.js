import logo from './pittlogo.png';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import config from './config';

import Firebase from "firebase";

function App() {

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
			console.log(`LED STATE INIT: ${state}`);
			setLedState(state == "ON" ? true : false);
		});
	}

	function setLedData(newState) {
		Firebase.database().ref('/LED_STATUS').set(newState ? "ON" : "OFF");
	}

	useEffect(() => getLedData(), []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					ECE1140 Mission Control
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
							console.log(`ON CLICK: ${newState}`);
						}
					}>
					{ ledState ? "Turn OFF LED" : "Turn ON LED" }
				</Button>
				</div>
			</header>
		</div>
	);
}

export default App;
