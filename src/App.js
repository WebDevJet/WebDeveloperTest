import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Guide from './components/Guide';
import GuidesList from './components/GuidesList';
import About from './components/About';

function App() {
	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='container mx-auto'>
					<Switch>
						<Route exact path='/' component={GuidesList} />

						<Route exact path='/about' component={About} />

						<Route exact path='/:id' component={Guide} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
