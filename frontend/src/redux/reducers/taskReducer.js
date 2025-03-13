// taskReducer.js
const FETCH_TASKS = "FETCH_TASKS";
const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
const DELETE_TASK = "DELETE_TASK";

const initialState = {
    tasks: []
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            return { ...state, tasks: action.payload || [] };
        case UPDATE_TASK_STATUS:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                )
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload)
            };
        case "CREATE_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };
        default:
            return state;
    }
};

export { FETCH_TASKS, UPDATE_TASK_STATUS, DELETE_TASK, taskReducer };