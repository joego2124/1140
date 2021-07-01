import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatabaseGet from '../Database'
import config from '../config';
import Firebase from "firebase";
import WSMDisplay from './WSMVarDisplay';

function PropertiesPanel(parentName) {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	return (
		// Properties title
		<div style={{
			textAlign: "center",
			background: "grey",
			width: "30%",
		}}>
			<h1>PROPERTIES</h1>
			<div style={{
				textAlign: "left",
				paddingLeft: 100,
				paddingRight: 50,
				paddingBottom: 10
			}}>
				<WSMDisplay parentName={parentName} varName='BlockSize' message='Block Size'/>
				<WSMDisplay parentName={parentName} varName='DirectionsOfTravel' message='Directions of Travel'/>
				<WSMDisplay parentName={parentName} varName='Elevation' message='Elevation'/>
				<WSMDisplay parentName={parentName} varName='DesiredTrackTemperature' message='Desired Track Temperature'/>
				<WSMDisplay parentName={parentName} varName='Grade' message='Grade'/>
				<WSMDisplay parentName={parentName} varName='RailwayCrossing' message='Railway Crossing'/>
				<WSMDisplay parentName={parentName} varName='SpeedLimit' message='Speed Limit'/>
			</div>
		</div>

	)
}

export default PropertiesPanel
