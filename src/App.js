import './App.css';
import React from 'react';

import PrivateRoute from './PrivateRoute'

import { firebase } from "@firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import config from './config';

if (window.location.hostname === "localhost") {
	console.warn("USING EMULATOR DATABASE");
	firebase.database().useEmulator('localhost', 9000);
}

function App() {
	return (
		<FirebaseAuthProvider firebase={firebase} {...config}>
			<PrivateRoute />
		</FirebaseAuthProvider>
	);
}

export default App;
