import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';

const MainPanel = () => {

	const [open, setOpen] = useState(true);

	return (
		<div>
			<Button onClick={()=>setOpen(true)} className="showControlPanelButton">Show Controls</Button>
			<SlidingPane
				isOpen={open}
				from="bottom"
				width="100%"
				overlayClassName="bottomPanel"
				onRequestClose={() => setOpen(false)}
			>
				<div className="controlPanelHolder">
					<div className = "controlPanelSection">
						test
					</div>

					<div className = "controlPanelSection">
						test
					</div>

					<div className = "controlPanelSection">
						test
					</div>
				</div>
			</SlidingPane>
		</div>
	)
}

export default MainPanel
