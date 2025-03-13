// TaskList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus, deleteTask } from "../redux/actions/taskActions";
import { createTask } from "../redux/actions/taskActions";

const TaskList = () => {
    const dispatch = useDispatch();
    const taskState = useSelector((state) => state.task) || {}; 
    const { tasks = [] } = taskState; 
    const { user } = useSelector((state) => state.auth) || {};

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleStatusToggle = (taskId, currentStatus) => {
        dispatch(updateTaskStatus(taskId, currentStatus === "Completed" ? "Not Completed" : "Completed"));
    };

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(taskId));
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <p>{task.title}</p>
                            <p>Status: {task.status}</p>
                            {user?.role === "employee" && (
                                <button onClick={() => handleStatusToggle(task._id, task.status)}>
                                    Mark {task.status === "Completed" ? "Not Completed" : "Completed"}
                                </button>
                            )}
                            {(user?.role === "admin" || user?.role === "manager") && (
                                <>
                                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask({ title, description, assignedTo }));
        setTitle("");
        setDescription("");
        setAssignedTo("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Assign To (User ID)" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required />
            <button type="submit">Create Task</button>
        </form>
    );
};


export { TaskList, CreateTask }; 