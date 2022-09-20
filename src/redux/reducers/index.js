import { combineReducers } from "redux";
import { AuthReducer } from "./auth/auth.reducers";
import { ProjectReducer } from "./project/project.reducer";
import { PeopleReducer } from "./people/people.reducer";
import { ToDoReducer } from "./todo/todo.reducer";
import { RolesReducer } from "./roles/roles.reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  project: ProjectReducer,
  people: PeopleReducer,
  todo: ToDoReducer,
  roles: RolesReducer,
});

export default rootReducer;
