import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import { DatabaseSet, DatabaseGet } from '../Database';
import "./trainModelStyles.css";

function PhysicsStatus(parentName) {

	return (
		<div className='Border'>
			<h2>Physics Status</h2>
			<div className="trainModelRow">
				<div className="trainModelColumn">
					<VarDisplay parentName={parentName} varName='Position' message='Position [ft]'/>
					<VarDisplay parentName={parentName} varName='Velocity' message='Velocity [ft/s]'/>
					<VarDisplay parentName={parentName} varName='Acceleration' message='Acceleration [ft/s^2]'/>
					<VarDisplay parentName={parentName} varName='Mass' message='Mass [lb]'/>
				</div>
				<div className="trainModelColumn">
					<VarDisplay parentName={parentName} varName='Length' message='Length [ft]'/> 
					<VarDisplay parentName={parentName} varName='Width' message='Width [ft]'/>
					<VarDisplay parentName={parentName} varName='Height' message='Height [ft]'/>
				</div>
			</div>
		</div>
	)
}

export default PhysicsStatus
