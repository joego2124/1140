import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { DatabaseGet, DatabaseSet } from '../Database';

function VarInput({ varName, message, parentName }) {
  const [vari, setVari] = useState(false);

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);
  
  const setValue = (val) => {
    DatabaseSet(val, varName, parentName);
  }

  const setValueEvent = useCallback(
    async event => {
        event.preventDefault();
        const {formInput} = event.target.elements;
        setValue(formInput.value);
    }, []
);

  return (
    <div>
        <Container>
            <Form onSubmit={setValueEvent}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Update {message}</Form.Label>
                    <Form.Control name="formInput" placeholder={vari} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    </div>
  );
}

export default VarInput;
