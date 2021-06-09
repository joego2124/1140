import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CTC from './CTC';
import Nav from './Nav';
import TopBar from './TopBar';
import TrainController from './TrainController';

function App() {

	return (
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
	);
}

export default App;
