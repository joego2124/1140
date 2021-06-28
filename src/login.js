import React, { useCallback } from 'react'
import firebaseApp from './base';
import { Form, Button, Card } from 'react-bootstrap'
import './index.css'
import logo from './trainsLogo.svg'

function Login() {

	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			console.log(email.value, password.value);
			try {
				await firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
				console.log("logged in");
			} catch(error) { alert(error); }
		}
	);

	return (
		<div style={styles.centeredDiv}>
			<img src={logo} style={styles.loginLogo} />
			<Card style={styles.loginCard}>
				<Card.Body>
					<Form onSubmit={handleLogin}>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control name="email" type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control name="password" type="password" placeholder="Password" />
						</Form.Group>

						<div className="text-center">
							<Button variant="primary" type="submit">
								Log In
							</Button>
						</div>
						
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

const styles = {
	loginCard: {
		width: "24rem",
		marginLeft: "auto", 
		marginRight: "auto", 
		borderRadius: "25px", 
		padding: "15px", 
		boxShadow: "0px 15px 35px rgba(0,0,0,.25)",
	},
	centeredDiv: {
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "rgb(0,48,143)",
		background: "linear-gradient(45deg, rgba(0,48,143,1) 0%, rgba(137,207,240,1) 100%)",
		flexDirection: "column",
	},
	loginLogo: {
		width: "32rem",
		margin: "50px",
	},
}

export default Login
