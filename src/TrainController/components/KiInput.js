import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../components/componentStyles.css";
import { DatabaseGet2, DatabaseSet2} from '../../Database';
import Firebase from 'firebase';

function KiInput({ varName, parentName, selectedTrain }) {

  const [ki, setKi] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    DatabaseSet2(parseInt(ki), varName, parentName);
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            onChange={e => setKi(e.target.value)}
            className="mb-3"
            controlId="formKi">
            <Form.Control
              type="number" 
              name = "ki"
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

export default KiInput;


