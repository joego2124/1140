import React, { useState, useEffect, useCallback } from 'react';
import SlidingPane from "react-sliding-pane";
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../config';
import Firebase from "firebase";

const StatesPanel = () => {

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	const [beac, setBeac] = useState(true);
	const [sig, setSig] = useState(true);
	const [swi, setSwi] = useState(true);

	function getData() {
		let ref = Firebase.database().ref('/WSM/Beacon');
		ref.on('value', snapshot => {
			setBeac(snapshot.val());
		});
		ref = Firebase.database().ref('/WSM/SignalState');
		ref.on('value', snapshot => {
			setSig(snapshot.val());
		});
		ref = Firebase.database().ref('/WSM/SwitchState');
		ref.on('value', snapshot => {
			setSwi(snapshot.val());
		});
	}

	function setData(newState, commandType) {
        if(commandType == "beac"){
            Firebase.database().ref('/WSM/Beacon').set(newState);
        }
		else if(commandType == "sig"){
            Firebase.database().ref('/WSM/SignalState').set(newState);
        }
		else if(commandType == "swi"){
            Firebase.database().ref('/WSM/SwitchState').set(newState);
        }
	}

	const beacon = useCallback(
        async event => {
            event.preventDefault();
            const {beac} = event.target.elements;
            setBeacon(beac.value);
        }, []
    );
	const signal = useCallback(
        async event => {
            event.preventDefault();
            const {sig} = event.target.elements;
            setSignal(sig.value);
        }, []
    );
	const trackSwitch = useCallback(
        async event => {
            event.preventDefault();
            const {swi} = event.target.elements;
            setSignal(swi.value);
        }, []
    );

	/////////////////////////////////////////////////////////////////
	// Getter Functions
	/////////////////////////////////////////////////////////////////
	function getBeacon(){
        let ref = Firebase.database().ref('/WSM/Beacon');
        ref.on('value', snapshot => {
            setBeac(snapshot.val());
        });
    }
	function getSignal(){
        let ref = Firebase.database().ref('/WSM/SignalState');
        ref.on('value', snapshot => {
            setSig(snapshot.val());
        });
    }
	function getSwitch(){
        let ref = Firebase.database().ref('/WSM/SwitchState');
        ref.on('value', snapshot => {
            setSwi(snapshot.val());
        });
    }

	/////////////////////////////////////////////////////////////////
	// Setter Functions
	/////////////////////////////////////////////////////////////////
	function setBeacon(newBeac){
        Firebase.database().ref('/WSM/Beacon').set(parseInt(newBeac))
    }
	function setSignal(newSig){
        Firebase.database().ref('/WSM/SignalState').set(parseInt(newSig))
    }
	function setSwitch(newSwi){
        Firebase.database().ref('/WSM/SwitchState').set(parseInt(newSwi))
    }

	useEffect(getData, []);
	useEffect(() => getBeacon());
	useEffect(() => getSignal());
	useEffect(() => getSwitch());

	return (
		<div style={{
			textAlign: "center",
			background: "#cfdfe3",
			width: "70%",
		}}>
			<h1>CURRENT STATES</h1>
			<div style={{
				textAlign: "left",
				paddingLeft: 50,
				paddingRight: 50,
				paddingBottom: 10,
			}}>
				<Container fluid>
					<Row>
						<Col xs={4}>
							<h4>(BOOL) AVAILABILITY</h4>
							<p></p>
							<p></p>
							<p>(BOOL) Track occupied?</p>
							<p>(BOOL) Track under maintenance?</p>
							<p>(BOOL) Maximum capacity?</p>
							<p>(BOOL)
								<DropdownButton id="dropdown-basic-button" title="Any failures?">
								<Dropdown.Item href="#/action-1">Broken rail</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Track circuit</Dropdown.Item>
								<Dropdown.Item href="#/action-3">Transponder/beacon</Dropdown.Item>
								</DropdownButton>
							</p>
						</Col>
						<Col>
							<h4>TRACK ELEMENTS</h4>
							<p></p>
							<p></p>
							<p>Beacon: {beac}</p>
							<p>Signal: {sig}</p>
							<p>Switch Position: {swi}</p>
							<p></p>
							<p>(BOOL) Railway Crossing</p>
							<p>(BOOL) Track Heaters</p>
							<p>(add indent) Current temp: </p>
						</Col>
						<Col>
							<h4>PASSENGERS</h4>
							<p></p>
							<p></p>
							<p>Boarding: </p>
							<p>Departing: </p>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	)
}

export default StatesPanel