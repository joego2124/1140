import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import { DatabaseSet, DatabaseGet } from '../Database';

function PhysicsStatus(parentName) {

	const [power, setPower] = useState(0);
	const [mass, setMass] = useState(1);
	const [acceleration, setAcceleration] = useState(0);
	const [velocity, setVelocity] = useState(0);
	const [accelerationLimit, setAccelerationLimit] = useState(0);
	const [decelerationLimit, setDecelerationLimit] = useState(0);

	useEffect(() => {setTimeout(()=>{DatabaseGet(setAcceleration, 'Acceleration', parentName); }, 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>DatabaseGet(setPower, 'CommandedPower', parentName), 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>DatabaseGet(setVelocity, 'Velocity', parentName), 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>DatabaseGet(setMass, 'Mass', parentName), 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>DatabaseGet(setDecelerationLimit, 'DelerationLimit', parentName), 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>DatabaseGet(setAccelerationLimit, 'AccelerationLimit', parentName), 500);}, [parentName]);

	function clamp(number, max, min) {
		return Math.max(min, Math.min(number, max));
	}

	function physicsTick(){
		var acc = clamp( power / (mass * velocity), accelerationLimit, decelerationLimit); 
		var vel = +velocity + acc/60;
		// console.log (acc, vel);
		DatabaseSet( Number(acc).toFixed(3) , 'Acceleration', parentName)
		DatabaseSet( Number(vel).toFixed(3) , 'Velocity', parentName);
	}

	return (
		<div style={{borderStyle: 'solid'}}>
			<h1>Physics Status</h1>
			{/* <div>power {power} acceleration {acceleration} mass {mass} velocity {velocity}</div> */}
			<Button onClick={physicsTick}>Advance 1 min</Button>
			<Container>
				<Col>
					<VarDisplay parentName={parentName} varName='Velocity' message='Velocity [mi/h]'/>
					<VarDisplay parentName={parentName} varName='Acceleration' message='Acceleration [mi/h^2]'/>
					<VarDisplay parentName={parentName} varName='Mass' message='Mass [ton]'/>
					<VarDisplay parentName={parentName} varName='AccelerationLimit' message='Accerleration Limit [mi/h^2]'/>
				</Col>
				<Col>
					<VarDisplay parentName={parentName} varName='Length' message='Length [ft]'/> 
					{/* calculate using car lengths? */}
					<VarDisplay parentName={parentName} varName='Width' message='Width [ft]'/>
					<VarDisplay parentName={parentName} varName='Height' message='Height [ft]'/>
					<VarDisplay parentName={parentName} varName='DecelerationLimit' message='Deceleration Limit [mi/h^2]'/>
				</Col>
			</Container>
		</div>
	)
}

export default PhysicsStatus
