import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button, Dropdown } from 'react-bootstrap';

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

					</div>

					<div className = "controlPanelSection">
						<div className="controlPanelSubSection">
							<div className="controlPanelValueContainer">
								Rt. Destination
								<Dropdown>
									<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
										Station Name
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
										<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
										<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>

							<div className="controlPanelValueContainer">
								Authority
								<div className="controlPanelValueUnitLabel">
									<div>50</div>
									<div>blocks</div>
								</div>
							</div>

							<div className="controlPanelValueContainer">
								Departure
								<div className="controlPanelValueUnitLabel">
									13:00:00
								</div>
							</div>
						</div>
						<div className="controlPanelDivider"></div>
						<div className="controlPanelSubSection">
							<div className="controlPanelValueContainer">
								Rt. Destination
								<Dropdown>
									<Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
										Station Name
									</Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
										<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
										<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>

							<div className="controlPanelValueContainer">
								Authority
								<div className="controlPanelValueUnitLabel">
									<div>50</div>
									<div>blocks</div>
								</div>
							</div>

							<div className="controlPanelValueContainer">
								Departure
								<div className="controlPanelValueUnitLabel">
									13:00:00
								</div>
							</div>
						</div>

					</div>
					<div className = "controlPanelSection">
						
					</div>
				</div>
			</SlidingPane>
		</div>
	)
}

export default MainPanel
