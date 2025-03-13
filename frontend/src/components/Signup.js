import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/authActions"; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/tasks"); 
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(name, email, password));
    };

    return (
        <div>
            <h2>Signup</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
            </form>
        </div>
    );
};

export default Signup;
