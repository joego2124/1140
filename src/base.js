import { firebase } from "@firebase/app";
import "firebase/auth";
import config from './config';

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;