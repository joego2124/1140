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
	const [elev, setElevation] = useState();

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
		ref = Firebase.database().ref('/WSM/Elevation');
		ref.on('value', snapshot => {
			setElevation(snapshot.val());
		});
	}

	function setData(newState, commandType) {
        if(commandType == "dir"){
            Firebase.database().ref('/WSM/DirectionsOfTravel').set(newState);
        }
		else if(commandType == "elev"){
            Firebase.database().ref('/WSM/Elevation').set(newState);
        }
	}

	const directionOfTravel = useCallback(
        async event => {
            event.preventDefault();
            const {dirOfTravel} = event.target.elements;
            setDOT(dirOfTravel.value);
        }, []
    );
	const elevation = useCallback(
        async event => {
            event.preventDefault();
            const {elev} = event.target.elements;
            setElev(elev.value);
        }, []
    );

	/////////////////////////////////////////////////////////////////
	// Getter Functions
	/////////////////////////////////////////////////////////////////
	// DOT = Direction of Travel
	function getDOT(){
        let ref = Firebase.database().ref('/WSM/DirectionsOfTravel');
        ref.on('value', snapshot => {
            setDirOfTravel(snapshot.val());
        });
    }
	function getElev(){
        let ref = Firebase.database().ref('/WSM/Elevation');
        ref.on('value', snapshot => {
            setElevation(snapshot.val());
        });
    }

	/////////////////////////////////////////////////////////////////
	// Setter Functions
	/////////////////////////////////////////////////////////////////
	// DOT = Direction of Travel
	function setDOT(newDOT){
        Firebase.database().ref('/WSM/DirectionsOfTravel').set(parseInt(newDOT))
    }

	function setElev(newElev){
        Firebase.database().ref('/WSM/Elevation').set(parseInt(newElev))
    }

	useEffect(getData, []);
	useEffect(() => getDOT());
	useEffect(() => getElev());

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
				paddingRight: 50,
				paddingBottom: 10
			}}>
				<p>Block Size: </p>
				<p>Directions of Travel: {dirOfTravel}</p>
				<p>Elevation: {elev}</p>
				<p>Desired Track Temp: </p>
				<p>Grade: </p>
				<p>Railway Crossing: </p>
				<p>Speed Limit: </p>
			</div>
		</div>

	)
}

export default PropertiesPanel
