import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { DatabaseGet } from '../Database';

function VarDisplay({varName, message, parentName/*, callback*/}) {
	
	const [vari, setVari] = useState('default');

  useEffect(() => {
    setTimeout(() => DatabaseGet(setVari, varName, parentName), 500);
  }, [parentName]);

	// useEffect(() => {if(callback != undefined) callback(vari);}, [vari]);

	return (
		<div className="componentDiv">
			<h3 className="componentLabel">{message}: </h3>
			<div className="componentText">{vari}</div>
		</div>
	)
}

export default VarDisplay;
