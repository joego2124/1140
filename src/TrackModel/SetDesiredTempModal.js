import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import Firebase from 'firebase';

const SetTempModal = (props) => {

    const [desiredTemp, setDesiredTemp] = useState(95);
    const [environmentTemp, setEnvironmentTemp] = useState(70);

	return (
		<Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Set temperatures
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
            <Form.Group onChange={e => setDesiredTemp(e.target.value)} className="mb-3" controlId="formDesiredTemp">
                <Form.Label>Desired track temperature (80-140°F)</Form.Label>
                <Form.Control type="number" 
                    name = "desiredTemp"
                    min = "80"
                    max = "140"
                    placeholder={desiredTemp} />
            </Form.Group>

            <Form.Group onChange={e => setEnvironmentTemp(e.target.value)} className="mb-3" controlId="formDesiredTemp">
                <Form.Label>Environmental Temperature (-40-140°F)</Form.Label>
                <Form.Control type="number" 
                    name = "desiredTemp"
                    min = "-40"
                    max = "140"
                    placeholder={environmentTemp} />
            </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => {
            // console.log(`/${props.lineName}/DesiredTrackTemperature`);
            Firebase.database().ref(`/${props.lineName}/DesiredTrackTemperature`).set(Number(desiredTemp));
        }}>Set Desired Track Temperature</Button>
        <Button onClick={() => {
            Firebase.database().ref(`/${props.lineName}/CurrentTemperature`).set(Number(environmentTemp));
        }}>Set Environmental Temperature</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetTempModal;