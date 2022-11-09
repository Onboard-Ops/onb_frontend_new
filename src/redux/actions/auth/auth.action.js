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
	DELETE_ACCOUNT_REQUEST,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_FAILURE,
} = AuthTypes;

export const LoginAction = (user, navigate) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		let response = await axios.post(`${API_URL}/signin`, { ...user });
		response?.status && dispatch({ type: BUTTON_LOADER_OFF });
		const { data } = response;
		console.log('Data from login', data);
		console.log('Access from login', data?.user?.role?.access);
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
			if (token && user?.role?.access === 'project-admin') {
				window.location.replace('/projects');
				// navigate('/projects');
			} else if (token) {
				window.location.replace(`/overview/${data?.project?.magic_link}/${data?.project?._id}`);
			} else {
				window.location.replace('/login');
			}
		}
	} catch (err) {
		dispatch({ type: LOGIN_FAILURE });
		message.error(err?.response?.data?.msg);
	}
};
export const EmailVerificationAction = (otp, userId, navigate) => async (dispatch) => {
	try {
		dispatch({ type: VERIFICATION_REQUEST });
		let response = await axios.post(`${API_URL}/email-validation/${userId}`, { otp });

		if (response?.data?.status) {
			// const project = JSON.parse(localStorage.getItem('currentProjectData'));
			const status = response?.data?.status;
			const userData = response?.data?.UserData;
			console.log('User data from verify', userData);

			dispatch({
				type: VERIFICATION_SUCCESS,
				payload: { status, userData },
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

export const SignupAction = (user, setIsLogOpen, onClose) => async (dispatch) => {
	try {
		dispatch({ type: SIGN_UP_REQUEST });
		const res = await AxiosInstance.post(`/signup`, {
			...user,
		});
		console.log('Data from signup', res);

		// setTimeout(() => {
		if (res?.status === 200) {
			const token = res?.data?.user.token;
			const userRes = res?.data?.user;
			const roleAccess = res?.data?.user?.role?.roleAccess;
			const roleValue = res?.data?.user?.role?.roleValue;

			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(userRes));

			dispatch({
				type: SIGN_UP_SUCCESS,
				payload: { token, userRes, roleAccess, roleValue },
			});
			return res;
		}
		// }, 40000);
	} catch (error) {
		setIsLogOpen(false);
		onClose();
		message.error(error?.response?.data?.msg);
		await window.location.replace(`/login`, {
			replace: true,
		});
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

export const DeleteAccountAction = (navigate) => async (dispatch) => {
	try {
		const token = window.localStorage.getItem('token');

		dispatch({
			type: DELETE_ACCOUNT_REQUEST,
		});
		const response = await AxiosInstance.delete('/delete-account');
		console.log('Response from delete account', response);
		if (response?.data?.status === true) {
			dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: response?.data?.msg });
			message.success(response?.data?.msg, 4);
			localStorage.clear();
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 3000);
		}
		if (response?.data?.status === false) {
			dispatch({ type: DELETE_ACCOUNT_FAILURE, payload: response?.data?.msg });
			message.error(response?.data?.msg);
		}
		if (response?.status !== 200) {
			dispatch({ type: LOGOUT_FAILURE, payload: 'Something went wrong' });
			message.error('Something went wrong');
		}
	} catch (error) {
		console.error(error);
		message.error(error.message);
	}
};
