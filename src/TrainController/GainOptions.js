import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from 'firebase'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const GainOptions = () => {

    document.body.style.overflow='hidden';

    const [Kp, setKp] = useState();
    const [Ki, setKi] = useState();

    Firebase.app();

    function getData() {
        let ref = Firebase.database().ref('/TC/Kp');
		ref.on('value', snapshot => {
			setKp(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/Ki');
		ref.on('value', snapshot => {
			setKi(snapshot.val());
		});
	}

    const kp = useCallback(
        async event => {
            event.preventDefault();
            const {Kp} = event.target.elements;
            setP(Kp.value);
        }, []
    );

    const ki = useCallback(
        async event => {
            event.preventDefault();
            const {Ki} = event.target.elements;
            setI(Ki.value);
        }, []
    );

    function getP(){
        let ref = Firebase.database().ref('/TC/Kp');
        ref.on('value', snapshot => {
            setKp(snapshot.val());
        });
    }

    function setP(newP){
        Firebase.database().ref('/TC/Kp').set(parseInt(newP))
    }

    function getI(){
        let ref = Firebase.database().ref('/TC/Ki');
        ref.on('value', snapshot => {
            setKi(snapshot.val());
        });
    }

    function setI(newI){
        Firebase.database().ref('/TC/Ki').set(parseInt(newI))
    }

    useEffect(getData, []);
    useEffect(() => getP());
    useEffect(() => getI());

    return (
        <div>
            <h1 style={{
                padding: '50px'
            }}>GAINS</h1>
            <Container>
                <Col xs={4}>
                    <Form onSubmit={kp}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Update Kp</Form.Label>
                            <Form.Control name="Kp" placeholder={Kp} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={ki}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Update Ki</Form.Label>
                            <Form.Control name="Ki" placeholder={Ki} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    )
}

export default GainOptions
