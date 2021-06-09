import React, { useState, createContext } from 'react'

export const SpeedContext = createContext();

export function SpeedProvider(props) {

	const [speedState, setSpeedState] = useState({
		speed: 1,
		paused: false,
	});

	return (
		<SpeedContext.Provider value={[speedState, setSpeedState]}>
			{props.children}
		</SpeedContext.Provider>
	);
}

