import AxiosInstance from '../../../utils/axios';
import { ProjectType } from '../../actionTypes/';
const {
	ADD_PROJECT_REQUEST,
	ADD_PROJECT_FAILURE,
	ADD_PROJECT_SUCCESS,
	GET_ALL_PROJECT_REQUEST,
	GET_ALL_PROJECT_FAILURE,
	GET_ALL_PROJECT_SUCCESS,
} = ProjectType;

export const AddProjectAction = (form) => {
	return async (dispatch) => {
		dispatch({ type: ADD_PROJECT_REQUEST });
		const response = await AxiosInstance.post(`/create-project`, {
			...form,
		});
		console.log('response', response);
		if (response?.status === 201) {
			const project = response?.data?._project;
			const message = response?.data?.status;

			dispatch({
				type: ADD_PROJECT_SUCCESS,
				payload: { project, message },
			});
		} else {
			if (response.status === 400 || response.status === 404) {
				dispatch({
					type: ADD_PROJECT_FAILURE,
					payload: { error: response.data.error },
				});
			}
		}
	};
};

export const GetAllProjectsByCurrentUser = () => {
	return async (dispatch) => {
		dispatch({ type: GET_ALL_PROJECT_REQUEST });
		const response = await AxiosInstance.get(`/get-all-projects-of-current-user`);
		if (response?.status === 201) {
			const projects = response?.data?.data;
			const length = response?.data?.length;

			dispatch({
				type: GET_ALL_PROJECT_SUCCESS,
				payload: { projects, length },
			});
		} else {
			if (response.status === 400 || response.status === 404) {
				dispatch({
					type: GET_ALL_PROJECT_FAILURE,
					payload: { error: response.data.error },
				});
			}
		}
	};
};
