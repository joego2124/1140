import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../config';
import Firebase from "firebase";

const PropertiesPanel = () => {

	const [open, setOpen] = useState(true);

	const [dirOfTravel, setDirOfTravel] = useState();

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	function getData() {
		let ref = Firebase.database().ref('/WSM/DirectionsOfTravel');
		ref.on('value', snapshot => {
			setDirOfTravel(snapshot.val());
		});
	}

	function setData(newState, commandType) {
        if(commandType == "dir"){
            Firebase.database().ref('/WSM/DirectionsOfTravel').set(newState);
        }
	}

	const directionOfTravel = useCallback(
        async event => {
            event.preventDefault();
            const {dirOfTravel} = event.target.elements;
            setDOT(dirOfTravel.value);
        }, []
    );

	// DOT = Direction of Travel
	function getDOT(){
        let ref = Firebase.database().ref('/WSM/DirectionsOfTravel');
        ref.on('value', snapshot => {
            setDirOfTravel(snapshot.val());
        });
    }

	// DOT = Direction of Travel
	function setDOT(newDOT){
        Firebase.database().ref('/WSM/DirectionsOfTravel').set(parseInt(newDOT))
    }

	useEffect(getData, []);
	useEffect(() => getDOT());

	return (
		// Properties title
		<div style={{
			textAlign: "center",
			background: "grey",
			width: "30%",
		}}>
			<h1>PROPERTIES</h1>
			<div style={{
				textAlign: "left",
				paddingLeft: 100,
			}}>
				<p>Block Size: </p>
				<p>Directions of Travel: {dirOfTravel}</p>
				<p>Elevation: </p>
				<p>Desired Track Temp: </p>
				<p>Grade: </p>
				<p>Railway Crossing: </p>
				<p>Speed Limit: </p>
			</div>
		</div>

	)
}

export default PropertiesPanel
