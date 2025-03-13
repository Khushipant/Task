const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
        case "SIGNUP_REQUEST":
            return { ...state, loading: true };
        case "LOGIN_SUCCESS":
        case "SIGNUP_SUCCESS":
            localStorage.setItem("token", action.payload.token);
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case "LOGIN_FAIL":
        case "SIGNUP_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "LOGOUT":
            localStorage.removeItem("token");
            return { user: null, token: null };
        default:
            return state;
    }
};
