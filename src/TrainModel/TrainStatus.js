import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';

function TrainStatus(parentName) {
	
	const [nextStation, setNextStation] = useState('default');
	return (
		<div style={{borderStyle: 'solid', height:"90%", width: '105%'}}>
			<h1>Train Status</h1>
			<Container>
				<Col>
					<VarDisplay parentName={parentName} varName='NextStation' message='Next Station'/>
					<VarDisplay parentName={parentName} varName='CurrentStation' message='Current Station'/>
					<VarDisplay parentName={parentName} varName='Power' message='Commanded Power [W]'/>
					<VarDisplay parentName={parentName} varName='Passengers' message='Passengers'/>
					<h3>Crew: 2</h3>
					<VarIndicator parentName={parentName} varName='ExternalLightState' message='External Lights'/>
					<VarIndicator parentName={parentName} varName='InternalLightState' message='Internal Lights'/>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Temperature</h1>
							<VarDisplay parentName={parentName} varName='InternalTemperature' message='Internal'/>
							<VarDisplay parentName={parentName} varName='ExternalTemperature' message='External'/>
						</Col>
					</Container>
				</Col>
				<Col>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Brakes</h1>
							<VarIndicator parentName={parentName} varName='SBrakeStatus' message='Brake'/>
							<ButtonIndicator parentName={parentName} varName='EBrakeStatus' message='Emergency Brake'/>
						</Col>
					</Container>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Doors</h1>
							<Row>
								<VarIndicator parentName={parentName} varName='LeftDoorStatus' message='Left'/>
								<VarIndicator parentName={parentName} varName='RightDoorStatus' message='Right'/>
							</Row>
							<ButtonIndicator parentName={parentName} varName='EDoorStatus' message='Emergency Door'/>
						</Col>
					</Container>
					<Container style={{borderStyle: 'solid'}}>
						<Col>
							<h1>Failure Modes</h1>
							<ButtonIndicator parentName={parentName} varName='EngineFailure' message='Engine'/>
							<ButtonIndicator parentName={parentName} varName='SignalFailure' message='Signal'/>
							<ButtonIndicator parentName={parentName} varName='BrakeFailure' message='Brake'/>
						</Col>
					</Container>
				</Col>
			</Container>
		</div>
	)
}

export default TrainStatus
