import React, { useState, useEffect } from 'react'
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

import "react-sliding-pane/dist/react-sliding-pane.css";
import "../styles.css";

const TrainsPanel = ({
	trainsList,
	setSelectedTrain,
	setAddTrainModal
}) => {

	const [open, setOpen] = useState(true);
	const [trainsButtonList, setTrainsButtonList] = useState({});

	useEffect(() => {
		var buttonList = [];
		for (const [trainName, trainObj] of Object.entries(trainsList)) {
			buttonList.push(
				<Button variant="light" className="trainButton" key={trainName}>
					<div className="buttonDiv">
						<BsCircleFill size="1.5em" color="#C44242"/>
						<div className="buttonText" onClick={() => setSelectedTrain(trainObj)}>{`${trainName}`}</div>
					</div>
				</Button>
			);
		}
		setTrainsButtonList(buttonList);
	}, [trainsList]);

	return (
		<div>
			<Button onClick={()=>setOpen(true)} className="showTrainButton">Show Trains</Button>
			<SlidingPane
				isOpen={open}
				from="left"
				width="225px"
				onRequestClose={() => setOpen(false)}
			>
				<div className="trainPanelHolder">
					{trainsButtonList}
					<Button 
						variant="light" 
						className="addTrainButton"
						onClick={() => setAddTrainModal(true)}
					>
						<AiOutlinePlus size="2em" color="grey"/>
					</Button>
				</div>
			</SlidingPane>
		</div>
	)
}

export default TrainsPanel
