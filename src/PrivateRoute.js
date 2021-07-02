import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Nav from './Nav';
import CTC from './CTC/CTC';
import Login from './login';
import TopBar from './TopBar';
<<<<<<< HEAD
import TrainController from './TrainController';
import TrainModel from './TrainModel/TrainModel';
import TrackModel from './TrackModel/TrackModel';
import WaysideController from './WaysideController/WaysideController';
=======
import TrainController from './TrainController/TrainController';
import TCHW from './TrainController/TCHW';
import Ben from './Ben';
import TrainModel from './TrainModel/TrainModel';
>>>>>>> benBranch
import { SpeedProvider } from './SpeedProvider';

import 'firebase/auth';
import { FirebaseAuthConsumer } from '@react-firebase/auth';

const PrivateRoute = () => {
	return (
			<FirebaseAuthConsumer>
				{({ isSignedIn, user, providerId }) => {
					if (isSignedIn) {
						return(
							<SpeedProvider>
								<Router>
									<div className="App">
										<TopBar />
										<Nav />
										<Switch>
											<Redirect exact from="/" to="/CTC"/>
											<Route path="/CTC" exact component={CTC}/>
<<<<<<< HEAD
                      						<Route path="/WaysideController" exact component={WaysideController}/>
											<Route path="/TrackModel" exact component={TrackModel}/>
											<Route path="/TrainModel" exact component={TrainModel}/>
											<Route path="/TrainController" exact component={TrainController}/>
=======
											<Route path="/TrainController" exact component={TrainController}/>
											<Route path="/TCHW" exact component={TCHW}/>
											<Route path="/Ben" exact component={Ben}/>
											<Route path="/TrainModel" exact component={TrainModel}/>
>>>>>>> benBranch
										</Switch>
									</div>
								</Router>
							</SpeedProvider>
						);
					} else {
						return (<Login />);
					}
				}}
			</FirebaseAuthConsumer>
	);
}

export default PrivateRoute;
