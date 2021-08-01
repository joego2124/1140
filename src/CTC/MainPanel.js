	import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button, Dropdown } from 'react-bootstrap';
import ValueIO from "./ValueIO";

import "./styles.css"

const MainPanel = ({
	setModalShow,
	selectedTrain,
	selectedBlock
}) => {

	const [open, setOpen] = useState(true);
	const [manualMode, setManualMode] = useState(false);

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

					<div className = "controlPanelSection" style={{maxWidth: '225px', minWidth: '225px'}}>
						<div className="modeSection">
							<Button 
								className="button"
								variant={`${!manualMode ? 'outline-': ''}dark`}
								onClick={() => setManualMode(!manualMode)}
							>Manual Mode</Button>
							<Button 
								className="button"
								variant="primary"
								onClick={() => setModalShow(true)}
							>Show Schedule</Button>
						</div>
					</div>

					<div className = "controlPanelSection">
						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="output"
								valueLabel="Next Destination"
								valueData={{
									value: selectedTrain.NextStation,
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Current Block ID"
								valueData={{
									value: `${selectedTrain.Line === "GreenLine" ? "GRN" : "RD"}${selectedTrain.CurrentBlock}`,
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Departure Time"
								valueData={{
									value: selectedTrain.DepartureTime,
								}}
							/>
						</div>

						<div className="controlPanelDivider"></div>

						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="output"
								valueLabel="Next Block"
								valueData={{
									value: selectedTrain.NextBlock,
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Commanded Speed"
								valueData={{
									value: selectedTrain.SpeedLimit,
									units: "mi/hr"
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Train ID"
								valueData={{
									value: selectedTrain.TrainId,
								}}
							/>
						</div>
					</div>
					<div className = "controlPanelSection">
						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="input"
								valueLabel="Signal State"
								valueDatabasePath={`${selectedTrain.databasePath}/SignalState`}
								valueData={{
									value: selectedTrain.SignalState,
									dropdownList: [
										<Dropdown.Item href="#/action-1">Action</Dropdown.Item>,
									],
								}}
							/>
							<ValueIO 
								valueType="input"
								valueLabel="Switch State"
								valueDatabasePath={`${selectedBlock.databasePath}/SwitchState`}
								valueData={{
									value: selectedBlock.SwitchState === 1 ? "TRUE" : "FALSE",
									dropdownList: [
										<Dropdown.Item eventKey={0}>FALSE</Dropdown.Item>,
										<Dropdown.Item eventKey={1}>TRUE</Dropdown.Item>,
									],
								}}
							/>
							<ValueIO 
								valueType="input"
								valueLabel="Maintenance Status"
								valueDatabasePath={`${selectedBlock.databasePath}/ManualMode`}
								valueData={{
									value: (new Boolean(selectedTrain.ManualMode)).toString().toUpperCase(),
									dropdownList: [
										<Dropdown.Item eventKey={true}>TRUE</Dropdown.Item>,
										<Dropdown.Item eventKey={false}>FALSE</Dropdown.Item>,
									],
								}}
							/>
						</div>

						<div className="controlPanelDivider"></div>
						
						<div className="controlPanelSubSection">
							<ValueIO 
								valueType="input"
								valueLabel="Railway State"
								valueDatabasePath={`${selectedBlock.databasePath}/CrossingLights`}
								valueData={{
									value: selectedBlock.CrossingLights === 0 ? "FALSE" : "TRUE",
									dropdownList: [
										<Dropdown.Item eventKey={1}>TRUE</Dropdown.Item>,
										<Dropdown.Item eventKey={0}>FALSE</Dropdown.Item>,
									],
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Track Occupancy"
								valueData={{
									value: selectedBlock.Occupancy === 0 ? "FALSE" : "TRUE",
								}}
							/>
							<ValueIO 
								valueType="output"
								valueLabel="Tickets"
								valueData={{
									value: "RENGIVEME",
									units: "units/hr"
								}}
							/>
						</div>
					</div>
				</div>
			</SlidingPane>
		</div>
	)
}

export default MainPanel
