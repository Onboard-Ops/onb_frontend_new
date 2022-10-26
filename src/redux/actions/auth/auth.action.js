import AxiosInstance from '../../../utils/axios';
import { AuthTypes } from '../../actionTypes/';
import { AddProjectAction } from '../../actions';
import { API_URL } from '../../../utils/url';
import { message } from 'antd';
import axios from 'axios';
const {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_FAILURE,
	SIGN_UP_SUCCESS,
	BUTTON_LOADER_ON,
	BUTTON_LOADER_OFF,
	VERIFICATION_REQUEST,
	VERIFICATION_SUCCESS,
	VERIFICATION_FAILURE,
} = AuthTypes;

export const LoginAction = (user, navigate) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		let response = await axios.post(`${API_URL}/signin`, { ...user });
		response?.status && dispatch({ type: BUTTON_LOADER_OFF });
		const { data } = response;

		if (data?.status == true) {
			const { token, user } = response?.data;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('currentProject', data?.project?._id);
			localStorage.setItem('currentProjectName', data?.project?.title);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: { token, user },
			});

			if (token) {
				window.location.replace(`/overview/${data?.project?.magic_link}/${data?.project?._id}`);
			}

			if (token && user?.role?.access === 'project-admin') {
				// window.location.replace('/projects');
				navigate('/projects');
			}
		}
	} catch (error) {
		dispatch({ type: LOGIN_FAILURE });
		message.error('Invalid email-id/password');
	}
};
export const EmailVerificationAction = (otp, userData, navigate) => async (dispatch) => {
	try {
		dispatch({ type: VERIFICATION_REQUEST });
		let response = await axios.post(`${API_URL}/email-validation/${userData._id}`, { otp });

		if (response?.data?.status) {
			const project = JSON.parse(localStorage.getItem('currentProjectData'));
			dispatch({
				type: VERIFICATION_SUCCESS,
				payload: response?.data?.status,
			});
			window.location.replace(`/projects`, {
				replace: true,
			});
		}
		dispatch({
			type: VERIFICATION_FAILURE,
			payload: response?.data?.msg,
		});
	} catch (err) {
		console.log(err);
	}
};

export const SignupAction = (user) => async (dispatch) => {
	try {
		dispatch({ type: SIGN_UP_REQUEST });
		const res = await AxiosInstance.post(`/signup`, {
			...user,
		});
		if (res?.status === 200) {
			const token = res?.data.user.token;
			const user = res?.data.user._user;
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));

			dispatch({
				type: SIGN_UP_SUCCESS,
				payload: { token, user },
			});
			return res;
		}
	} catch (error) {
		message.error(error);
	}
};

export const isUserLoggedIn = () => async (dispatch) => {
	const token = localStorage.getItem('token');
	if (token) {
		const user = JSON.parse(localStorage.getItem('user'));
		dispatch({
			type: LOGIN_SUCCESS,
			payload: { token, user },
		});
	} else {
		dispatch({
			payload: {
				type: LOGIN_FAILURE,
				message: 'User is not logged in',
			},
		});
	}
};

export const signout = () => async (dispatch) => {
	dispatch({
		type: LOGOUT_REQUEST,
	});
	const response = await AxiosInstance.post('/signout');
	if (response.status === 200) {
		localStorage.clear();
		dispatch({ type: LOGOUT_SUCCESS });
	} else {
		dispatch({ type: LOGOUT_FAILURE, payload: response.data.error });
	}
};
