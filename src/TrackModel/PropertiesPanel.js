import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import config from '../config';
import Firebase from "firebase";
import VarDisplayMulti from '../components/VarDisplayMulti';
import SetDesiredTempModal from './SetDesiredTempModal';
import { DatabaseGetMulti } from '../components/DatabaseMulti';

function PropertiesPanel({selectedBlock}) {

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

				<Button
					variant="primary"
					size="sm"
					onClick={() => setTempModalShow(true)}
				>
					Set Desired Temp
				</Button>
				<SetDesiredTempModal
				show={tempModalShow}
				onHide={() => {setTempModalShow(false)}}
			/>
			</div>
		</div>

	)
}

export default PropertiesPanel
