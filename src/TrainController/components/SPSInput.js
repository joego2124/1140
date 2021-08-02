import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import Firebase from 'firebase';

function SPSInput({ parentName }) {

  const [desiredSPS, setDesiredSPS] = useState();
  
  const [speedLimit, setSpeedLimit] = useState();

  function getData() {
    let ref = Firebase.database().ref(`/TrainList/${parentName}/SpeedLimit`);
    ref.on('value', snapshot => {
      setSpeedLimit(snapshot.val());
    });
  }

  useEffect(getData, [parentName]);

  return (
    <div>
        <Form>
          <Form.Group
            onChange={e => setDesiredSPS(e.target.value)}
            className="mb-3"
            controlId="formDesiredSPS">
            <Form.Control
              type="number" 
              name = "desiredSPS"
              min = "0"
              max = {speedLimit}
              placeholder={desiredSPS}>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button onClick={() => {
            Firebase.database().ref(`/TrainList/${parentName}/SetpointSpeed`).set(Number(desiredSPS));
        }}>Update</Button>
    </div>
  );
}

export default SPSInput;


