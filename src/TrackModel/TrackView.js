import React, { useEffect } from 'react';

import config from '../config';
import Firebase from "firebase";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const TrackView = (props) => {

	document.body.style.overflow='hidden';

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

    const setBlock = value => {props.setParentName(value);}

	return (
		<div>
            <Button variant="dark" size="lg" className="blockButton" onClick={()=>{setBlock('Block1');}}>
                1
            </Button>{' '}
            <Button variant="dark" size="lg" className="blockButton" onClick={()=>{setBlock('Block2');}}>
                2
            </Button>{' '}
            <Button variant="dark" size="lg" className="blockButton" onClick={()=>{setBlock('Block3');}}>3</Button>
		</div>
	)
}

export default TrackView