import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { BsCircleFill } from "react-icons/bs";

import "react-sliding-pane/dist/react-sliding-pane.css";
import "../styles.css";
import "./trainModelStyles.css";
import { DatabaseGet } from '../Database';

const TrainsPanel = (props) => {

	const [open, setOpen] = useState(true);
	const [trainIds, setTrainIds] = useState([]);

	useEffect(() => {setTimeout(()=>{DatabaseGet(setTrainIds, 'TrainIds'); }, 500);}, [] );

	const setTrain = value => {props.setParentName(value);}

	return (
		<div>
			<div className="trainPanelHolderFixed">
				{trainIds.map((trainName) => (
						<Button variant="light" className="trainButton" onClick={()=>{props.setParentName(trainName);}}>
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
