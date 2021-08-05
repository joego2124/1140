import { firebase } from '@firebase/app';
import 'firebase/auth';
import config from './config';

const firebaseApp = firebase.initializeApp(config);

if (window.location.hostname === "localhost") {
  console.warn("USING EMULATOR DATABASE");
  firebase.database().useEmulator('localhost', 9000);
}

export default firebaseApp; 
