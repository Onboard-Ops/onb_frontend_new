import { ToDoTypes } from "../../actionTypes";
const {
  TODO_API_CALL,
  TODO_API_CALL_OFF,
  TODO_API_LOADER_OFF,
  TODO_API_LOADER_ON,
  TODO_API_DATA,
} = ToDoTypes;

const InitialState = {
  todo: [],
  todoLoading: false,
  todoApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const ToDoReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TODO_API_DATA:
      state = {
        ...state,
        todo: payload,
      };
      break;
    case TODO_API_CALL:
      state = {
        ...state,
        todoApiCall: {
          apiCalled: payload?.apiCalled,
          title: payload?.title,
          status: payload?.status ? "success" : "error",
        },
      };
      break;
  }

  return state;
};
