import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { BsCircleFill } from "react-icons/bs";

import "react-sliding-pane/dist/react-sliding-pane.css";
import "../styles.css";
import "./trainModelStyles.css";
import Firebase from "firebase";
// import { DatabaseGet } from '../Database';

function TrainsPanel(props) {

	// const [open, setOpen] = useState(true);
	const [trainIds, setTrainIds] = useState([]);

	useEffect(() => {setTimeout(()=>{
		Firebase.database().ref(`/TrainIds`).on('value', snapshot => { 
			var p, result = [], list = snapshot.val();
			for( p in list){
				result.push(list[p]);
			}
			setTrainIds(result);
		});
	}, 500);}, [] );

	const setTrain = value => {props.setParentName(value); console.log('selecting train',value);}

	return (
		<div>
			<div className="trainPanelHolderFixed">
				{trainIds.map((trainName) => (
						<Button variant="light" className="trainButton" onClick={()=>{setTrain(trainName);}}>
							<div className="buttonDiv">
								<BsCircleFill size="1.5em" color="green"/>
								<div className="buttonText">{trainName}</div>
							</div>
						</Button>))}
			</div>
		</div>
	)
}

export default TrainsPanel
