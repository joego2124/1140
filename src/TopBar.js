import portrait from "./portrait.png"
import { React, useContext } from 'react'
import { Image, Navbar, Dropdown, Form, Button, Nav, ButtonGroup } from 'react-bootstrap'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { SpeedContext } from './SpeedProvider';
import Firebase from "firebase";
import config from './config';

function TopBar() {

	const [speedState, setSpeedState] = useContext(SpeedContext);

	if (!Firebase.apps.length) {
		Firebase.initializeApp(config);
	}else {
		Firebase.app(); // if already initialized, use that one
	}

	function setSpeed(newSpeed) {
		Firebase.database().ref('/speedSettings/speed').set(newSpeed);
	}

	function setPaused(newPaused) {
		Firebase.database().ref('/speedSettings/paused').set(newPaused);
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
						var newPaused = !speedState.paused;
						setPaused(newPaused);
						setSpeedState({
							...speedState, 
							paused: newPaused,
						});
					}}>
						{ speedState.paused ? <BsPlayFill color="#7E7E7E" size="2em"/> : <BsPauseFill color="#7E7E7E" size="2em"/> }
					</Button>

					{/* Speed Dropdown */}
					<Dropdown as={ButtonGroup} onSelect={ selected => {
						setSpeed(Number(selected));
						setSpeedState({
							...speedState, 
							speed: Number(selected)
						 });
					}} alignRight>
						<Button style={styles.speedButton}>{ `x${speedState.speed}` }</Button>

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
							<Dropdown.Item href="#/settings">Settings</Dropdown.Item>
							<Dropdown.Item href="#/logout">Log out</Dropdown.Item>
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
		// marginLeft: "64px",
		// zIndex: "1107",
		// boxShadow: "0px 0px 30px black",
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
