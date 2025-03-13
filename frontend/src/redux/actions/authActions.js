import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST } from "../types";

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });

        if (data.token) {
            localStorage.setItem("token", data.token); 
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.message || "Login failed",
        });
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: "LOGOUT" });
};

export const signupUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: "SIGNUP_REQUEST" });

        const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            { name, email, password },
            { headers: { "Content-Type": "application/json" } } // <-- Ensure correct headers
        );

        dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
    } catch (error) {
        console.error("Signup Error:", error); // <-- Debugging output
        dispatch({ 
            type: "SIGNUP_FAIL", 
            payload: error.response?.data?.msg || error.message || "Signup failed" 
        });
    }
};
