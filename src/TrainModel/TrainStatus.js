import { Container, Col, Row  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import ButtonIndicator from '../components/ButtonIndicator';
import "../components/componentStyles.css";

function TrainStatus(parentName) {
	
	return (
		<div className='Border'>
			<h2>Train Status</h2>
			<Container>
				<Col>
					<VarDisplay parentName={parentName} varName='NextStation' message='Next Station'/>
					<VarDisplay parentName={parentName} varName='CurrentStation' message='Current Station'/>
					<VarDisplay parentName={parentName} varName='Power' message='Commanded Power [W]'/>
					<VarDisplay parentName={parentName} varName='Passengers' message='Passengers'/>
					<p className='componentLabel'>Crew: 2</p>
					<VarIndicator parentName={parentName} varName='ExternalLightState' message='External Lights'/>
					<VarIndicator parentName={parentName} varName='InternalLightState' message='Internal Lights'/>
				</Col>
				<Col>
					<Container className='Border'>
						<Col>
							<h4>Temperature</h4>
							<VarDisplay parentName={parentName} varName='InternalTemperature' message='Internal'/>
							<VarDisplay parentName={parentName} varName='ExternalTemperature' message='External'/>
						</Col>
					</Container>
					<Container className='Border'>
						<Col>
							<h4>Brakes</h4>
							<VarIndicator parentName={parentName} varName='SBrakeStatus' message='Brake'/>
							<ButtonIndicator parentName={parentName} varName='EBrakeStatus' message='Emergency Brake'/>
						</Col>
					</Container>
				</Col>
				<Col>
					<Container className='Border'>
						<Col>
							<h4>Doors</h4>
							<Row>
								<VarIndicator parentName={parentName} varName='LeftDoorStatus' message='Left'/>
								<VarIndicator parentName={parentName} varName='RightDoorStatus' message='Right'/>
							</Row>
							<ButtonIndicator parentName={parentName} varName='EDoorStatus' message='Emergency Door'/>
						</Col>
					</Container>
					<Container className='Border'>
						<Col>
							<h4>Failure Modes</h4>
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
