import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import { DatabaseGet2, DatabaseSet2} from '../../Database';
import Firebase from 'firebase';

function SPSInput({ parentName, varName }) {

  const [desiredSPS, setDesiredSPS] = useState();
  
  const [speedLimit, setSpeedLimit] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    DatabaseSet2(parseInt(desiredSPS), varName, parentName);
  };

  function getData() {
    let ref = Firebase.database().ref(`/TrainList/${parentName}/SpeedLimit`);
    ref.on('value', snapshot => {
      setSpeedLimit(snapshot.val());
    });
  }

  useEffect(() => {
    setTimeout(() => DatabaseGet2(setDesiredSPS, varName, parentName), 500);
  }, [parentName]);

  useEffect(getData, [parentName]);

  return (
    <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            onChange={e => setDesiredSPS(e.target.value)}
            className="mb-3"
            controlId="formDesiredSPS">
              <Form.Control
              type="number" 
              name = "desiredSPS"
              min = "0"
              max = {speedLimit}>
            </Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
    </div>
  );
}

export default SPSInput;


