import logo from './pittlogo.png';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import config from './config';
import Firebase from "firebase";
import { SpeedContext } from './SpeedProvider';

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
				{
					!speedState.paused ? <img alt="logo" src={logo} style={{
						height: "40vmin",
						pointerEvents: "none",
						animation: `App-logo-spin ${1 / speedState.speed * 5}s infinite linear`,
					}}/> : <img alt="logo" src={logo} style={{
						height: "40vmin",
						pointerEvents: "none",
					}}/>
				}
				<p>
					CTC Dashboard
				</p>
				<p>{`Paused: ${speedState.paused}`}</p>
				<p>{`Speed: x${speedState.speed}`}</p>
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
