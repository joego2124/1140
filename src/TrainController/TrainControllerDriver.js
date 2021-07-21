import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import BrakingOptions from './BrakingOptions';
import DoorOptions from './DoorOptions';
import TrainStatus from './TrainStatus';
import ModeOptions from './ModeOptions';
import LightOptions from './LightOptions';
import TemperatureOptions from './TemperatureOptions';
import FailureStatus from './FailureStatus';
import TrainsPanel from '../CTC/TrainsPanel.js';

function TrainContollerDriver() {

	const [parentName, setParentName] = useState('TRN1');

	return (
		<div>
			<header className="App-header">
				<Container>
					<DoorOptions parentName={parentName}/>
					<BrakingOptions parentName={parentName}/>
					<ModeOptions parentName={parentName}/>
					<LightOptions parentName={parentName}/>
					<TemperatureOptions parentName={parentName}/>
					<FailureStatus parentName={parentName}/>
					<TrainStatus parentName={parentName}/>
				</Container>
				<TrainsPanel setParentName={setParentName}/>
			</header>
		</div>
	)
}

export default TrainContollerDriver
