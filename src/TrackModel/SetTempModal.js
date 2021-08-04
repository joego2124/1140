import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, FormControl } from 'react-bootstrap';
import Firebase from 'firebase';

const SetTempModal = (props) => {

    var localDesiredTemp, localEnvironmentTemp;
    const [desiredTemp, setDesiredTemp] = useState();
    const [environmentTemp, setEnvironmentTemp] = useState();

    // Get temperature variables
    useEffect(() => {
      Firebase.database().ref(`/${props.lineName}/CurrentTemperature`).once( 'value', snapshot => {
        localEnvironmentTemp = snapshot.val();
      });
    }, [props.selectedBlock, desiredTemp, environmentTemp]);
    useEffect(() => {
      Firebase.database().ref(`/${props.lineName}/DesiredTrackTemperature`).once( 'value', snapshot => {
        localDesiredTemp = snapshot.val();
      });
    }, [props.selectedBlock, localDesiredTemp, localEnvironmentTemp]);

    // Checking if track heater needs to be turned on
    useEffect(() => {
        if( (localEnvironmentTemp < localDesiredTemp) ? 
          Firebase.database().ref(`/${props.lineName}/TrackHeater`).set( true ) :
          Firebase.database().ref(`/${props.lineName}/TrackHeater`).set( false ) );
          console.log("actualTemp: ", localEnvironmentTemp);
          console.log("desiredTemp: ", localDesiredTemp);},
          [props.lineName, props.selectedBlock, localDesiredTemp, localEnvironmentTemp]);

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
                    placeholder={desiredTemp} />
            </Form.Group>

            <Form.Group onChange={ e => {
                setEnvironmentTemp(e.target.value);}} className="mb-3" controlId="formDesiredTemp">
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
            Firebase.database().ref(`/${props.lineName}/DesiredTrackTemperature`).once( 'value', snapshot => {
              localDesiredTemp = snapshot.val();
            });
            console.log("BUTTONactualTemp: ", localDesiredTemp);
        }}>Set Desired Track Temperature</Button>

        <Button onClick={() => {
            Firebase.database().ref(`/${props.lineName}/CurrentTemperature`).set(Number(environmentTemp));
            Firebase.database().ref(`/${props.lineName}/CurrentTemperature`).once( 'value', snapshot => {
              localEnvironmentTemp = snapshot.val();
            });
            console.log("BUTTONactualTemp: ", localEnvironmentTemp);
        }}>Set Environmental Temperature</Button>

        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
	)
}

export default SetTempModal;