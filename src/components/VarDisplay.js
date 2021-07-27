import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { DatabaseGet } from '../Database';

function VarDisplay({varName, message, parentName, units, selectedTrain}) {
	
	const [vari, setVari] = useState('default');

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);

	// useEffect(() => {if(callback != undefined) callback(vari);}, [vari]);

	console.log(selectedTrain != undefined ? selectedTrain[varName] : "");

	return (
		<div className="componentDiv">
			<p className="componentLabel">{message}: </p>
			<div className="componentText">{selectedTrain != undefined ? selectedTrain[varName] : vari}</div> {units}
		</div>
	)
}

export default VarDisplay;
