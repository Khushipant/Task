const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks (For all roles)
router.get("/", protect, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a task (Only Admin & Manager)
router.post("/", protect, authorizeRoles("admin", "manager"), async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description, status: "Not Completed" });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update task (Only Admin & Manager)
router.put("/:id", protect, authorizeRoles("admin", "manager"), async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete task (Only Admin & Manager)
router.delete("/:id", protect, authorizeRoles("admin", "manager"), async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark task as completed/incomplete (Only Employee)
router.patch("/:id/status", protect, authorizeRoles("employee"), async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.status = task.status === "Completed" ? "Not Completed" : "Completed";
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
