import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col, Row  } from 'react-bootstrap';
// import config from '../config';
// import Firebase from "firebase";
// import { SpeedContext } from '../SpeedProvider';
import TrainsPanel from './TrainsPanel';
import TrackStatus from './TrackStatus';
import TrainStatus from './TrainStatus';
import PhysicsStatus from './PhysicsStatus';
// import { Container, Col } from 'postcss-safe-parser/node_modules/postcss';

function TrainModel() {

	return (
		<div>
		<header className="App-header">
			<TrainsPanel />
			<Container>
				<Col>
					<Row>
						<PhysicsStatus/>
					</Row>
					<Row>
						<PhysicsStatus/>
					</Row>
				</Col>
				<Col>
					<TrainStatus/>
				</Col>
			</Container>
		</header>
		</div>
	)
}

export default TrainModel
