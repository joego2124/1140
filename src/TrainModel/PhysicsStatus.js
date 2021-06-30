import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
import VarDisplay from './VarDisplay';
// import { Container, Col } from 'postcss-safe-parser/node_modules/postcss';

function PhysicsStatus() {

	return (
		<div style={{borderStyle: 'solid'}}>
			<h1>Physics Status</h1>
			<Container>
				<Col>
					<VarDisplay varName='Velocity' message='Velocity [m/h]'/>
					<VarDisplay varName='Acceleration' message='Acceleration [m/h^2]'/>
					<VarDisplay varName='Mass' message='Mass [ton]'/>
					<VarDisplay varName='AccelerationLimit' message='Accerleration Limit [m/h^2]'/>
				</Col>
				<Col>
					<VarDisplay varName='Length' message='Length [ft]'/> 
					{/* calculate using car lengths? */}
					<VarDisplay varName='Width' message='Width [ft]'/>
					<VarDisplay varName='Height' message='Height [ft]'/>
					<VarDisplay varName='DecelerationLimit' message='Deceleration Limit [m/h^2]'/>
				</Col>
			</Container>
		</div>
	)
}

export default PhysicsStatus
