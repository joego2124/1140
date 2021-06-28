import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MainPanel = () => {

	const [open, setOpen] = useState(true);

	return (
		<div style={{
			textAlign: "center",
			background: "grey",
			width: "50%",
		}}>
			<h1>PROPERTIES</h1>
			<p>testtext</p>
		</div>
	)
}

export default MainPanel
