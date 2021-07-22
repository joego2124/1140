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

// const [blockList, setBlockList] = useState([]);

// function getBlockListData() {
//     let tempList = [];
//     let ref = Firebase.database().ref('/RedLine');
//     ref.on('value', (snapshot) => {
//       for (const [key, value] of Object.entries(snapshot.val())) {
//         for (const [i, v] of Object.entries(value)) {
//           console.log(i, v);
//           tempList.push(v);
//         }
//       }
//       setBlockList(tempList);
//       console.log(tempList);
//       console.log(blockList);
//     });
//   }

function PropertiesPanel(parentName, selectedBlock) {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	return (
		// Properties title
		<div style={{
			textAlign: "center",
			background: "#c4c4c4",
			width: "30%",
		}}>
			<h3>PROPERTIES</h3>
			<div style={{
				textAlign: "left",
				paddingLeft: 100,
				paddingRight: 50,
				paddingBottom: 10
			}}>
				{/* <WSMDisplay varName='BlockLength' message='Block Length [m]' selectedBlock={selectedBlock} /> */}
				{/* <WSMDisplay parentName={parentName} varName='DirectionsOfTravel' message='Directions of Travel'/>
				<WSMDisplay parentName={parentName} varName='Elevation' message='Elevation [ft]'/>
				<WSMDisplay parentName={parentName} varName='DesiredTrackTemperature' message='Desired Track Temperature [°F]'/>
				<WSMDisplay parentName={parentName} varName='Grade' message='Grade [°]'/>
				<WSMDisplay parentName={parentName} varName='RailwayCrossing' message='Railway Crossing'/>
				<WSMDisplay parentName={parentName} varName='SpeedLimit' message='Speed Limit [m/h]'/> */}
				{/* <p style={{textColor: "grey"}}>__</p> */}
			</div>
		</div>

	)
}

export default PropertiesPanel
