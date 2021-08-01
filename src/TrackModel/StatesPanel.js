import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../config';
import Firebase from "firebase";
import WSMInverseIndicator from './WSMInverseVarIndicator';
import WSMIndicator from './WSMVarIndicator';
import VarDisplayMulti from '../components/VarDisplayMulti';
import { DatabaseGetMulti } from '../components/DatabaseMulti';
import { DatabaseSetMulti } from '../components/DatabaseMulti';
import SplitButton from 'react-bootstrap/SplitButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

	// console.log( `INSIDE STATES PANEL: ${selectedBlock}` );
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setTemp, `/GreenLine/${selectedBlock}/Temperature`), 500);}, [selectedBlock]);
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setTrackOccup, `/GreenLine/${selectedBlock}/Occupancy`), 500);}, [selectedBlock]);
	// Failure modes
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setFailBrokenRail, `/GreenLine/${selectedBlock}/FailureBrokenRail`), 500);}, [selectedBlock]);

	// Checking if track heater needs to be turned on
	// useEffect(() => {setTimeout(() =>  DatabaseGetMulti(setTemp, `/GreenLine/${selectedBlock}/Temperature`), 500);}, [selectedBlock]);

	///////////////////////////////////////////////////////////////
	//                          OLD CODE                         //
	///////////////////////////////////////////////////////////////
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
								<WSMInverseIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/Occupancy`} />
								{' '}AVAILABILITY
							</h4>
							<div>
								<WSMIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/Occupancy`} />
								{' '}Track occupied?
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/MaintenanceStatus`} />
								{' '}Track under maintenance?
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/MaxCapacity`} />
								{' '}Maximum capacity?
							</div>
						</Col>
						<Col xs={4}>
							<h4>TRACK ELEMENTS</h4>
							<p>
								<div>
								<ButtonGroup>
									<DropdownButton as={ButtonGroup} title="Beacon-1 Info" id="bg-nested-dropdown" size="sm">
										<Dropdown.Item eventKey="1">
											<VarDisplayMulti message='Current Station' path={`/GreenLine/${selectedBlock}/Beacon-1/CurrentStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="2">
											<VarDisplayMulti message='Next Station' path={`/GreenLine/${selectedBlock}/Beacon-1/NextStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="3">
											<VarDisplayMulti message='Station Side' path={`/GreenLine/${selectedBlock}/Beacon-1/StationSide`} />
										</Dropdown.Item>
									</DropdownButton>
									<DropdownButton as={ButtonGroup} title="Beacon+1 Info" id="bg-nested-dropdown" size="sm">
										<Dropdown.Item eventKey="1">
											<VarDisplayMulti message='Current Station' path={`/GreenLine/${selectedBlock}/Beacon+1/CurrentStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="2">
											<VarDisplayMulti message='Next Station' path={`/GreenLine/${selectedBlock}/Beacon+1/NextStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="3">
											<VarDisplayMulti message='Station Side' path={`/GreenLine/${selectedBlock}/Beacon+1/StationSide`} />
										</Dropdown.Item>
									</DropdownButton>
								</ButtonGroup>
								</div>							
							</p>
							<div>
								<WSMInverseIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/CrossingLights`} />
								{' '}Signal State
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/LevelCrossingState`} />
								{' '}Railway Crossing
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`/GreenLine/${selectedBlock}/TrackHeater`} />
								{' '}Track Heater
								<br />
								<VarDisplayMulti message='Current Temperature [°F]' path={`/GreenLine/CurrentTemperature`} />
							</div>
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p textAlign="left">
								<VarDisplayMulti message='Passengers boarding' path={`/GreenLine/${selectedBlock}/Station/PassengersBoarding`} />
								<br />
								<VarDisplayMulti message='Passengers departing' path={`/GreenLine/${selectedBlock}/Station/PassengersDeparting`} />
								<br />
								<VarDisplayMulti message='Ticket sales' path={`/GreenLine/${selectedBlock}/Station/Tickets`} />
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