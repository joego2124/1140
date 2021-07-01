import React, { useState } from 'react';

import TrackView from './TrackView';
import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';
import ScheduleModal from './ScheduleModal';


function CTC() {

	const [modalShow, setModalShow] = useState(false);

	return (
		<div>
			<header className="App-header">
				<TrainsPanel />
				<MainPanel setModalShow={setModalShow}/>
				<TrackView/>
			</header>
			<ScheduleModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
		</div>
	)
}

export default CTC
