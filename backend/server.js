require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

console.log("Registering task routes..."); // Debugging
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);
console.log("Task routes registered!");


// Routes
// const taskRoutes = require("./routes/taskRoutes");
// app.use("/api/tasks", taskRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
    res.send("Task Management API is running...");
});

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // 
    })
    .catch(err => console.log(err));
