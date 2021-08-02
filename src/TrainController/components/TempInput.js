import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import Firebase from 'firebase';

function TempInput({ varName, parentName, selectedTrain }) {

  const [desiredTemp, setDesiredTemp] = useState();

  function helloworld(){
    console.log('hello world')
  }

  return (
    <div>
        <Form>
          <Form.Group
            onChange={e => setDesiredTemp(e.target.value)}
            className="mb-3"
            controlId="formDesiredTemp">
            <Form.Control
              type="number" 
              name = "desiredTemp"
              min = "68"
              max = "72"
              placeholder={desiredTemp}>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button onClick={() => {
            Firebase.database().ref(`/TrainList/${parentName}/InternalTemperature`).set(Number(desiredTemp));
        }}>Update</Button>
    </div>
  );
}

export default TempInput;


