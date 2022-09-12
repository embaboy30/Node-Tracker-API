const express = require("express");
const Todo = require("../models/todo");
const router = express.Router();

//get all
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one
router.get("/:id", getTodo, (req, res) => {
  res.json(res.todo);
});

//add one
router.post("/", async (req, res) => {
  const data = req.body;
  const todo = new Todo({
    title: data.title,
    description: data.description,
    goalDate: data.goalDate,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update one
router.patch("/:id", getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }
    if (req.body.description != null) {
        res.todo.description = req.body.description;
    }
    if (req.body.goalDate != null) {
        res.todo.goalDate = req.body.goalDate;
    }
    try {
        const updateTodo = await res.todo.save();
        res.json(updateTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete one
router.delete("/:id", getTodo, async (req, res) => {
  try {
    res.todo.remove();
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "Cannot find data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}

module.exports = router;
