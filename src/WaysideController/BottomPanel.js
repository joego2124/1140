import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';

import "./styles.css";

const BottomPanel = () => {

	const [open, setOpen] = useState(true);

	return (
		<div>
			<Button onClick={()=> {if (open == true) {setOpen(false)} else {setOpen(true)};} } 
            className="showBottomPanelButton">Show Controls</Button>
			<SlidingPane
				isOpen={open}
				from="bottom"
				width="100%"
				overlayClassName="bottomPanel"
				onRequestClose={() => setOpen(false)}
			>
				<div className="bottomPanelHolder">
					<div className = "BottomPanelSection">
						test
					</div>
					<div className = "BottomPanelSection">
						test
					</div>
					<div className = "BottomPanelSection">
						test
					</div>
				</div>
			</SlidingPane>
		</div>
	)
}

export default BottomPanel
