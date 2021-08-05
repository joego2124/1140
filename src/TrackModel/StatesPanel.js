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

function StatesPanel({ selectedBlock, lineName }){

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	var trackHeater;
	const [trackOccup, setTrackOccup] = useState(0);
	const [failBrokenRail, setFailBrokenRail] = useState();

	const [tempModalShow, setTempModalShow] = useState(false);
	const [beaconModalShow, setBeaconModalShow] = useState(false);
	// const [failTrackCirc, setFailTrackCirc] = useState(0);
	// const [failBeacon, setFailBeacon] = useState(0);

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
								{' '}AVAILABILITY
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
									lineName={`${lineName}`}
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
								<WSMInverseIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/CrossingLights`} />
								{' '}Signal State
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`${selectedBlock.databasePath}/LevelCrossingState`} />
								{' '}Railway Crossing
								<br />
								<WSMIndicator selectedBlock={selectedBlock} path={`/${lineName}/TrackHeater`} />
								{' '}Track Heater
								<br />
								<VarDisplayMulti message='Current Temperature [°F]' path={`/${lineName}/CurrentTemperature`} />
								<br />
								<Button size="sm" 
									onClick={()=>
										{
											Firebase.database().ref(`/${lineName}/TrackHeater`).once( 'value', snapshot => {
												trackHeater = snapshot.val();
											});
											Firebase.database().ref(`/${lineName}/TrackHeater`).set( !trackHeater );;
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
								<ButtonGroup size="sm">
									<Button variant="outline-dark"
										size="sm"
										onClick={()=>{
											// DatabaseGetMulti(setFailBrokenRail, `/${lineName}/${selectedBlock}/FailureBrokenRail`);
											// DatabaseSetMulti(!failBrokenRail, `/${lineName}/${selectedBlock}/FailureBrokenRail`);
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