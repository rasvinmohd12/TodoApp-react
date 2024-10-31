import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./store/todosSlice";
import { motion, AnimatePresence } from "framer-motion";

const TodoApp = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const completedTasks = todos.filter((todo) => todo.completed).length;

  const handleAddTodo = () => {
    if (todoText.trim() === "") {
      alert("Please enter a todo item!");
      return;
    }
    dispatch(addTodo(todoText));
    setTodoText("");
  };

  return (
    <div className="container">
      <h1>TODO APP</h1>

      <div className="input-container">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <span onClick={() => dispatch(toggleComplete(todo.id))}>
                {todo.text}
              </span>
              <button
                className="delete-button"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                ✖
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="footer">
        <span>{`Completed: ${completedTasks} / ${todos.length} tasks`}</span>
      </div>
    </div>
  );
};

export default TodoApp;
