
import axios from "axios";
import { FETCH_TASKS, UPDATE_TASK_STATUS, DELETE_TASK } from "../reducers/taskReducer";

export const fetchTasks = () => async (dispatch) => {
    try {
        const { data } = await axios.get("/api/tasks");
        dispatch({ type: FETCH_TASKS, payload: data });
    } catch (error) {
        console.error("Error fetching tasks", error);
    }
};

export const updateTaskStatus = (taskId, status) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`/api/tasks/${taskId}/status`, { status });
        dispatch({ type: UPDATE_TASK_STATUS, payload: data });
    } catch (error) {
        console.error("Error updating task status", error);
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        await axios.delete(`/api/tasks/${taskId}`);
        dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (error) {
        console.error("Error deleting task", error);
    }
};

export const createTask = (taskData) => async (dispatch) => {
    try {
        const { data } = await axios.post("/api/tasks", taskData);
        dispatch({ type: "CREATE_TASK", payload: data });
    } catch (error) {
        console.error("Error creating task", error);
    }
};

