import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import Firebase from 'firebase';

const SetTempModal = (props) => {

    const [databaseTemps, setDatabaseTemps] = useState({
      currentTemperature: -9999,
      desiredTrackTemperature: -9999,
    });
    const [desiredTemp, setDesiredTemp] = useState();
    const [environmentTemp, setEnvironmentTemp] = useState();

    // Get temperature variables
    useEffect(() => {
      Firebase.database().ref(`/${props.selectedBlock.Line}Line`).on('value', snapshot => {
        let lineData = snapshot.val();
        setDatabaseTemps({
          currentTemperature: lineData.CurrentTemperature,
          desiredTrackTemperature: lineData.DesiredTrackTemperature,
        });
      });
    }, []);

    // Checking if track heater needs to be turned on
    useEffect(() => {
      let localEnvironmentTemp = databaseTemps.currentTemperature 
      let localDesiredTemp = databaseTemps.desiredTrackTemperature 
        if( localEnvironmentTemp < localDesiredTemp) {
          Firebase.database().ref(`/${props.selectedBlock.Line}Line/TrackHeater`).set( true );
        } else {
          Firebase.database().ref(`/${props.selectedBlock.Line}Line/TrackHeater`).set( false );
        }
        console.log("actualTemp: ", localEnvironmentTemp);
        console.log("desiredTemp: ", localDesiredTemp);
        console.log("");
    },  [databaseTemps]);

	return (
		<Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      size="lg"
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
                    placeholder={databaseTemps.desiredTrackTemperature} />
            </Form.Group>

            <Form.Group onChange={ e => {
                setEnvironmentTemp(e.target.value);}} className="mb-3" controlId="formDesiredTemp">
                <Form.Label>Environmental Temperature (-40-140°F)</Form.Label>
                <Form.Control type="number" 
                    name = "desiredTemp"
                    min = "-40"
                    max = "140"
                    placeholder={databaseTemps.currentTrackTemperature} />
            </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => {
            Firebase.database().ref(`/${props.selectedBlock.Line}Line/DesiredTrackTemperature`).set(Number(desiredTemp));
        }}>Set Desired Track Temperature</Button>

        <Button onClick={() => {
            Firebase.database().ref(`/${props.selectedBlock.Line}Line/CurrentTemperature`).set(Number(environmentTemp));
        }}>Set Environmental Temperature</Button>

        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetTempModal;