import portrait from "./portrait.png"
import { React, useContext, useEffect, useState } from 'react'
import { Image, Navbar, Dropdown, Form, Button, Nav, ButtonGroup } from 'react-bootstrap'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
// import { SpeedContext } from './SpeedProvider';
// import firebaseApp from './base';
import Firebase from "firebase";
import config from './config';

// import { DatabaseGet } from './Database';

function TopBar() {

	//REMOVED SPEEDSTATE CONTEXT SINCE IT WAS CASUSING PAIN AND SUFFERING
	// const [speedState, setSpeedState] = useContext(SpeedContext);
	const [speed, setSpeed] = useState(0);
	const [pause, setPause] = useState(true);

	useEffect(() => {
		Firebase.database().ref('/SimulationClock/speed').on('value', snapshot => {
			const state = snapshot.val();
			setSpeed(state);
			console.log('set speed database:',state, speed);
		})
	}, []);
		
	// useEffect(() => {
	// 	setTimeout(() => DatabaseGet(setSpeed, 'speed'), 500);
	//   }, []);

	useEffect(() => {
		Firebase.database().ref('/SimulationClock/paused').on('value', snapshot => {
			const state = snapshot.val();
			setPause(state);
			console.log('set pause database:',state, pause);
		})
	}, []);


	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	function setDatabaseSpeed(newSpeed) {
		Firebase.database().ref('/SimulationClock/speed').set(newSpeed);
	}

	function setDatabasePaused(newPaused) {
		Firebase.database().ref('/SimulationClock/paused').set(newPaused);
		console.log('setting paused');
		// setTimeout(() => clockTick(), 1000);
	}

	function clockTick() {
		console.log('tick: paused', pause, 'speed', speed);
		setPause(!pause);
		if(!pause) {
		// if(!speedState.paused) {
			Firebase.database().ref('/SimulationClock/Time').transaction( time => {
				return time + 1;
			});

			if(!pause)
				setTimeout(() => clockTick(), 1000 * (1/speed));
			// setTimeout(() => clockTick(), 1000 * (1/speedState.speed));
		}
	}

	return (
		<Navbar style={styles.bar} expand="lg">
			<Navbar.Brand style={styles.brandTitle}>
				TRANES
				<div style={ styles.verticalDivider }></div>
				<div style={ styles.currentPageHeader }>
					CTC Dashboard
				</div>
			</Navbar.Brand>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto"></Nav>

				{/* Right side of top bar */}
				<Form inline>

					{/* Time Display */}
					<Navbar.Text style={styles.timeDisplay}>12:00:00</Navbar.Text>

					{/* Play/Pause Button */}
					<Button style={styles.pausePlay} onClick={() => {
						var newPaused = !pause;
						// var newPaused = !speedState.paused;
						setDatabasePaused(newPaused);
						clockTick();
					}}>
						{ pause ? <BsPlayFill color="#7E7E7E" size="2em"/> : <BsPauseFill color="#7E7E7E" size="2em"/> }
						{/* { speedState.paused ? <BsPlayFill color="#7E7E7E" size="2em"/> : <BsPauseFill color="#7E7E7E" size="2em"/> } */}
					</Button>

					{/* Speed Dropdown */}
					<Dropdown as={ButtonGroup} onSelect={ selected => {
						setDatabaseSpeed(Number(selected));
					}} alignRight>
						<Button style={styles.speedButton}>{ `x${speed}` }</Button>
						{/* <Button style={styles.speedButton}>{ `x${speedState.speed}` }</Button> */}

						<Dropdown.Toggle split style={styles.speedDropdown} id="dropdown-split-basic" />

						<Dropdown.Menu>
							<Dropdown.Item eventKey="0.1">x0.1</Dropdown.Item>
							<Dropdown.Item eventKey="0.5">x0.5</Dropdown.Item>
							<Dropdown.Item eventKey="1">x1</Dropdown.Item>
							<Dropdown.Item eventKey="2">x2</Dropdown.Item>
							<Dropdown.Item eventKey="10">x10</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					{/* Profile Pic Dropdown */}
					<Dropdown alignRight>
						<Dropdown.Toggle style={styles.portrait} >
							<Image src={portrait} style={{maxWidth: "100%",}} roundedCircle/>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item >Settings</Dropdown.Item>
							<Dropdown.Item onClick={()=>Firebase.auth().signOut()}>Log out</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

				</Form>
			</Navbar.Collapse>
		</Navbar>
	)
}

const styles = {
	bar: { 
		background: "#1C4E80", 
		height: "64px", 
		boxShadow: "0px 0px 25px rgba(0,0,0,.5)",
		zIndex: "1000"
	},
	brandTitle: { 
		color: "#FFFFFF",
		marginLeft: "64px",
		letterSpacing: "5px",
		fontSize: "3em",
		fontWeight: "1",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	currentPageHeader: {
		width: "100px",
		height: "64px",
		letterSpacing: "0px",
		fontSize: "18px",
		fontWeight: "700",
		color: "#143658",
		overflowWrap: "break-word",
		display: "inline-block",
		wordBreak: "break-word",
	},
	verticalDivider: {
		marginLeft: "15px",
		height: "50px",
		width: "3px",
		background: "#143658",
	},
	timeDisplay: {
		background: "#FFFFFF",
		borderRadius: "32px",
		fontSize: "24px",
		letterSpacing: "5px",
		padding: "0px 10px 0px 10px",
		boxShadow: "inset 0 0 7px black",
		color: "#303030",
		height: "36px",
	},
	pausePlay: {
		borderRadius: "32px",
		height: "36px",
		width: "36px",
		background: "white",
		// boxShadow: "0 0 10px black",
		margin: "0 15px 0 15px",
		padding: "0 0 0 0",
		border: "0px",
	},
	speedButton: {
		borderRadius: "32px 0 0 32px",
		background: "white",
		color: "#202020",
		border: "0px",
		borderRight: "2px solid",
		borderColor: "#D5D5D5",
	},
	speedDropdown: {
		borderRadius: "0 32px 32px 0",
		background: "white",	
		color: "black",
		border: "0px",
	},
	portrait: {
		borderRadius: "50%",
		width: "48px",
		height: "48px",
		margin: "0 15px 0 45px",
		padding: "0px",
	}
}

export default TopBar
