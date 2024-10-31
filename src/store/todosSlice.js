import { createSlice } from "@reduxjs/toolkit";

let nextId = 1;

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: nextId++, text: action.payload, completed: false });
    },
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
