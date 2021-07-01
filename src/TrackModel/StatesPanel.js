import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../config';
import Firebase from "firebase";
import WSMDisplay from './WSMVarDisplay';
import WSMIndicator from './WSMVarIndicator';
import WSMInverseIndicator from './WSMInverseVarIndicator';
import { DatabaseSet } from '../Database';
import { DatabaseGet } from '../Database';

function StatesPanel(parentName){

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	const [actualTemp, setTemp] = useState(0);
	const [desiredTemp, setDesTemp] = useState(0);
	const [failBrokenRail, setFailBrokenRail] = useState(0);
	const [failTrackCirc, setFailTrackCirc] = useState(0);
	const [failBeacon, setFailBeacon] = useState(0);

	useEffect(() => {setTimeout(() => DatabaseGet(setTemp, 'Temperature', parentName), 500);}, [parentName]);
	useEffect(() => {setTimeout(() => DatabaseGet(setDesTemp, 'DesiredTrackTemperature', parentName),500);}, [parentName]);
	useEffect(() => {setTimeout(() => DatabaseGet(setFailBrokenRail, 'FailureBrokenRail', parentName),500);}, [parentName]);
	useEffect(() => {setTimeout(() => DatabaseGet(setFailTrackCirc, 'FailureTrackCircuit', parentName),500);}, [parentName]);
	useEffect(() => {setTimeout(() => DatabaseGet(setFailBeacon, 'BeaconFailure', parentName),500);}, [parentName]);

	// Checking if track heater needs to be turned on
	useEffect(() => {DatabaseSet((actualTemp < desiredTemp) ? true : false, "TrackHeater", parentName)}, [actualTemp, desiredTemp, parentName]);
	// Disable track components if a failure is detected
	// useEffect(() => {DatabaseSet(failBrokenRail ? false : true, "TrackOccupancy", parentName);}, [failBrokenRail]);

	return (
		<div style={{
			textAlign: "center",
			background: "#cfdfe3",
			width: "70%",
		}}>
			<h1>CURRENT STATES</h1>
			<div style={{
				textAlign: "left",
				paddingLeft: 50,
				paddingRight: 50,
				paddingBottom: 10,
			}}>
				<Container fluid>
					<Row>
						<Col xs={4}>
							<h4>
								<WSMIndicator parentName={parentName} varName='TrackOccupancy' message='AVAILABILITY'/>
							</h4>
							<p></p>
							<p></p>
							<p><WSMInverseIndicator parentName={parentName} varName='TrackOccupancy' message='Track occupied?'/></p>
							<p><WSMInverseIndicator parentName={parentName} varName='MaintenanceStatus' message='Track under maintenance?'/></p>
							<p><WSMInverseIndicator parentName={parentName} varName='MaxCapacity' message='Maximum capacity?'/></p>
						</Col>
						<Col>
							<h4>TRACK ELEMENTS</h4>
							<p></p>
							<p></p>
							<WSMDisplay parentName={parentName} varName='Beacon' message='Beacon Info'/>
							<WSMDisplay parentName={parentName} varName='SignalState' message='Signal State'/>
							<WSMDisplay parentName={parentName} varName='SwitchState' message='Switch State'/>
							<p></p>
							<WSMInverseIndicator parentName={parentName} varName='RailwayCrossingState' message='Railway Crossing'/>
							<WSMInverseIndicator parentName={parentName} varName='TrackHeater' message='Track Heater'/>
							<WSMDisplay parentName={parentName} varName='Temperature' message='Current Temperature [°F]'/>
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p></p>
							<p></p>
							<p>Boarding: </p>
							<p>Departing: </p>
							<h4>FAILURE MODES</h4>
							<p>
								<Button variant="outline-dark" onClick={()=>{DatabaseSet(!failBrokenRail, 'FailureBrokenRail', parentName);}}>
									<WSMInverseIndicator parentName={parentName} varName='FailureBrokenRail' message='Broken Rail'/>
								</Button>
							</p>
							<p>
								<Button variant="outline-dark" onClick={()=>{DatabaseSet(!failTrackCirc, 'FailureTrackCircuit', parentName);}}>
									<WSMInverseIndicator parentName={parentName} varName='FailureTrackCircuit' message='Track Circuit'/>
								</Button>
							</p>
							<p>
								<Button variant="outline-dark" onClick={()=>{DatabaseSet(!failBeacon, 'BeaconFailure', parentName);}}>
									<WSMInverseIndicator parentName={parentName} varName='BeaconFailure' message='Beacon Failure'/>
								</Button>
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default StatesPanel