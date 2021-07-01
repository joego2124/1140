import React, { useEffect } from 'react';

import config from '../config';
import Firebase from "firebase";
// import { SpeedContext } from '../SpeedProvider';
// import TrackView from './TrackView';
// import TrainsPanel from './TrainsPanel';
import MainPanel from './MainPanel';

function TrackModel() {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	return (
		<div>
			<header className="App-header">
				<MainPanel />
			</header>
		</div>
	)
}

export default TrackModel
