import React, { useEffect, useState, useContext } from 'react';
import VarDisplayMulti from './VarDisplayMulti';
import VarIndicator from '../components/VarIndicator';
import { DatabaseGet } from '../Database';
import "./trainModelStyles.css";
import "../components/componentStyles.css";

function TrackStatus(parentName) {

	const [blockID,setBlockId] = useState('0');
	const [line,setLine] = useState('RedLine');
	
	useEffect(() => {setTimeout(()=>{DatabaseGet(setLine, 'Line', parentName.parentName);}, 500);}, [parentName]);
	useEffect(() => {setTimeout(()=>{DatabaseGet(setBlockId, 'CurrentBlock', parentName.parentName);}, 500);}, [parentName]);

	useEffect(()=>console.log('block id changed to', blockID), [blockID]);

	return (
		<div className='Border'>
			<h2>Track Status</h2>
			<div className="trainModelRow">
				<div className="trainModelColumn">
					<div><VarDisplayMulti className='componentText' path={`/${line}/${blockID}/Elevation`} message='Elevation [ft]'/></div>
					<div><VarDisplayMulti className='componentText' path={`/${line}/${blockID}/Grade`} message='Grade [°]'/></div>
					<div><VarDisplayMulti className='componentText' path={`/${line}/${blockID}/Authority`} message='Authority [blocks]'/></div>
					<div><VarDisplayMulti className='componentText' path={`/TrainList/${parentName.parentName}/Line`} message='Line'/></div>
					<div><VarDisplayMulti className='componentText' path={`/TrainList/${parentName.parentName}/CurrentBlock`} message='Block'/></div>
				</div>
				<div className="trainModelColumn">
					<div><VarDisplayMulti className='componentText' path={`/${line}/${blockID}/SignalState`} message='Signal Status'/> </div>
					<div><VarDisplayMulti className='componentText' path={`/${line}/${blockID}/SpeedLimit`} message='Speed Limit [mi/h]'/></div>
					{/* <div><VarDisplayMulti className='componentText' path={`/${line}/${blockID}/CommandedSpeed`} message='Commanded Speed [mi/h]'/></div> */}
					{/* <div><VarIndicatorMulti path={`/${line}/${blockID}/BeaconFailure`} message='Beacon Failure'/></div> */}
					<VarIndicator parentName={parentName} varName='LightState' message='Light Sensor'/>
				</div>
			</div>
		</div>
	)
}

export default TrackStatus
