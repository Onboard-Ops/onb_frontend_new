import { AuthTypes } from '../../actionTypes';
const {
	LOGIN_REQUEST,
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
	LOGOUT_FAILURE,
	LOGOUT_SUCCESS,
	SIGN_UP_SUCCESS,
	SIGN_UP_REQUEST,
	SIGN_UP_FAILURE,
	BUTTON_LOADER_ON,
	BUTTON_LOADER_OFF,
	VERIFICATION_REQUEST,
	VERIFICATION_SUCCESS,
	VERIFICATION_FAILURE,
	DELETE_ACCOUNT_REQUEST,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_FAILURE,
} = AuthTypes;

const InitialState = {
	token: null,
	user: {
		fullName: '',
		username: '',
		email: '',
		role: {
			roleAccess: '',
			roleValue: '',
		},
	},

	isAauthenticated: false,
	isAuthenticating: false,
	isSignedUp: false,
	isSigningIn: false,
	loading: false,
	loader: {
		buttonLoader: false,
	},
	error: '',
	message: '',
	isVerified: false,
	isVeryfying: false,
	isDeletingAccount: false,
	isDeletedAccount: false,
};

export const AuthReducer = (state = InitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_REQUEST:
			state = {
				...state,
				isAuthenticating: true,
			};
			break;
		case LOGIN_SUCCESS:
			state = {
				...state,
				user: payload.user,
				token: payload.token,
				isAauthenticated: true,
				isAuthenticating: false,
			};
			break;
		case LOGIN_FAILURE:
			state = {
				isAauthenticated: false,
				isAuthenticating: false,
			};
			break;
		case SIGN_UP_REQUEST:
			state = {
				...state,
				isSigningIn: true,
			};
			break;
		case SIGN_UP_SUCCESS:
			state = {
				...state,
				user: payload.userRes,
				token: payload.token,
				isSignedUp: true,
				isSigningIn: false,
				role: {
					roleValue: payload.roleValue,
					roleAccess: payload.roleAccess,
				},
				message: 'You have successfully signed up',
			};
			break;
		case SIGN_UP_FAILURE:
			state = {
				...state,
				isSignedUp: false,
				isSigningIn: false,
				error: payload.error,
			};
			break;
		case VERIFICATION_REQUEST:
			state = {
				...state,
				isVeryfying: true,
			};
			break;
		case VERIFICATION_SUCCESS:
			state = {
				...state,
				isVeryfying: false,
				isVerified: true,
			};
			break;
		case VERIFICATION_FAILURE:
			state = {
				...state,
				isVeryfying: false,
				isVerified: false,
				error: payload,
			};
			break;
		case LOGOUT_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;
		case LOGOUT_SUCCESS:
			state = {
				...InitialState,
				loading: false,
			};
			break;
		case LOGOUT_FAILURE:
			state = {
				...state,
				error: payload.error,
				loading: false,
			};
			break;
		case DELETE_ACCOUNT_REQUEST:
			state = {
				...state,
				isDeletingAccount: true,
			};
			break;
		case DELETE_ACCOUNT_SUCCESS:
			state = {
				...state,
				isDeletingAccount: false,
				isDeletedAccount: true,
				message: payload,
			};
			break;
		case DELETE_ACCOUNT_SUCCESS:
			state = {
				...state,
				isDeletingAccount: false,
				isDeletedAccount: false,
				error: payload,
			};
			break;
		case BUTTON_LOADER_ON:
			state = {
				...state,
				loader: {
					buttonLoader: true,
				},
			};
			break;
		case BUTTON_LOADER_OFF:
			state = {
				...state,
				loader: {
					buttonLoader: false,
				},
			};
			break;
	}

	return state;
};
