import { ProjectType } from '../../actionTypes';
const { ADD_PROJECT_REQUEST, ADD_PROJECT_FAILURE, ADD_PROJECT_SUCCESS } = ProjectType;

const InitialState = {
	project: {
		title: '',
		kickOff: '',
		dueDate: '',
		owner: {},
		magic_link: '',
	},
	isProjectAdding: false,
	isProjectAdded: false,
	loading: false,
	error: '',
	message: '',
};

export const ProjectReducer = (state = InitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_PROJECT_REQUEST:
			state = {
				...state,
				isProjectAdding: true,
			};
			break;
		case ADD_PROJECT_SUCCESS:
			state = {
				...state,
				project: payload.project,
				isProjectAdding: false,
				isProjectAdded: true,
				message: payload.message,
			};
			break;
		case ADD_PROJECT_FAILURE:
			state = {
				isProjectAdding: false,
				isProjectAdded: false,
				error: payload.error,
			};
			break;
	}

	return state;
};
