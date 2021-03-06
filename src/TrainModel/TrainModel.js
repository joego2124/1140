import React, { useEffect, useState } from 'react';
import TrainsPanel from './TrainsPanel';
import TrackStatus from './TrackStatus';
import TrainStatus from './TrainStatus';
import PhysicsStatus from './PhysicsStatus';
import "./trainModelStyles.css";

function TrainModel() {

	const [parentName, setParentName] = useState('TRN1');

	useEffect( () => {console.log('train changed to:',parentName)}, [parentName]);

	return (
		<div>
		<header className="App-header">
			<div className="trainModelRowPadded">
				<TrainsPanel setParentName={setParentName} className="trainModelList"/>
				<div className="trainModelColumn">
					<TrackStatus parentName={parentName} className="trainModelItem"/>
					<PhysicsStatus parentName={parentName} className="trainModelItem"/>
				</div>
				<TrainStatus parentName={parentName} className="trainModelItem"/>
			</div>
		</header>
		</div>
	)
}

export default TrainModel
