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
import HardwareOptions from './HardwareOptions';
import StationOptions from './StationOptions';

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
			<div style={{ textAlign: `right` }} ><mark><strong>{selectedTrain.TrainId}</strong></mark></div>
			<header>
			<TrainsPanel 
					setSelectedTrain={setSelectedTrain}
					setAddTrainModal={setAddTrainModal}
					trainsList={trainsList}
				/>
				<div style={{ paddingTop: `100px`, paddingLeft: `300px`, paddingRight: `150px` }}>
				<Container>
					<Col><DoorOptions selectedTrain={selectedTrain} parentName={parentName}/><BrakingOptions selectedTrain={selectedTrain} parentName={parentName}/></Col>
					<Col><ModeOptions selectedTrain={selectedTrain} parentName={parentName}/><LightOptions selectedTrain={selectedTrain} parentName={parentName}/></Col>
					<Col><TemperatureOptions selectedTrain={selectedTrain} parentName={parentName}/></Col>
					<Col><FailureStatus selectedTrain={selectedTrain} parentName={parentName}/></Col>
					<Col><TrainStatus selectedTrain={selectedTrain} parentName={parentName}/></Col>
					<Col><HardwareOptions selectedTrain={selectedTrain} parentName={parentName}></HardwareOptions>
					<StationOptions selectedTrain={selectedTrain} parentName={parentName}></StationOptions></Col>
				</Container>
				</div>
			</header>
		</div>
	)
}

export default TrainContollerDriver
