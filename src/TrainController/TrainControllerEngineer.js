import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import GainOptions from './GainOptions';
import TrainStatusRO from './TrainStatusRO';
import TrainsPanel from '../CTC/TrainsPanel.js';
import { DatabaseGet, DatabaseSet }  from "../Database";

function TrainControllerEngineer() {

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
			<div style={{
				paddingLeft: '275px'
			}}>
				<div style={{
					display: 'flex',
					flexDirection: 'row'
				}}>
					<div style={{
						size: '400px',
						paddingBottom: '200px',
						paddingTop: '50px',
						border: '1px solid #ddd',
						flexGrow: '1'
					}}>
						<GainOptions/>
						<div />
					</div>
				</div>
				<TrainStatusRO />
			</div>
			<TrainsPanel 
					trainsList={trainsList}
				/>
		</div>
	)
}

export default TrainControllerEngineer
