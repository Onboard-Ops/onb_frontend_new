import { DashboardTypes } from "../../actionTypes";
const {
  DASHBOARD_API_DATA,
  DASHBOARD_API_LOADER_OFF,
  DASHBOARD_API_LOADER_ON,
  DASHBOARD_CURRENT_PROJECT,
} = DashboardTypes;

const InitialState = {
  dashboard: [],
  currentProject: null,
  dashboardLoading: false,
  dashboardApiCall: {
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
        dashboard: payload,
      };
      break;
    case DASHBOARD_API_LOADER_ON:
      state = {
        ...state,
        dashboardLoading: true,
      };
      break;
    case DASHBOARD_API_LOADER_OFF:
      state = {
        ...state,
        dashboardLoading: false,
      };
      break;
    case DASHBOARD_CURRENT_PROJECT:
      console.log("CALLING REDUX", payload);
      state = {
        ...state,
        currentProject: payload,
      };
      break;
  }

  return state;
};
