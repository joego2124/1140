import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet} from '../Database';

function WSMDisplay({varName, message, parentName}) {
	
	const [vari, setVari] = useState('default');

	useEffect(() => {setTimeout(()=>DatabaseGet(setVari, varName, parentName), 500);}, [parentName]);

	return (
        <p>{message}: {vari}</p>
	)
}

export default WSMDisplay
