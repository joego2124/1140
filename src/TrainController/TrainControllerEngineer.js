import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import GainOptions from './GainOptions';
import TrainsPanel from '../CTC/TrainsPanel.js';
import { DatabaseGet, DatabaseSet }  from "../Database.js";
import Firebase from 'firebase';

function TrainContollerEngineer() {

	const [parentName, setParentName] = useState();
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	useEffect(() => {
		Firebase.database().ref('/TrainList').on('value', snapshot => {
			let list = snapshot.val();
			list.databasePath = "/TrainList";
			setTrainsList(list);
		});
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
				<div style={{ paddingTop: `100px`, paddingLeft: `300px`, paddingRight: `150px` }}>
				<Container>
					<Col><GainOptions selectedTrain={selectedTrain} parentName={parentName}/></Col>
				</Container>
				</div>
				<TrainsPanel 
					setSelectedTrain={setSelectedTrain}
					setAddTrainModal={setAddTrainModal}
					trainsList={trainsList}
				/>
			</header>
		</div>
	)
}

export default TrainContollerEngineer
