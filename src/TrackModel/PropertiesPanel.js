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
import VarDisplayMulti from '../components/VarDisplayMulti';

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
	// console.log(`PropertiesPanel selected block: ${selectedBlock}`)

	return (
		// Properties title
		<div style={{
			textAlign: "center",
			background: "#c4c4c4",
			width: "30%",
		}}>
			<div style={{
				textAlign: "center",
				paddingLeft: 50,
				paddingRight: 50,
				paddingBottom: 10
			}}>
				<h3>PROPERTIES</h3>
				<VarDisplayMulti message='Block Length [ft]' path={`/GreenLine/${selectedBlock}/BlockLength`} />
				<VarDisplayMulti message='Directions of Travel' path={`/GreenLine/${selectedBlock}/DirectionOfTravel`} />
				<VarDisplayMulti message='Elevation [ft]' path={`/GreenLine/${selectedBlock}/Elevation`} />
				<VarDisplayMulti message='Desired Track Temperature [°F]' path={`/GreenLine/${selectedBlock}/DesiredTrackTemperature`} />
				<VarDisplayMulti message='Railway Crossing' path={`/GreenLine/${selectedBlock}/isLevelCrossingBlock`} />
				<VarDisplayMulti message='Speed Limit [mph]' path={`/GreenLine/${selectedBlock}/SpeedLimit`} />

				<Button variant="primary" size="sm" >
					Set Desired Temp
				</Button>
				{/* <p style={{textColor: "grey"}}>__</p> */}
			</div>
		</div>

	)
}

export default PropertiesPanel
