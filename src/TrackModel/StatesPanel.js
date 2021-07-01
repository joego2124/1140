import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from "react-sliding-pane";
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
import ButtonIndicator from '../components/ButtonIndicator';
import { DatabaseSet } from '../Database';
import { DatabaseGet } from '../Database';

function StatesPanel(parentName){

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	// const [actualTemp, setTemp] = useState(0);
	// const [desiredTemp, setDesTemp] = useState(0);

	// DatabaseGet(setTemp, 'Temperature', parentName);
	// DatabaseGet(setDesTemp, 'DesiredTrackTemperature', parentName);

	// useEffect(() => {DatabaseSet(actualTemp < desiredTemp ? 'true' : 'false', "TrackHeater", parentName)}, [actualTemp]);

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
								<WSMInverseIndicator parentName={parentName} varName='TrackOccupancy' message='AVAILABILITY'/>
							</h4>
							<p></p>
							<p></p>
							<p><WSMIndicator parentName={parentName} varName='TrackOccupancy' message='Track occupied?'/></p>
							<p><WSMInverseIndicator parentName={parentName} varName='MaintenanceStatus' message='Track under maintenance?'/></p>
							<p><WSMInverseIndicator parentName={parentName} varName='MaxCapacity' message='Maximum capacity?'/></p>
							<p>(BOOL)
								<DropdownButton id="dropdown-basic-button" title="Failure Modes">
								<Dropdown.Item href="#/action-1">Broken rail</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Track circuit</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Transponder/beacon</Dropdown.Item>
								</DropdownButton>
							</p>
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
							<p>Track Heater</p>
							<p>(add indent) Current temp: </p>
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p></p>
							<p></p>
							<p>Boarding: </p>
							<p>Departing: </p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default StatesPanel