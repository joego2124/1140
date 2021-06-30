import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StatesPanel = () => {

	const [open, setOpen] = useState(true);

	return (
		<div style={{
			textAlign: "center",
			background: "grey",
			width: "70%",
		}}>
			<h1>STATES</h1>
			<p>testtext</p>
		</div>
	)
}

export default StatesPanel