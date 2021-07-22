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
import VarDisplay from '../components/VarDisplayMulti';
import { DatabaseGetMulti } from '../components/DatabaseMulti';
import { DatabaseSetMulti } from '../components/DatabaseMulti';
import SplitButton from 'react-bootstrap/SplitButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// I think I'm doing way too many fetches....see the console
function StatesPanel({selectedBlock}){

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	const [actualTemp, setTemp] = useState(0);
	// const [desiredTemp, setDesTemp] = useState(0);
	const [trackOccup, setTrackOccup] = useState(0);
	const [failBrokenRail, setFailBrokenRail] = useState();
	// const [failTrackCirc, setFailTrackCirc] = useState(0);
	// const [failBeacon, setFailBeacon] = useState(0);

	console.log( `INSIDE STATES PANEL: ${selectedBlock}` );
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setTemp, `/GreenLine/${selectedBlock}/Temperature`), 500);}, [selectedBlock]);
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setTrackOccup, `/GreenLine/${selectedBlock}/Occupancy`), 500);}, [selectedBlock]);
	// Failure modes
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setFailBrokenRail, `/GreenLine/${selectedBlock}/FailureBrokenRail`), 500);}, [selectedBlock]);
	// useEffect(() => {setTimeout(() => DatabaseGet(setTemp, 'Temperature', parentName), 500);}, [parentName]);
	// useEffect(() => {setTimeout(() => DatabaseGet(setDesTemp, 'DesiredTrackTemperature', parentName),500);}, [parentName]);
	// useEffect(() => {setTimeout(() => DatabaseGet(setTrackOccup, 'TrackOccupancy', parentName), 500);}, [parentName]);
	// useEffect(() => {setTimeout(() => DatabaseGet(setFailBrokenRail, 'FailureBrokenRail', parentName),500);}, [parentName]);
	// useEffect(() => {setTimeout(() => DatabaseGet(setFailTrackCirc, 'FailureTrackCircuit', parentName),500);}, [parentName]);
	// useEffect(() => {setTimeout(() => DatabaseGet(setFailBeacon, 'BeaconFailure', parentName),500);}, [parentName]);

	// Checking if track heater needs to be turned on
	// useEffect(() => {DatabaseSet((actualTemp < desiredTemp) ? true : false, "TrackHeater", parentName)}, [actualTemp, desiredTemp, parentName]);
	// Disable track components if a failure is detected
	// useEffect(() => {DatabaseSet(failBrokenRail ? false : true, "TrackOccupancy", parentName);}, [failBrokenRail]);

	return (
		<div style={{
			textAlign: "center",
			background: "#cfdfe3",
			width: "70%",
		}}>
			<h3>CURRENT STATES</h3>
			<div style={{
				textAlign: "left",
				paddingLeft: 20,
				paddingRight: 20,
				paddingBottom: 10,
			}}>
				<Container fluid>
					<Row>
						<Col xs={4}>
							<h4>
								<VarDisplay message='AVAILABILITY' path={`/GreenLine/${selectedBlock}/Occupancy`} />
								{/* <WSMIndicator parentName={parentName} varName='TrackOccupancy' message='AVAILABILITY'/> */}
							</h4>
							<VarDisplay message='Track occupied?' path={`/GreenLine/${selectedBlock}/Occupancy`} />
							<VarDisplay message='Track under maintenance?' path={`/GreenLine/${selectedBlock}/MaintenanceStatus`} />
							<VarDisplay message='Maximum capacity?' path={`/GreenLine/${selectedBlock}/MaxCapacity`} />
							<VarDisplay message='Current Temperature' path={`/GreenLine/${selectedBlock}/Temperature`} />
							{/* <p><WSMInverseIndicator parentName={parentName} varName='TrackOccupancy' message='Track occupied?'/></p>
							<p><WSMInverseIndicator parentName={parentName} varName='MaintenanceStatus' message='Track under maintenance?'/></p>
							<p><WSMInverseIndicator parentName={parentName} varName='MaxCapacity' message='Maximum capacity?'/></p> */}
						</Col>
						<Col xs={4}>
							<h4>TRACK ELEMENTS</h4>
							<p>
								<div>
								<ButtonGroup>
									<DropdownButton as={ButtonGroup} title="Beacon-1 Info" id="bg-nested-dropdown" size="sm">
										<Dropdown.Item eventKey="1">
											<VarDisplay message='Current Station' path={`/GreenLine/${selectedBlock}/Beacon-1/CurrentStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="2">
											<VarDisplay message='Next Station' path={`/GreenLine/${selectedBlock}/Beacon-1/NextStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="3">
											<VarDisplay message='Station Side' path={`/GreenLine/${selectedBlock}/Beacon-1/StationSide`} />
										</Dropdown.Item>
									</DropdownButton>
									<DropdownButton as={ButtonGroup} title="Beacon+1 Info" id="bg-nested-dropdown" size="sm">
										<Dropdown.Item eventKey="1">
											<VarDisplay message='Current Station' path={`/GreenLine/${selectedBlock}/Beacon+1/CurrentStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="2">
											<VarDisplay message='Next Station' path={`/GreenLine/${selectedBlock}/Beacon+1/NextStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="3">
											<VarDisplay message='Station Side' path={`/GreenLine/${selectedBlock}/Beacon+1/StationSide`} />
										</Dropdown.Item>
									</DropdownButton>
								</ButtonGroup>
								</div>							
							</p>
							<VarDisplay message='Signal State' path={`/GreenLine/${selectedBlock}/CrossingLights`} />
							<VarDisplay message='Railway Crossing' path={`/GreenLine/${selectedBlock}/LevelCrossingState`} />
							<VarDisplay message='Track Heater' path={`/GreenLine/${selectedBlock}/TrackHeater`} />
							<VarDisplay message='Current Temperature [°F]' path={`/GreenLine/${selectedBlock}/Temperature`} />
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p>
								<VarDisplay message='Passengers boarding' path={`/GreenLine/${selectedBlock}/Station/PassengersBoarding`} />
								<VarDisplay message='Passengers departing' path={`/GreenLine/${selectedBlock}/Station/PassengersDeparting`} />
							</p>
							<h4>FAILURE MODES</h4>
								<ButtonGroup size="sm">
									<Button variant="outline-dark"
										size="sm"
										onClick={()=>{
											DatabaseGetMulti(setFailBrokenRail, `/GreenLine/${selectedBlock}/FailureBrokenRail`);
											DatabaseSetMulti(!failBrokenRail, `/GreenLine/${selectedBlock}/FailureBrokenRail`);
										}}>
									Broken Rail
									</Button>
									<Button variant="outline-dark" size="sm">
										Track Circuit
									</Button>
									<Button variant="outline-dark" size="sm">
										Beacon Failure
									</Button>
								</ButtonGroup>
								
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default StatesPanel