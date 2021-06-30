import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import config from '../config';
import Firebase from "firebase";
// import { SpeedContext } from --------ooooooooooooooooooooooooooooooooooooooooooooooooo'../SpeedProvider';
// import { Container, Col } from 'postcss-safe-parser/node_modules/postcss';
import {DatabaseGet, DatabaseSet, InitializeJsonTree} from '../Database';
import VarDisplay from './VarDisplay';
import VarIndicator from './VarIndicator';
import ButtonIndicator from './ButtonIndicator';

function TrainStatus() {
	
	const [nextStation, setNextStation] = useState('default');

	// if (!Firebase.apps.length) {
	// 	Firebase.initializeApp(config);
	// }else {
	// 	Firebase.app(); // if already initialized, use that one
	// }

	// function getNextStationData() {
	// 	let ref = Firebase.database().ref('/NEXT_STATION');
	// 	ref.on('value', snapshot => {
	// 		const state = `${snapshot.val()}`;
	// 		setNextStation(state);
	// 	});
	// }

	// function setNextStationData(newState) {
	// 	Firebase.database().ref('/NEXT_STATION').set(newState);
	// }


	return (
		<div style={{borderStyle: 'solid', height:"90%", width: '105%'}}>
			<h1>Train Status</h1>
			<Container>
				<Col>
					<VarDisplay varName='NextStation' message='Next Station'/>
					<VarDisplay varName='CurrentStation' message='Current Station'/>
					<VarDisplay varName='Power' message='Commanded Power [W]'/>
					<VarDisplay varName='Passengers' message='Passengers'/>
					<h3>Crew: 2</h3>
					<VarIndicator varName='ExternalLightState' message='External Lights'/>
					<VarIndicator varName='InternalLightState' message='Internal Lights'/>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Temperature</h1>
							<VarDisplay varName='InternalTemperature' message='Internal'/>
							<VarDisplay varName='ExternalTemperature' message='External'/>
						</Col>
					</Container>
				</Col>
				<Col>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Brakes</h1>
							<VarIndicator varName='SBrakeStatus' message='Brake'/>
							<ButtonIndicator varName='EBrakeStatus' message='Emergency Brake'/>
						</Col>
					</Container>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Doors</h1>
							<Row>
								<VarIndicator varName='LeftDoorStatus' message='Left'/>
								<VarIndicator varName='RightDoorStatus' message='Right'/>
							</Row>
							<ButtonIndicator varName='EDoorStatus' message='Emergency Door'/>
						</Col>
					</Container>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Failure Modes</h1>
							<ButtonIndicator varName='EngineFailure' message='Engine'/>
							<ButtonIndicator varName='SignalFailure' message='Signal'/>
							<ButtonIndicator varName='BrakeFailure' message='Brake'/>
						</Col>
					</Container>
				</Col>
			</Container>
		</div>
	)
}

export default TrainStatus
