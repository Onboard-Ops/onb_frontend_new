import { message as notify } from "antd";
import axios from "axios";
import { API_URL } from "../../../utils/url";
import { DashboardTypes } from "../../actionTypes";

const {
  DASHBOARD_API_LOADER_ON,
  DASHBOARD_API_LOADER_OFF,
  DASHBOARD_API_DATA,
  DASHBOARD_TASK_MODAL_OFF,
} = DashboardTypes;

const token = window.localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
};

export const FetchCurrentMilestone = (projectID) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_API_LOADER_ON });
    const res = await axios.get(
      `${API_URL}/get-all-milestone-by-current-project/${projectID}`,
      config
    );
    console.log(res);
    const {
      data: {
        data: { allMilestoneByCurrentProject },
      },
    } = res;
    res?.status &&
      dispatch({
        type: DASHBOARD_API_DATA,
        payload: allMilestoneByCurrentProject,
      });
    res?.status && dispatch({ type: DASHBOARD_API_LOADER_OFF });
  } catch (error) {
    console.log(error);
  }
};

export const CreateTaskApi = (formData) => async (dispatch) => {
  try {
    const currentProject = localStorage.getItem("currentProject");
    const res = await axios.post(`${API_URL}/create-task`, formData, config);
    res && notify.success(res?.data?.message);
    res?.data?.status && dispatch(FetchCurrentMilestone(currentProject));
    res?.data?.status && dispatch({ type: DASHBOARD_TASK_MODAL_OFF });
  } catch (error) {
    const {
      response: { data },
    } = error;
    notify.error(data?.message);
  }
};

export const CreateMileStone = (formData) => async (dispatch) => {
  try {
    console.log(formData, "DATA");
    const res = await axios.post(
      `${API_URL}/create-milestone`,
      formData,
      config
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
