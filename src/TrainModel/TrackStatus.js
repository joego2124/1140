import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
// import config from '../config';
// import Firebase from "firebase";
// import { SpeedContext } from '../SpeedProvider';
// import { Container, Col } from 'postcss-safe-parser/node_modules/postcss';
import VarDisplay from './VarDisplay';
import VarIndicator from './VarIndicator';

function TrackStatus() {

	return (
		<div style={{borderStyle: 'solid', height:"50%", width: '80vh'}}>
			<h1>Track Status</h1>
			<Container>
				<Col>
					<VarDisplay varName='Elevation' message='Elecation [ft]'/>
					<VarDisplay varName='Grade' message='Grade [°]'/>
					<VarDisplay varName='Authority' message='Authority [m]'/>
					<VarIndicator varName='LightState' message='Light Sensor'/>
				</Col>
				<Col>
					<VarDisplay varName='SignalState' message='Signal Status'/> 
					<VarDisplay varName='SpeedLimit' message='Speed Limit [m/h]'/>
					<VarDisplay varName='CommandedSpeed' message='Commanded Speed [m/h]'/>
					<VarIndicator varName='BeaconFailure' message='Beacon Failure'/>
				</Col>
			</Container>
		</div>
	)
}

export default TrackStatus
