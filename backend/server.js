const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build React frontend", completed: false },
];
let nextId = 3;

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// GET single task by id
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// POST create a new task
app.post("/api/tasks", (req, res) => {
  const title = req.body.title?.trim();

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: nextId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update a task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (req.body.title !== undefined) {
    const title = req.body.title.trim();
    if (!title) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    task.title = title;
  }

  if (req.body.completed !== undefined) {
    task.completed = Boolean(req.body.completed);
  }

  res.json(task);
});

// DELETE a task
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
