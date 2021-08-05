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
import SetBeaconInfoModal from './SetBeaconInfoModal';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function StatesPanel({ selectedBlock, lineName }){

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	var trackHeater;
	var brokenRailFailure, trackCircuitFailure, beaconFailure;
	const [variantRail, setVariantRail] = useState("outline-dark");
	const [variantTrackCircuit, setVariantTrackCircuit] = useState("outline-dark");
	const [variantBeacon, setVariantBeacon] = useState("outline-dark");
	const [trackOccup, setTrackOccup] = useState(0);

	const [tempModalShow, setTempModalShow] = useState(false);
	const [beaconModalShow, setBeaconModalShow] = useState(false);

	// Set database failure modes upon start-up
	useEffect(() => {
		Firebase.database().ref(`${selectedBlock.databasePath}/FailureBrokenRail`).set( false );
		Firebase.database().ref(`${selectedBlock.databasePath}/FailureTrackCircuit`).set( false );
		Firebase.database().ref(`${selectedBlock.databasePath}/BeaconFailure`).set( false );
	}, []);
	// Update color of faliure mode buttons when switching blocks
	useEffect(() => {
		Firebase.database().ref(`${selectedBlock.databasePath}/FailureBrokenRail`).once( 'value', snapshot => {
			brokenRailFailure = snapshot.val();
		});
		Firebase.database().ref(`${selectedBlock.databasePath}/FailureTrackCircuit`).once( 'value', snapshot => {
			trackCircuitFailure = snapshot.val();
		});
		Firebase.database().ref(`${selectedBlock.databasePath}/BeaconFailure`).once( 'value', snapshot => {
			beaconFailure = snapshot.val();
		});
		if( brokenRailFailure ? setVariantRail("danger") : setVariantRail("outline-dark"));
		if( trackCircuitFailure ? setVariantTrackCircuit("danger") : setVariantTrackCircuit("outline-dark"));
		if( beaconFailure ? setVariantBeacon("danger") : setVariantBeacon("outline-dark"));
	}, [selectedBlock]);

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
								<WSMInverseIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/Occupancy`} />
								{' '}OCCUPANCY
							</h4>
							<div>
								<WSMIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/Occupancy`} />
								{' '}Track occupied?
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/MaintenanceStatus`} />
								{' '}Track under maintenance?
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/MaxCapacity`} />
								{' '}Maximum capacity?
							</div>
							<div>
								<br />
								<br />
								<br />
								<Button 
								 size="sm"
								 onClick={() => setBeaconModalShow(true)}>
									Edit Beacon Info
								</Button>
								<SetBeaconInfoModal 
									show={beaconModalShow} 
									lineName={`${selectedBlock.Line}Line`}
									onHide={() => {setBeaconModalShow(false)}}
									selectedBlock={selectedBlock}
								/>
							</div>
						</Col>
						<Col xs={4}>
							<h4>TRACK ELEMENTS</h4>
							<p>
								<div>
								<ButtonGroup>
									<DropdownButton as={ButtonGroup} title="Beacon-1 Info" id="bg-nested-dropdown" size="sm">
										<Dropdown.Item eventKey="1">
											<VarDisplayMulti message='Current Station' path={`${selectedBlock.databasePath}/Beacon-1/CurrentStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="2">
											<VarDisplayMulti message='Next Station' path={`${selectedBlock.databasePath}/Beacon-1/NextStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="3">
											<VarDisplayMulti message='Station Side' path={`${selectedBlock.databasePath}/Beacon-1/StationSide`} />
										</Dropdown.Item>
									</DropdownButton>

									<DropdownButton as={ButtonGroup} title="Beacon+1 Info" id="bg-nested-dropdown" size="sm">
										<Dropdown.Item eventKey="1">
											<VarDisplayMulti message='Current Station' path={`${selectedBlock.databasePath}/Beacon+1/CurrentStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="2">
											<VarDisplayMulti message='Next Station' path={`${selectedBlock.databasePath}/Beacon+1/NextStation`} />
										</Dropdown.Item>
										<Dropdown.Item eventKey="3">
											<VarDisplayMulti message='Station Side' path={`${selectedBlock.databasePath}/Beacon+1/StationSide`} />
										</Dropdown.Item>
									</DropdownButton>
								</ButtonGroup>
								</div>							
							</p>
							<div>
								<WSMInverseIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/Occupancy`} />
								{' '}Signal State
								<br />
								<WSMInverseIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/Authority`} />
								{' '}Railway Crossing
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`/${selectedBlock.Line}Line/TrackHeater`} />
								{' '}Track Heater
								<br />
								<VarDisplayMulti message='Current Temperature [°F]' path={`/${selectedBlock.Line}Line/CurrentTemperature`} />
								<br />
								<Button size="sm" 
									onClick={()=>
										{
											Firebase.database().ref(`/${selectedBlock.Line}Line/TrackHeater`).once( 'value', snapshot => {
												trackHeater = snapshot.val();
											});
											Firebase.database().ref(`/${selectedBlock.Line}Line/TrackHeater`).set( !trackHeater );;
										}}>
									Toggle Heater
								</Button>
							</div>
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p textAlign="left">
								<VarDisplayMulti message='Passengers boarding' path={`${selectedBlock.databasePath}/Station/PassengersBoarding`} />
								<br />
								<VarDisplayMulti message='Passengers departing' path={`${selectedBlock.databasePath}/Station/PassengersDeparting`} />
								<br />
								<VarDisplayMulti message='Ticket sales' path={`${selectedBlock.databasePath}/Station/Tickets`} />
							</p>
							<h4>FAILURE MODES</h4>
								<ButtonGroup 
									size="sm">
									<Button
										variant={variantRail}
										onClick={()=>{
											Firebase.database().ref(`${selectedBlock.databasePath}/FailureBrokenRail`).once( 'value', snapshot => {
												brokenRailFailure = snapshot.val();
											});
											Firebase.database().ref(`${selectedBlock.databasePath}/FailureBrokenRail`).set( !brokenRailFailure );
											// Set occupancy
											Firebase.database().ref(`${selectedBlock.databasePath}/Occupancy`).set( !brokenRailFailure );
											// Set color of button
											if( brokenRailFailure ? setVariantRail("outline-dark") : setVariantRail("danger"));
										}}>
										Broken Rail
									</Button>
									<Button
										variant={variantTrackCircuit}
										onClick={()=>{
											Firebase.database().ref(`${selectedBlock.databasePath}/FailureTrackCircuit`).once( 'value', snapshot => {
												trackCircuitFailure = snapshot.val();
											});
											Firebase.database().ref(`${selectedBlock.databasePath}/FailureTrackCircuit`).set( !trackCircuitFailure );
											// Set occupancy
											Firebase.database().ref(`${selectedBlock.databasePath}/Occupancy`).set( !trackCircuitFailure );
											// Set color of button
											if( trackCircuitFailure ? setVariantTrackCircuit("outline-dark") : setVariantTrackCircuit("danger"));
										}}>
										Track Circuit
									</Button>
									<Button
										variant={variantBeacon}
										onClick={()=>{
											Firebase.database().ref(`${selectedBlock.databasePath}/BeaconFailure`).once( 'value', snapshot => {
												beaconFailure = snapshot.val();
											});
											Firebase.database().ref(`${selectedBlock.databasePath}/BeaconFailure`).set( !beaconFailure );
											// Set occupancy
											Firebase.database().ref(`${selectedBlock.databasePath}/Occupancy`).set( !beaconFailure );
											// Set color of button
											if( beaconFailure ? setVariantBeacon("outline-dark") : setVariantBeacon("danger"));
										}}>
										Power Failure
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