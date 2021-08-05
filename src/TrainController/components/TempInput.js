import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import { DatabaseGet2, DatabaseSet2} from '../../Database';
import Firebase from 'firebase';

function TempInput({ varName, parentName, selectedTrain }) {

  const [desiredTemp, setDesiredTemp] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    DatabaseSet2(parseInt(desiredTemp), varName, parentName);
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            onChange={e => setDesiredTemp(e.target.value)}
            className="mb-3"
            controlId="formDesiredTemp">
            <Form.Control
              type="number" 
              name = "desiredTemp"
              min = "68"
              max = "72">
            </Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Form>
    </div>
  );
}

export default TempInput;


