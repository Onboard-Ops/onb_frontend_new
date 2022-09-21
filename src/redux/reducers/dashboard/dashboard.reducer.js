import { DashboardTypes } from "../../actionTypes";
const {
  DASHBOARD_API_DATA,
  DASHBOARD_API_LOADER_OFF,
  DASHBOARD_API_LOADER_ON,
} = DashboardTypes;

const InitialState = {
  dashboard: [],
  currentProject: "",
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
      console.log(payload, "LOAD");
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
  }

  return state;
};
