import React, { useState, useEffect, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import Firebase from "firebase";

const Ben = () => {

    const [alpha, setAlpha] = useState("empty");

    Firebase.app();

    const handleUpdate = useCallback(
		async event => {
			event.preventDefault();
			const { alpha } = event.target.elements;
			console.log(alpha.value);
			setAlphaData(alpha.value);
		}, []
	);

    function getAlphaData() {
		let ref = Firebase.database().ref('/benTest/alphabet');
		ref.on('value', snapshot => {
            setAlpha(snapshot.val());
        });
	}

	function setAlphaData(newState) {
		Firebase.database().ref('/benTest/alphabet').set(newState);
	}

    useEffect(() => getAlphaData());

    return (
        <div>
            {alpha}
            <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>alpha</Form.Label>
                    <Form.Control name="alpha" placeholder="jasfdkajhdkasd" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Ben
