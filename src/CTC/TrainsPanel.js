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
					{
						Object.entries(trainsList).map(arr => {
							let trainName = arr[0], trainObj = arr[1];
							return	<Button variant="light" className="trainButton" key={trainName} onClick={() => setSelectedTrain(trainObj)}>
								<div className="buttonDiv">
									<BsCircleFill size="1.5em" color={trainObj.Line == "red" ? "#C44242" : "rgba(49,135,133, 1)"}/>
									<div className="buttonText" >{`${trainName}`}</div>
								</div>
							</Button>
						})
					}
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
