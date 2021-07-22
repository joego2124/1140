import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet} from '../Database';
import { BsCircleFill } from "react-icons/bs";
import { DatabaseGetMulti } from '../components/DatabaseMulti';

// TODO: GET THIS FUNCTIONING

function WSMInverseIndicator({varName, message, selectedBlock}) {
	
	// const [vari, setVari] = useState(false);

	// useEffect(() => {setTimeout(()=>DatabaseGet(setVari, varName, parentName), 500);}, [selectedBlock]);
	
	// return (
	// 	<div>
	// 		<BsCircleFill size="1.0em" color={!vari ? "#C44242" : 'green'}/>{' '}
	// 		{message}
	// 	</div>
	// )
}

export default WSMInverseIndicator
