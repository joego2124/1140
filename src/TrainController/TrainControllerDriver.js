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
import { DatabaseGet, DatabaseSet }  from "../Database";

function TrainContollerDriver() {

	const [parentName, setParentName] = useState('TRN1');
	const [scheduleModalShow, setScheduleModalShow] = useState(false);
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	return (
		<div>
			<header className="App-header">
				<Container>
					<Col>
					<DoorOptions parentName={parentName}/>
					<BrakingOptions parentName={parentName}/>
					</Col>
					<Col>
					<ModeOptions parentName={parentName}/>
					<LightOptions parentName={parentName}/>
					</Col>
					<TemperatureOptions parentName={parentName}/>
					<FailureStatus parentName={parentName}/>
					<TrainStatus selectedTrain={selectedTrain} parentName={parentName}/>
				</Container>
				<TrainsPanel 
					setSelectedTrain={setSelectedTrain}
					setAddTrainModal={setAddTrainModal}
					trainsList={trainsList}
				/>
			</header>
		</div>
	)
}

export default TrainContollerDriver
