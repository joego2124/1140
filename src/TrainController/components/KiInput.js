import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import Firebase from 'firebase';

function KiInput({ varName, parentName, selectedTrain }) {

  const [ki, setKi] = useState();

  return (
    <div>
        <Form>
          <Form.Group
            onChange={e => setKi(e.target.value)}
            className="mb-3"
            controlId="formKi">
            <Form.Control
              type="number" 
              name = "ki"
              min = "68"
              max = "72"
              placeholder={ki}>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button onClick={() => {
            Firebase.database().ref(`/TrainList/${parentName}/Ki`).set(Number(ki));
        }}>Update</Button>
    </div>
  );
}

export default KiInput;


