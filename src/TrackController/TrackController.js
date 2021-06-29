import React, { useState, useEffect, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from "firebase";

const TrackController = () => {

    const [alpha, setAlpha] = useState("empty");

    Firebase.app();

    //when updates happen this is called and then it calls appropriate functions to update the page element
    const handleUpdate = useCallback(
		async event => {
			event.preventDefault();
			const { alpha } = event.target.elements;
			console.log(alpha.value);
			setAlphaData(alpha.value);
		}, []
	);

    function getAlphaData() {
		let ref = Firebase.database().ref('/trackController/testdata');
		ref.on('value', snapshot => {
            setAlpha(snapshot.val());
        });
	}

	function setAlphaData(newState) {
		Firebase.database().ref('/trackController/testdata').set(newState);
	}

    useEffect(() => getAlphaData());

    return (
        <div style={{paddingLeft: '4em'}}>
            {alpha}

            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>alpha</Form.Label>
                    <Form.Control name="alpha" placeholder="Data here" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default TrackController;