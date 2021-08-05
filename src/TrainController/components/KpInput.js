import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import { DatabaseGet2, DatabaseSet2} from '../../Database';
import Firebase from 'firebase';

function KpInput({ varName, parentName, selectedTrain }) {

  const [kp, setKp] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    DatabaseSet2(parseInt(kp), varName, parentName);
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            onChange={e => setKp(e.target.value)}
            className="mb-3"
            controlId="formKp">
            <Form.Control
              type="number" 
              name = "kp"
              min = "0">
            </Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
    </div>
  );
}

export default KpInput;


