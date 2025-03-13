import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import { TaskList, CreateTask } from "./components/TaskList";
import store from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/tasks" element={<TaskList />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
