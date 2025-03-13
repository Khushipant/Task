import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token || user) {
            navigate("/tasks"); 
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            </form>
        </div>
    );
};

export default Login;
