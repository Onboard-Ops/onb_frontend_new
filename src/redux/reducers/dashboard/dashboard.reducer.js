import { ToDoTypes } from "../../actionTypes";
const { DASHBOARD_MENTIONS_API_DATA, DASHBOARD_API_DATA } = DashboardReducer;

const InitialState = {
  todo: [],
  todoLoading: false,
  todoApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const DashboardReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_API_DATA:
      state = {
        ...state,
        todo: payload,
      };
      break;
    case DASHBOARD_MENTIONS_API_DATA:
      state = {
        ...state,
        mentions: payload?.allMentions,
      };
      break;
  }

  return state;
};
