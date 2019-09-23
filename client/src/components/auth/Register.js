import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
	const [ formData, setFormData ] = useState({
		firstname   : '',
		lastname    : '',
		institution : '',
		jobtitle    : '',
		email       : '',
		password    : '',
		password2   : ''
	});

	const {
		firstname,
		lastname,
		institution,
		jobtitle,
		email,
		password,
		password2
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match');
		} else {
			const newUser = {
				firstname,
				lastname,
				institution,
				jobtitle,
				email,
				password
			};

			try {
				const config = {
					headers : {
						'Content-Type' : 'Application/json'
					}
				};

				const body = JSON.stringify(newUser);

				const res = await axios.post('/api/users', body, config);

				console.log(res.data);
			} catch (err) {
				console.error(err.response.data);
			}
		}
	};

	return (
		<Fragment>
			<h1>Sign Up</h1>
			<p>Create Your Account</p>
			<i className='fas fa-user'>Create Your Account</i>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className='row'>
					<div className='six columns'>
						<label htmlFor='exFirstName'>First Name</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Dian'
							id='exFirstName'
							name='firstname'
							value={firstname}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exLastName'>Last Name</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Cecht'
							id='exLastName'
							name='lastname'
							value={lastname}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>

				<div className='row'>
					<div className='six columns'>
						<label htmlFor='exInstitution'>Institution</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Hospital ...'
							id='exInstitution'
							name='institution'
							value={institution}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exJobTitle'>Your position</label>
						<input
							className='u-full-width'
							type='text'
							placeholder='Head of ...'
							id='exJobTitle'
							name='jobtitle'
							value={jobtitle}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</div>

				<label htmlFor='exEmail'>Your email</label>
				<input
					className='u-full-width'
					type='email'
					placeholder='account@provider.ext'
					id='exEmail'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
					required
				/>

				<div className='row'>
					<div className='six columns'>
						<label htmlFor='exPass1'>Password</label>
						<input
							className='u-full-width'
							type='password'
							placeholder='At least 5 characters ...'
							id='exPass1'
							name='password'
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>

					<div className='six columns'>
						<label htmlFor='exPass2'>Re-type Password</label>
						<input
							className='u-full-width'
							type='password'
							placeholder='Re-type password'
							id='exPass2'
							name='password2'
							value={password2}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</div>

				<label className='example-send-yourself-copy'>
					<input type='checkbox' />
					<span className='label-body'>I accept the terms ...</span>
				</label>
				<input className='button-primary' type='submit' value='Submit' />
			</form>
		</Fragment>
	);
};

export default Register;
