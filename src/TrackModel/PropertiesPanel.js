import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PropertiesPanel = () => {

	const [open, setOpen] = useState(true);

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	function getLedData() {
		let ref = Firebase.database().ref('/LED_STATUS');
		ref.on('value', snapshot => {
			const state = `${snapshot.val()}`;
			setLedState(state === "ON" ? true : false);
		});
	}

	function setLedData(newState) {
		Firebase.database().ref('/LED_STATUS').set(newState ? "ON" : "OFF");
	}

	useEffect(() => getLedData(), []);

	return (
		<div style={{
			textAlign: "center",
			background: "grey",
			width: "50%",
		}}>
			<h1>PROPERTIES</h1>
			<p>Block Size: </p>
			<p>Direction of Travel: </p>
			<p>Elevation: </p>
			<p>testtext</p>
			<p>testtext</p>
			<p>testtext</p>
			<p>testtext</p>
		</div>
	)
}

export default PropertiesPanel
