import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { API_URL } from '../../../utils/url';

const Google = ({ informParent = (f) => f, clientId, apiUrl }) => {
	console.log(clientId);
	const responseGoogle = (response) => {
		console.log(response);
		axios({
			method: 'POST',
			url: `${API_URL}/google-login`,
			data: { idToken: response.tokenId },
		})
			.then((response) => {
				console.log('GOOGLE SIGNIN SUCCESS', response);
				// inform parent component
				informParent(response);
			})
			.catch((error) => {
				console.log('GOOGLE SIGNIN ERROR', error.response);
			});
	};
	return (
		<div className='pb-3'>
			<GoogleLogin
				clientId='533277774493-om55imjbhp9ckpk8qmnf3chvcb7vidm6.apps.googleusercontent.com'
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
					>
						<div className=' p-2 rounded-full '>
							<i className='fab fa-google ' />
						</div>
						<span className='ml-4'>Sign In with Google</span>
					</button>
				)}
				cookiePolicy={'single_host_origin'}
			/>
		</div>
	);
};

export default Google;
