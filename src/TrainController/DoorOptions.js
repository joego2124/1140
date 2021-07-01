import React, { useState, useEffect, useCallback} from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from 'firebase'

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
            <Container>
                <Col>
                    <ButtonIndicator parentName={eDoor} varName='eDoor' message='Emergency Door'/>
                </Col>
                <Col>
                    <ButtonIndicator parentName={sDoor} varName='sDoor' message='Service Door'/>
                </Col>
            </Container>
        </div>
    )
}

export default DoorOptions
