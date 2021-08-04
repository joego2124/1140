import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import config from '../config';
import Firebase from "firebase";
import VarDisplayMulti from '../components/VarDisplayMulti';
import SetTempModal from './SetTempModal';
import { DatabaseGetMulti } from '../components/DatabaseMulti';

function PropertiesPanel({selectedBlock,}) {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}
	// console.log(`PropertiesPanel selected block: ${selectedBlock}`)

	const [tempModalShow, setTempModalShow] = useState(false);
	const [actualTemp, setActualTemp] = useState(95);
	
	useEffect(() => {setTimeout(() => DatabaseGetMulti(setActualTemp, `/GreenLine/${selectedBlock}/Temperature`), 500);}, [selectedBlock]);

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
				paddingRight: 10,
				paddingBottom: 10
			}}>
				<VarDisplayMulti message='Block Length [ft]' path={`/GreenLine/${selectedBlock}/BlockLength`} />
				<br />
				<VarDisplayMulti message='Directions of Travel' path={`/GreenLine/${selectedBlock}/DirectionOfTravel`} />
				<br />
				<VarDisplayMulti message='Elevation [ft]' path={`/GreenLine/${selectedBlock}/Elevation`} />
				<br />
				<VarDisplayMulti message='Desired Track Temperature [°F]' path={`/GreenLine/DesiredTrackTemperature`} />
				<br />
				<VarDisplayMulti message='Railway Crossing' path={`/GreenLine/${selectedBlock}/isLevelCrossingBlock`} />
				<br />
				<VarDisplayMulti message='Speed Limit [mph]' path={`/GreenLine/${selectedBlock}/SpeedLimit`} />
				<br />
			</div>
			<div style={{
				textAlign: "right",
				paddingLeft: 100,
				paddingRight: 10,
				paddingBottom: 10
			}}>
				<Button
						variant="primary"
						size="sm"
						onClick={() => setTempModalShow(true)}
					>
						Set Temperatures
				</Button>
				<SetTempModal
						show={tempModalShow}
						lineName={"GreenLine"}
						onHide={() => {setTempModalShow(false)}}
				/>
			</div>
		</div>

	)
}

export default PropertiesPanel
