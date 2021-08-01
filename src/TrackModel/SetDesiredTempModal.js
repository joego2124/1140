import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import Firebase from 'firebase';

const SetDesiredTempModal = (props) => {

    const [desiredTemp, setDesiredTemp] = useState(95);

	return (
		<Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Set desired temperature
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
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => {
            // console.log(`/${props.lineName}/DesiredTrackTemperature`);
            Firebase.database().ref(`/${props.lineName}/DesiredTrackTemperature`).set(Number(desiredTemp))
        }}>Set Temperature</Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetDesiredTempModal;