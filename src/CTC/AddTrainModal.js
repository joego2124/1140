import React, {useState} from 'react'
import Firebase from "firebase";
import { Button, Modal, Table, Form, Select } from 'react-bootstrap';

import { DatabaseGet, DatabaseSet }  from "../Database";

const AddTrainModal = (props) => {

	const [dest, setDest] = useState("default dest");
	const [eta, setEta] = useState("12:00:00");
	const [trainId, setTrainId] = useState("TRN-ID");

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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.onHide}>Cancel</Button>
				<Button variant="primary" onClick={ () => {
					Firebase.database().ref(`/TrainList/${trainId}`).set(
						{
							NextStation: dest,
							ETA: eta,
							TrainId: trainId,
						}
					);
					props.onHide();
				}
				}>Add Train</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default AddTrainModal

