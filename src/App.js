import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CTC from './CTC';
import Nav from './Nav';
import TopBar from './TopBar';
import TrainController from './TrainController';
import { SpeedProvider } from './SpeedProvider';

function App() {

	return (
		<SpeedProvider>
			<Router>
				<div className="App">
					<TopBar />
					<Nav />
					<Switch>
						<Route path="/" exact component={CTC}/>
						<Route path="/CTC" exact component={CTC}/>
						<Route path="/TrainController" exact component={TrainController}/>
					</Switch>
				</div>
			</Router>
		</SpeedProvider>
	);
}

export default App;
