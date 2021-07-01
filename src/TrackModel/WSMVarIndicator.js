import React, { useEffect, useState, useContext } from 'react';
import { Button, Container, Row  } from 'react-bootstrap';
import {DatabaseGet} from '../Database';
import { BsCircleFill } from "react-icons/bs";

function WSMIndicator({varName, message, parentName}) {
	
	const [vari, setVari] = useState(false);

	useEffect(() => {setTimeout(()=>DatabaseGet(setVari, varName, parentName), 500);}, [parentName]);

	return (
		<p>{message}</hp>
		<BsCircleFill size="1.0em" color={vari ? "#C44242" : 'green'}/>
	)
}

export default WSMIndicator
