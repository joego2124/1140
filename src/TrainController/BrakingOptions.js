import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from 'firebase'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const BrakeOptions = () => {

    const [eBrake, setEBrake] = useState(false);
    const [sBrake, setSBrake] = useState(false);

    Firebase.app();


    function getData() {
		let ref = Firebase.database().ref('/TC/DriverEBrakeCommand');
		ref.on('value', snapshot => {
			setEBrake(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/DriverSBrakeCommand');
		ref.on('value', snapshot => {
			setSBrake(snapshot.val());
		});
	}

	function setData(newState, brakeType) {
        if(brakeType == "e"){
            Firebase.database().ref('/TC/DriverEBrakeCommand').set(newState);
        }
        else if(brakeType == "s"){
            Firebase.database().ref('/TC/DriverSBrakeCommand').set(newState);
        }
	}

    useEffect(getData, []);

    return (
        <div>
            <h1 style={{
                padding: '25px',
            }}>BRAKE OPTIONS</h1>
            <Container>
                <Col xs={4}>
                    <Button 
                        variant={eBrake ? "primary" : "outline-primary"}
                        onClick={() => setData(!eBrake, "e")}
                    >
                        Emergency Brake
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button 
                        variant={sBrake ? "primary" : "outline-primary"}
                        onClick={() => setData(!sBrake, "s")}
                    >
                        Service Brake
                    </Button>
                </Col>
            </Container>
        </div>
    )
}

export default BrakeOptions
