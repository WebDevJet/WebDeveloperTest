import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Guide from './components/Guide';
import GuidesList from './components/GuidesList';
import About from './components/About';
import './App.css';

function App() {
	return (
		<>
			<a href='#maincontent' className='hidden'>
				Skip to main content
			</a>
			<Router>
				<main className='App'>
					<Navbar />

					<div id='maincontent' className='container mx-auto'>
						<Switch>
							<Route exact path='/' component={GuidesList} />

							<Route exact path='/about' component={About} />

							<Route exact path='/:id' component={Guide} />
						</Switch>
					</div>
				</main>
			</Router>
		</>
	);
}

export default App;
