import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';

function TrackStatus(parentName) {

	return (
		<div style={{borderStyle: 'solid', height:"50%", width: '80vh'}}>
			<h1>Track Status</h1>
			<Container>
				<Col>
					<VarDisplay parentName={parentName} varName='Elevation' message='Elecation [ft]'/>
					<VarDisplay parentName={parentName} varName='Grade' message='Grade [°]'/>
					<VarDisplay parentName={parentName} varName='Authority' message='Authority [m]'/>
					<VarIndicator parentName={parentName} varName='LightState' message='Light Sensor'/>
				</Col>
				<Col>
					<VarDisplay parentName={parentName} varName='SignalState' message='Signal Status'/> 
					<VarDisplay parentName={parentName} varName='SpeedLimit' message='Speed Limit [m/h]'/>
					<VarDisplay parentName={parentName} varName='CommandedSpeed' message='Commanded Speed [m/h]'/>
					<VarIndicator parentName={parentName} varName='BeaconFailure' message='Beacon Failure'/>
				</Col>
			</Container>
		</div>
	)
}

export default TrackStatus
