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

	return (
		<>
			{message}: {vari}
		</>
	)
}

export default VarDisplay;
