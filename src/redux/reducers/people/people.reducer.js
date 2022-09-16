import { PeopleTypes } from "../../actionTypes";
const { LOGIN_REQUEST, LOGOUT_FAILURE } = PeopleTypes;

const InitialState = {
  peopleLoading: false,
  peopleApiCall: {
    apiCalled: false,
    title: "",
    status: "",
  },
};

export const PeopleReducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      state = {
        ...state,
        isAuthenticating: true,
      };
      break;
  }

  return state;
};
