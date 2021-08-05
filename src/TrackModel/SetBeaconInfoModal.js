import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Firebase from 'firebase';

// TODO: This is not working but it's not on the rubric so it's low priority
// Form.Select causes everything to crash for some reason
const SetBeaconInfoModal = (props) => {

    const [desiredTemp, setDesiredTemp] = useState();
    const [environmentTemp, setEnvironmentTemp] = useState();

	return (
		<Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Set Beacon Info
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Current Station</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Next Station</Form.Label>
              {/* <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select> */}
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Station Side</Form.Label>
                {/* <Form.Select aria-label="Default select example">
                  <option>Choose...</option>
                  <option value="1">Left</option>
                  <option value="2">Right</option>
                </Form.Select> */}
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetBeaconInfoModal;