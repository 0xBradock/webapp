import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from './types';

// Laod User
export const loadUser = () => async (dispatch) => {
	setAuthToken(localStorage.token);

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type    : USER_LOADED,
			payload : res.data
		});

		dispatch(
			setAlert(`Welcome ${res.data.firstname} ${res.data.lastname}`, 'success')
		);
	} catch (err) {
		dispatch({
			type : AUTH_ERROR
		});
	}
};

// Register User
export const register = ({
	firstname,
	lastname,
	institution,
	jobtitle,
	email,
	password
}) => async (dispatch) => {
	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	const body = JSON.stringify({
		firstname,
		lastname,
		institution,
		jobtitle,
		email,
		password
	});

	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type    : REGISTER_SUCCESS,
			payload : res.data
		});

		dispatch(loadUser());
	} catch (err) {
		//TODO: factor to ./src/helpers/errorAlerts as a
		const errors = err.response ? err.response.data.errors : null;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
		//TODO:

		dispatch({
			type : REGISTER_FAIL
		});
	}
};

// Login User
export const loginAuth = ({ email, password }) => async (dispatch) => {
	const config = {
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	const body = JSON.stringify({
		email,
		password
	});

	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type    : LOGIN_SUCCESS,
			payload : res.data
		});

		dispatch(loadUser());
	} catch (err) {
		dispatch({
			type : LOGIN_FAIL
		});
		const errors = err.response ? err.response.data.errors : null;
		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, 'danger'));
			});
		}
	}
};

// Logout User
export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
};