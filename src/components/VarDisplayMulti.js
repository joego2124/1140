import React, { useEffect, useState, useContext } from 'react';
import Firebase from "firebase";

function VarDisplay({ message, path }) {
	
	const [vari, setVari] = useState('default');

  useEffect(() => {
    setTimeout(() => {
    if (!path) {
        console.warn(`PATH NOT FOUND`);
    } else {
        let ref = Firebase.database().ref(path);
        ref.on('value', snapshot => {
            const state = snapshot.val();
            setVari(state);
        });
    }
    }, 500);
  }, [path]);

	// useEffect(() => {if(callback != undefined) callback(vari);}, [vari]);

	return (
		<div className="componentDiv">
			<h3 className="componentLabel">{message}: </h3>
			<div className="componentText">{vari}</div>
		</div>
	)
}

export default VarDisplay;
