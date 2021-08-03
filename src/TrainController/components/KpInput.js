import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import Firebase from 'firebase';

function KpInput({ varName, parentName, selectedTrain }) {

  const [kp, setKp] = useState();

  return (
    <div>
        <Form>
          <Form.Group
            onChange={e => setKp(e.target.value)}
            className="mb-3"
            controlId="formKp">
            <Form.Control
              type="number" 
              name = "kp"
              min = "68"
              max = "72"
              placeholder={kp}>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button onClick={() => {
            Firebase.database().ref(`/TrainList/${parentName}/Kp`).set(Number(kp));
        }}>Update</Button>
    </div>
  );
}

export default KpInput;


