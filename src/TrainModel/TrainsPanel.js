import React, { useState } from 'react'
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

import "react-sliding-pane/dist/react-sliding-pane.css";
import "../styles.css";

const TrainsPanel = (props) => {

	const [open, setOpen] = useState(true);

	const setTrain = value => {props.setParentName(value);}

	return (
		<div>
			<Button onClick={()=>{setOpen(true);}} className="showTrainButton">Show Trains</Button>
			<SlidingPane
				isOpen={open}
				from="left"
				width="300px"
				onRequestClose={() => setOpen(false)}
			>
				<div className="trainPanelHolder">
					<Button variant="light" className="trainButton" onClick={()=>{setTrain('TRN1');}}>
						<div className="buttonDiv">
							<BsCircleFill size="1.5em" color="green"/>
							<div className="buttonText">TRN1</div>
						</div>
					</Button>
					<Button variant="light" className="trainButton" onClick={()=>{setTrain('TRN2');}}>
						<div className="buttonDiv">
							<BsCircleFill size="1.5em" color="#C44242"/>
							<div className="buttonText">TRN2</div>
						</div>
					</Button>
					<Button variant="light" className="trainButton" onClick={()=>{setTrain('TRN3');}}>
						<div className="buttonDiv">
							<BsCircleFill size="1.5em" color="#C44242"/>
							<div className="buttonText">TRN3</div>
						</div>
					</Button>
					<Button variant="light" className="addTrainButton">
						<AiOutlinePlus size="2em" color="grey"/>
					</Button>
				</div>
			</SlidingPane>
		</div>
	)
}

export default TrainsPanel
