import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';

const SetDesiredTempModal = (props) => {

    const [desiredTemp, setDesiredTemp] = useState("95");

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
                    id = "desiredTemp"
                    name = "desiredTemp"
                    min = "80"
                    max = "140"
                    placeholder={desiredTemp} />
            </Form.Group>

            {/* <Button variant="primary" type="submit">
                Submit
            </Button> */}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetDesiredTempModal;