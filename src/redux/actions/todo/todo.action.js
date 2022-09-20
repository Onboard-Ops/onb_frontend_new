import axios from "axios";
import { API_URL } from "../../../utils/url";
import { ToDoTypes } from "../../actionTypes";

const {
  TODO_API_CALL,
  TODO_API_CALL_OFF,
  TODO_API_LOADER_ON,
  TODO_API_LOADER_OFF,
  TODO_API_DATA,
} = ToDoTypes;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const FetchToDoApi = () => async (dispatch) => {
  try {
    dispatch({
      type: TODO_API_CALL_OFF,
    });
    dispatch({
      type: TODO_API_LOADER_ON,
    });
    const res = await axios.get(`${API_URL}/get-all-todos`, config);
    res?.status && dispatch({ type: TODO_API_LOADER_OFF });
    const {
      data: { allMember },
    } = res;
    // console.log(allMember);
    // res?.status && dispatch({ type: TODO_API_DATA, payload: { allMember } });
  } catch (error) {
    console.log(error);
  }
};

export const FetchToDoByUserApi = (userID) => async (dispatch) => {
  try {
    dispatch({
      type: TODO_API_CALL_OFF,
    });
    dispatch({
      type: TODO_API_LOADER_ON,
    });
    const res = await axios.get(`${API_URL}/get-task-by-id/${userID}`, config);
    res?.status && dispatch({ type: TODO_API_LOADER_OFF });
    const {
      data: {
        data: { allTasksBySelectedId },
      },
    } = res;
    res?.status &&
      dispatch({ type: TODO_API_DATA, payload: allTasksBySelectedId });
  } catch (error) {
    console.log(error);
  }
};

export const CreateToDoApi = (formData) => async (dispatch) => {
  try {
    console.log(formData, "DATA");
    dispatch({
      type: TODO_API_CALL_OFF,
    });
    dispatch({
      type: TODO_API_LOADER_ON,
    });
    const res = await axios.post(`${API_URL}/signup`, formData, config);
    res?.status && dispatch({ type: TODO_API_LOADER_OFF });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
