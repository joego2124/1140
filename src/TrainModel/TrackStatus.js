import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Col  } from 'react-bootstrap';
import VarDisplay from '../components/VarDisplay';
import VarIndicator from '../components/VarIndicator';
import { DatabaseGet } from '../Database';
import "./trainModelStyles.css";

function TrackStatus(parentName) {

	const [blockID,setBlockId] = useState('0');
	const [line,setLine] = useState('RedLine');
	
	useEffect(() => {setTimeout(()=>DatabaseGet(setLine, 'Line', parentName), 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>DatabaseGet(setBlockId, 'CurrentBlock', line), 500);}, [line]);

	// useEffect(setBlockId('Block1'));

	return (
		<div style={{borderStyle: 'solid', height:"50%", width: '80vh'}}>
			<h1>Track Status</h1>
			<div className="trainModelRow">
				<div className="trainModelColumn">
					<VarDisplay parentName={blockID} varName='Elevation' message='Elevation [ft]'/>
					<VarDisplay parentName={parentName} varName='Grade' message='Grade [°]'/>
					<VarDisplay parentName={blockID} varName='Authority' message='Authority [blocks]'/>
					<VarIndicator parentName={blockID} varName='LightState' message='Light Sensor'/>
				</div>
				<div className="trainModelColumn">
					<VarDisplay parentName={blockID} varName='SignalState' message='Signal Status'/> 
					<VarDisplay parentName={blockID} varName='SpeedLimit' message='Speed Limit [mi/h]'/>
					<VarDisplay parentName={blockID} varName='CommandedSpeed' message='Commanded Speed [mi/h]'/>
					<VarIndicator parentName={blockID} varName='BeaconFailure' message='Beacon Failure'/>
				</div>
			</div>
		</div>
	)
}

export default TrackStatus
