import React, {useEffect, useState} from 'react'
import Firebase from "firebase";
import { Button, Modal, Table, Form, Select } from 'react-bootstrap';
import { Button, Modal, Dropdown, Form, FormControl } from 'react-bootstrap';
import { MdRemoveCircleOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

import { DatabaseGet, DatabaseSet }  from "../Database";

import "../styles.css";

var trackLayout = require("./TrackLayout.json");

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);


const AddTrainModal = (props) => {

	const [departureTime, setDepartureTime] = useState("12:00:00");
	const [trainId, setTrainId] = useState("TRN-ID");
	const [lineColor, setLineColor] = useState("red");
	const [stationSelections, setStationsSelections] = useState([0]);

	let stationBlocks = trackLayout[lineColor + "Line"].filter(block => block.station != undefined);

	useEffect(() => {
		console.log(stationSelections);
	}, [stationSelections]);

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	Firebase.app();

	return (
		<Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Train
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
<<<<<<< HEAD
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Select Destination</Form.Label>
					<Form.Control  placeholder="Default Station" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Set Target Arrival Time</Form.Label>
					<Form.Control placeholder="12:00:00" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label onChange={e => {
						console.log(e.target.value);
						setDest(e.target.value)}}>Set TrainID</Form.Label>
					<Form.Control placeholder="TRN-EXAMPLE" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
					<Form.Label>Select Line</Form.Label>
					<Form.Control
						as="select"
						custom
					>
						<option value="red">Red Line</option>
						<option value="green">Green Line</option>
					</Form.Control>
				</Form.Group>
			</Form>
=======
				<Form>

					<Form.Group onChange={e => setTrainId(e.target.value)} className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Set TrainID</Form.Label>
						<Form.Control placeholder="TRN-EXAMPLE" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Select Line Color</Form.Label>
						<Form.Control 
							as="select"
							onChange={e => setLineColor(e.target.value)}
						>
							<option key="red" value="red"> Red </option>
							<option key="green" value="green"> Green </option>
						</Form.Control>
					</Form.Group>
						
					<Form.Label>Select Stations</Form.Label>
					<div style={styles.stationSelectionHolder}>
						{
							stationSelections.map((id, i) => {
								let selectedBlock = stationBlocks.find(block => block.blockId == id);
								return <div style={styles.stationSelection}>
									<Dropdown onSelect={e => {
										let temp = stationSelections;
										temp[i] = e;
										setStationsSelections(temp);
										forceUpdate();
									}} style={styles.selectBlockHolder}>
										<Dropdown.Toggle variant="dark" style={styles.selectBlockButton}>
											{selectedBlock != undefined ? selectedBlock.station : "Select Station"}
										</Dropdown.Toggle>
						
										<Dropdown.Menu as={CustomMenu}>
											{
												stationBlocks.map((block, i) =>
													<Dropdown.Item eventKey={block.blockId}>{block.station}</Dropdown.Item>
												)
											}
										</Dropdown.Menu>
									</Dropdown>
									<Button variant="danger" style={styles.removeButton} onClick={() => {
										let temp = stationSelections;
										temp.splice(i, 1);
										setStationsSelections(temp);
										forceUpdate();
									}}>
										<MdRemoveCircleOutline size="1.5em"/>
									</Button>
								</div>}
							)
						}
						<Button 
							variant="light" 
							style={styles.addStationButton}
							onClick={() => setStationsSelections([...stationSelections, 0])}
						>
							<AiOutlinePlus size="1.5em" color="grey"/>
						</Button>
					</div>	
					
					<Form.Group onChange={e => setDepartureTime(e.target.value)} className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>Set Departure Time</Form.Label>
						<Form.Control type="time"/>
					</Form.Group>
					
				</Form>
>>>>>>> 7ebf5c9aa28e20ec40995a3bf1556ecc5087de80
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>Cancel</Button>
				<Button variant="primary" onClick={ () => {
					let newTrain = {...trainTemplate}
					newTrain.TrainId = trainId;
					newTrain.Stations = stationSelections;
					newTrain.DepartureTime = departureTime;
					Firebase.database().ref(`/TrainList/${trainId}`).set(newTrain);
					console.log(newTrain);
					props.onHide();
				}}>Add Train</Button>
      </Modal.Footer>
    </Modal>
	)
}

const styles = {
	stationSelectionHolder: {
		display: "flex",
		flexDirection: "column",
		borderStyle: "solid",
		border: "1px",
		borderColor: "darkgrey",
		borderRadius: "5px",
		boxShadow: "0 0 5px rgba(0, 0, 0, .25) inset",
		padding: "15px",
	},
	addStationButton: {
	},
	stationSelection: {
		display: "flex",
		justifyContent: "space-between",
		// backgroundColor: "grey",
		alignItems: "stretch",
		marginBottom: "15px",
	},
	selectBlockHolder: {
		width: "100%",
		marginRight: "15px",
	},
	selectBlockButton: {
		width: "100%",
	},
	removeButton: {
		minHeight: "100%",
		padding: 0,
		margin: 0,
		paddingLeft: "5px",
		paddingRight: "5px",
	}
}

const trainTemplate = {
	TrainId: "",
	CurrentBlock: 1,
	RouteIndex: 0,
	Route: [],
	Stations: [],
	DepartureTime: "12:00",

	Acceleration: 0,
	AccelerationLimit: 5,
	Authority: true,
	BlockAuthority : 0,
	BrakeFailure: false,
	CarCount: 1,
	DecelerationLimit: -5,
	DoorStatus: false,
	EBrakeStatus: false,
	EDoorStatus: false,
	EngineFailure: false,
	ExternalLightState: false,
	ExternalTemperature: 0,
	Height: 12,
	InternalLightState: false,
	InternalTemperature: 0,
	LeftDoorStatus: false,
	Length: 300,
	Line: "green",
	ManualMode: false,
	Mass: 277817,
	Passengers: 0,
	Power: 0,
	RightDoorStatus: false,
	SBrakeStatus: false,
	SetpointSpeed: 0,
	SignalFailure: false,
	SpeedLimit: 45,
	Velocity: 0,
	Width: 10,
}

export default AddTrainModal

