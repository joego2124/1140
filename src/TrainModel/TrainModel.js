import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
import TrainsPanel from './TrainsPanel';
import TrackStatus from './TrackStatus';
import TrainStatus from './TrainStatus';
import PhysicsStatus from './PhysicsStatus';

function TrainModel() {

	return (
		<div>
		<header className="App-header">
			<TrainsPanel />
			{/* <Container styles={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
			}}>
				<PhysicsStatus/>
				<PhysicsStatus/>
				<PhysicsStatus/>
			<Container/> */}
			<Container style={{height:"100%"}}>
				<Col style={{width: '60vh'}}>
					<Row>
						<TrackStatus/>
					</Row>
					<Row>
						<PhysicsStatus/>
					</Row>
				</Col>
				<Col style={{height:"100vh",width: '90vh'}}>
					<TrainStatus/>
				</Col>
			</Container>
		</header>
		</div>
	)
}

export default TrainModel
