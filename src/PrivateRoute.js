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
import TrainControllerDriver from './TrainController/TrainControllerDriver';
import TrainControllerEngineer from "./TrainController/TrainControllerEngineer";
import TrainModel from './TrainModel/TrainModel';
import TrackModel from './TrackModel/TrackModel';
import WaysideController from './WaysideController/WaysideController';
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
                      						<Route path="/WaysideController" exact component={WaysideController}/>
											<Route path="/TrackModel" exact component={TrackModel}/>
											<Route path="/TrainModel" exact component={TrainModel}/>
											<Route path="/TrainControllerDriver" exact component={TrainControllerDriver}/>
											<Route path="/TrainControllerEngineer" exact component={TrainControllerEngineer} />
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
