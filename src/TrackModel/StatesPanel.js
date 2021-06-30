import React, { useState } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const StatesPanel = () => {

	const [open, setOpen] = useState(true);

	return (
		<div style={{
			textAlign: "center",
			background: "#cfdfe3",
			width: "70%",
		}}>
			<h1>CURRENT STATES</h1>
			<div style={{
				textAlign: "left",
				paddingLeft: 50,
				paddingRight: 50,
				paddingBottom: 10,
			}}>
				<Container fluid>
					<Row>
						<Col xs={4}>
							<h4>(BOOL) AVAILABILITY</h4>
							<p></p>
							<p></p>
							<p>(BOOL) Track occupied?</p>
							<p>(BOOL) Track under maintenance?</p>
							<p>(BOOL) Maximum capacity?</p>
							<p>(BOOL)
								<DropdownButton id="dropdown-basic-button" title="Any failures?">
								<Dropdown.Item href="#/action-1">Broken rail</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Track circuit</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Transponder/beacon</Dropdown.Item>
								</DropdownButton>
							</p>
						</Col>
						<Col>
							<h4>TRACK ELEMENTS</h4>
							<p></p>
							<p></p>
							<p>Beacon: </p>
							<p>Signal: </p>
							<p>Switch Position: </p>
							<p></p>
							<p>(BOOL) Railway Crossing</p>
							<p>(BOOL) Track Heaters</p>
							<p>(add indent) Current temp: </p>
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p></p>
							<p></p>
							<p>Boarding: </p>
							<p>Departing: </p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default StatesPanel