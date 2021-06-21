import React, { useState } from 'react'
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";

import "react-sliding-pane/dist/react-sliding-pane.css";
import "./leftPanel.css";

const TrainsPanel = () => {

	const [open, setOpen] = useState(true);

	return (
		<div>
			<Button onClick={()=>setOpen(true)} className="showTrainButton">Show Trains</Button>
			<SlidingPane
				isOpen={open}
				title="Active Trains"
				from="left"
				width="225px"
				onRequestClose={() => setOpen(false)}
			>
				<div className="trainPanelHolder">
					<Button variant="light" className="trainButton">
						<div className="buttonDiv">
							<BsCircleFill size="1.5em" color="#C44242"/>
							<div className="buttonText">RD-01</div>
						</div>
					</Button>
					<Button variant="light" className="trainButton">
						<div className="buttonDiv">
							<BsCircleFill size="1.5em" color="#C44242"/>
							<div className="buttonText">RD-01</div>
						</div>
					</Button>
					<Button variant="light" className="trainButton">
						<div className="buttonDiv">
							<BsCircleFill size="1.5em" color="#C44242"/>
							<div className="buttonText">RD-01</div>
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
