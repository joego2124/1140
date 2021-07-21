import React, { useState, useEffect } from 'react';

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';
import AddTrainModal from './AddTrainModal';

import { DatabaseGet, DatabaseSet }  from "../Database";

function CTC() {

	const [scheduleModalShow, setScheduleModalShow] = useState(false);
	const [addTrainModal, setAddTrainModal] = useState(false);
	const [selectedTrain, setSelectedTrain] = useState({});
	const [trainsList, setTrainsList] = useState({});

	useEffect(() => {
		DatabaseGet(setTrainsList, "TrainList");
	}, []);

	return (
		<div>
			<header className="App-header">
				<TrainsPanel 
					setSelectedTrain={setSelectedTrain}
					setAddTrainModal={setAddTrainModal}
					trainsList={trainsList}
				/>
				<MainPanel 
					setModalShow={setScheduleModalShow} 
					selectedTrain={selectedTrain}
				/>
				<TrackView
					selectedTrain={selectedTrain}
				/>
			</header>
			<ScheduleModal
        show={scheduleModalShow}
        onHide={() => setScheduleModalShow(false)}
				trainsList={trainsList}
      />
			<AddTrainModal 
				show={addTrainModal}
				onHide={() => setAddTrainModal(false)}
			/>
		</div>
	)
}

export default CTC
