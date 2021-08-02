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
import { DatabaseGet, DatabaseSet }  from "../Database.js";
import Firebase from 'firebase';

function TrainContollerDriver() {

	const [parentName, setParentName] = useState();
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	function getParentNameData() {
    let link = 'TrainList/' + selectedTrain.TrainId + '/TrainId';
    let ref = Firebase.database().ref(link);
    ref.on('value', (snapshot) => {
      let newState = snapshot.val();
      setParentName(newState);
    });
  }

  useEffect(() => getParentNameData(), [selectedTrain]);

	return (
		<div>
			<p text-align='center'>{selectedTrain.TrainId}</p>
			<header className="App-header">
				<Container>
					<Col>
					<DoorOptions selectedTrain={selectedTrain} parentName={parentName}/>
					<BrakingOptions selectedTrain={selectedTrain} parentName={parentName}/>
					</Col>
					<Col>
					<ModeOptions selectedTrain={selectedTrain} parentName={parentName}/>
					<LightOptions selectedTrain={selectedTrain} parentName={parentName}/>
					</Col>
					<TemperatureOptions selectedTrain={selectedTrain} parentName={parentName}/>
					<FailureStatus selectedTrain={selectedTrain} parentName={parentName}/>
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
