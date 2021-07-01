import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from 'firebase'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const DoorOptions = () => {

    const [eDoor, setEDoor] = useState(false);
    const [sDoor, setSDoor] = useState(false);

    Firebase.app();

    function getData() {
		let ref = Firebase.database().ref('/TC/DriverEDoorCommand');
		ref.on('value', snapshot => {
			setEDoor(snapshot.val());
		});
        ref = Firebase.database().ref('/TC/DriverSDoorCommand');
		ref.on('value', snapshot => {
			setSDoor(snapshot.val());
		});
	}

	function setData(newState, doorType) {
        if(doorType == "e"){
            Firebase.database().ref('/TC/DriverEDoorCommand').set(newState);
        }
        else if(doorType == "s"){
            Firebase.database().ref('/TC/DriverSDoorCommand').set(newState);
        }
	}

    useEffect(getData, []);

    return (
        <div>
            <h1 style={{
                padding: '25px'
            }}>DOOR OPTIONS</h1>
            <Container>
                <Col xs={4}>
                    <Button 
                        variant={eDoor ? "primary" : "outline-primary"}
                        onClick={() => setData(!eDoor, "e")}
                    >
                        Emergency Door
                    </Button>
                </Col>
                <Col xs={4}>
                    <Button 
                        variant={sDoor ? "primary" : "outline-primary"}
                        onClick={() => setData(!sDoor, "s")}
                    >
                        Service Door
                    </Button>
                </Col>
            </Container>
        </div>
    )
}

export default DoorOptions
