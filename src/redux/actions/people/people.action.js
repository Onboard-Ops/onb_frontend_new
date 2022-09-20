import axios from "axios";
import { API_URL } from "../../../utils/url";
import { PeopleTypes } from "../../actionTypes/";

const {
  PEOPLE_API_CALL,
  PEOPLE_API_CALL_OFF,
  PEOPLE_API_LOADER_ON,
  PEOPLE_API_LOADER_OFF,
  PEOPLE_API_DATA,
} = PeopleTypes;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const FetchPeopleApi = () => async (dispatch) => {
  try {
    dispatch({
      type: PEOPLE_API_CALL_OFF,
    });
    dispatch({
      type: PEOPLE_API_LOADER_ON,
    });
    const res = await axios.get(`${API_URL}/get-all-people`, config);
    res?.status && dispatch({ type: PEOPLE_API_LOADER_OFF });
    const {
      data: { allMember },
    } = res;
    res?.status && dispatch({ type: PEOPLE_API_DATA, payload: { allMember } });
  } catch (error) {
    console.log(error);
  }
};

export const CreateUserApi = (formData) => async (dispatch) => {
  try {
    console.log(formData, "DATA");
    dispatch({
      type: PEOPLE_API_CALL_OFF,
    });
    dispatch({
      type: PEOPLE_API_LOADER_ON,
    });
    const res = await axios.post(`${API_URL}/signup`, formData, config);
    res?.status && dispatch({ type: PEOPLE_API_LOADER_OFF });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};