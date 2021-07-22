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
import VarDisplay from '../components/VarDisplayMulti';

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

function PropertiesPanel({selectedBlock}) {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}
	console.log(`selected block: ${selectedBlock}`)

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
				paddingLeft: 0,
				paddingRight: 50,
				paddingBottom: 10
			}}>
				<VarDisplay message='Block Length [m]' path={`/GreenLine/${selectedBlock}/BlockLength`} />
				<VarDisplay message='Directions of Travel' path={`/GreenLine/${selectedBlock}/DirectionOfTravel`} />
				<VarDisplay message='Elevation [ft]' path={`/GreenLine/${selectedBlock}/Elevation`} />
				<VarDisplay message='Desired Track Temperature [°F]' path={`/GreenLine/${selectedBlock}/DesiredTrackTemperature`} />
				<VarDisplay message='Railway Crossing' path={`/GreenLine/${selectedBlock}/isLevelCrossingBlock`} />
				<VarDisplay message='Speed Limit [mph]' path={`/GreenLine/${selectedBlock}/SpeedLimit`} />
				{/* <p style={{textColor: "grey"}}>__</p> */}
			</div>
		</div>

	)
}

export default PropertiesPanel
