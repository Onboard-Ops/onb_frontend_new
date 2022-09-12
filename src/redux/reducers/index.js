import { combineReducers } from 'redux';
import { AuthReducer } from './auth/auth.reducers';
import { ProjectReducer } from './project/project.reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	project: ProjectReducer,
});

export default rootReducer;
