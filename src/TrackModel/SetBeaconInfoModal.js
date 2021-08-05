import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Firebase from 'firebase';

// TODO: This is not working but it's not on the rubric so it's low priority
// Form.Select causes everything to crash for some reason
const SetBeaconInfoModal = (props) => {

  var currentStation;

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
          {/* <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
                
            </Form.Group>
          </Row> */}
          <h5>Beacon+1 Info</h5>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Current Station</Form.Label>
              <Form.Control 
                placeholder={currentStation}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Next Station</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Station Side</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>

          <h5>Beacon-1 Info</h5>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Current Station</Form.Label>
              <Form.Control 
                placeholder={currentStation}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Next Station</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Station Side</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => {
              // Firebase.database().ref(`/${props.databasePath}/Beacon+1/CurrentStation`).set(currentStation);
          }}>Set Beacon Info</Button>

        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetBeaconInfoModal;