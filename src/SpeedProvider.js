import React, { useState, useEffect, createContext } from 'react'
import {InitializeJsonTree} from './Database';

export const SpeedContext = createContext();

export function SpeedProvider(props) {

	const [speedState, setSpeedState] = useState({
		speed: 1,
		paused: false,
	});
	
	useEffect(() => InitializeJsonTree(), []);

	return (
		<SpeedContext.Provider value={[speedState, setSpeedState]}>
			{props.children}
		</SpeedContext.Provider>
	);
}

