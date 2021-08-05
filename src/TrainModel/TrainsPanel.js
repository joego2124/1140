import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { BsCircleFill } from "react-icons/bs";

import "./trainModelStyles.css";
import Firebase from "firebase";
// import { DatabaseGet } from '../Database';

function TrainsPanel(props) {

	// const [open, setOpen] = useState(true);
	const [trainIds, setTrainIds] = useState([]);
	// const [lineColors, setLineColors] = useState([]);

	useEffect(() => {
		Firebase.database().ref(`/TrainIds`).on('value', snapshot => { 
			var p, result = [], list = snapshot.val();
			for( p in list){
				result.push(list[p]);
			}
			lineColor(result);
		})
	}, [] );

	const setTrain = value => {props.setParentName(value); console.log('selecting train',value);}

	var colorDict = {};

	const lineColor = (trainNames) => {
		setTrainIds(trainNames);
		return;
		var result = [];
		trainNames.forEach(id => {
			Firebase.database().ref(`/TrainList/${id}/Line`).get().then( snapshot => {
				const line = snapshot.val();
				result.push({trainName: id, color: line == 'RedLine' ? 'red' : line == 'GreenLine' ? 'green' : 'grey'});
			});
		});
		console.log(result);
		setTrainIds(result);
	};

	useEffect(() => console.log('test', trainIds),[trainIds]);

	return (
		<div>
			<div className="trainPanelHolderFixed">
				{
				trainIds.map((trainName) => (
						<Button variant="light" className="trainButton" onClick={()=>{setTrain(trainName);}} key={trainName}>
							<div className="buttonDiv">
								{/* <BsCircleFill size="1.5em" color={linecolor}/> */}
								{/* <BsCircleFill size="1.5em" color={color}/>  USE THIS ONE*/}
								{/* <BsCircleFill size="1.5em" color={lineColors[trainName]}/> */}
								<div className="buttonText">{trainName}</div>
							</div>
						</Button>
						))
					}
			</div>
		</div>
	)
}

export default TrainsPanel
