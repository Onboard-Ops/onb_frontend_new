import AxiosInstance from '../../../utils/axios';
import { ProjectType } from '../../actionTypes/';
const { ADD_PROJECT_REQUEST, ADD_PROJECT_FAILURE, ADD_PROJECT_SUCCESS } = ProjectType;

export const AddProjectAction = (form) => {
	return async (dispatch) => {
		dispatch({ type: ADD_PROJECT_REQUEST });
		const response = await AxiosInstance.post(`/create-project`, {
			...form,
		});
		// console.log('response data from project', response);
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
