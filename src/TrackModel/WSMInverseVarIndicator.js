import React, { useEffect, useState, useContext } from 'react';
import { BsCircleFill } from "react-icons/bs";
import Firebase from "firebase";
import { DatabaseGetMulti } from '../components/DatabaseMulti';

function WSMInverseIndicator({ selectedBlock, path }) {
	
	const [vari, setVari] = useState();

	useEffect(() => {
		setTimeout(() => {
		if (!path) {
			console.warn(`PATH NOT FOUND`);
		} else {
			Firebase.database().ref(path).on('value', snapshot => {
				const state = snapshot.val();
				setVari(state);
			});
		}
		}, 500);
	  }, [selectedBlock, path]);
	
	return (
		<BsCircleFill size="0.8em" color={vari == 1 ? "#C44242" : 'green'}/>
	)
}

export default WSMInverseIndicator
