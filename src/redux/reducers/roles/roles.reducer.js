import { RolesTypes } from "../../actionTypes";
const {
  ROLES_API_CALL,
  ROLES_API_CALL_OFF,
  ROLES_API_LOADER_OFF,
  ROLES_API_LOADER_ON,
  ROLES_API_DATA,
} = RolesTypes;

const InitialState = {
  roles: [],
  rolesLoading: false,
  rolesApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const RolesReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ROLES_API_DATA:
      state = {
        ...state,
        roles: payload?.allRoles,
      };
      break;
    case ROLES_API_CALL:
      state = {
        ...state,
        peopleApiCall: {
          apiCalled: payload?.apiCalled,
          title: payload?.title,
          status: payload?.status ? "success" : "error",
        },
      };
      break;
  }

  return state;
};