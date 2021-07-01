import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';

function PhysicsStatus(parentName) {

	return (
		<div style={{borderStyle: 'solid'}}>
			<h1>Physics Status</h1>
			<Container>
				<Col>
					<VarDisplay parentName={parentName} varName='Velocity' message='Velocity [m/h]'/>
					<VarDisplay parentName={parentName} varName='Acceleration' message='Acceleration [m/h^2]'/>
					<VarDisplay parentName={parentName} varName='Mass' message='Mass [ton]'/>
					<VarDisplay parentName={parentName} varName='AccelerationLimit' message='Accerleration Limit [m/h^2]'/>
				</Col>
				<Col>
					<VarDisplay parentName={parentName} varName='Length' message='Length [ft]'/> 
					{/* calculate using car lengths? */}
					<VarDisplay parentName={parentName} varName='Width' message='Width [ft]'/>
					<VarDisplay parentName={parentName} varName='Height' message='Height [ft]'/>
					<VarDisplay parentName={parentName} varName='DecelerationLimit' message='Deceleration Limit [m/h^2]'/>
				</Col>
			</Container>
		</div>
	)
}

export default PhysicsStatus
