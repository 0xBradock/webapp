import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';
import Follow from './components/follow/Follow';
import AddPatient from './components/follow/AddPatient';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// Load User from localStorage
setAuthToken(localStorage.token);

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute exact path='/add-patient' component={AddPatient} />
							<PrivateRoute exact path='/follow' component={Follow} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;