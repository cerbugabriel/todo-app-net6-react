import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getArg, Todo } from "../../models/TodoModels";
import { getToDos, saveToDo } from "./todoAPI";

export interface ToDoState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
  todosStatusSort: "Active" | "Done";
  todosDueDateSort: "Asc" | "Desc";
  todosTypeFilter: "All" | "Results" | "Wins" | "Withdraw";
  pageNumber: number;
  rowsPerPage: number;
  todoCount: number;
}

const initialState: ToDoState = {
  todos: [],
  todoCount: 0,
  status: "idle",
  todosStatusSort: "Active",
  todosDueDateSort: "Asc",
  todosTypeFilter: "All",
  pageNumber: 0,
  rowsPerPage: 10,
};

export const getToDosAsync = createAsyncThunk(
  "todo/getToDos",
  async (arg: getArg) => {
    return getToDos(arg);
  }
);

export const saveToDoAsync = createAsyncThunk(
  "todo/putToDo",
  async (id: string) => {
    return saveToDo(id);
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoStatusFilter: (state, action) => {
      return {
        ...state,
        todosStatusSort: action.payload,
      };
    },
    sortTodos: (state, action) => {
      return {
        ...state,
        todosDueDateSort: action.payload,
      };
    },
    setTodoTypeFilter: (state, action) => {
      return {
        ...state,
        todosTypeFilter: action.payload,
      };
    },
    setPage: (state, action) => {
      return {
        ...state,
        pageNumber: action.payload,
      };
    },
    setRowsPerPage: (state, action) => {
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToDosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getToDosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload.todos;
        state.todoCount = action.payload.todosCount;
      })
      .addCase(getToDosAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(saveToDoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveToDoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = state.todos.map((todo) =>
          todo.id === action.meta.arg ? { ...todo, status: "Done" } : todo
        );
      })
      .addCase(saveToDoAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const selectToDos = (state: RootState) => state.todos;

export const selectTodoItems = (state: RootState) => {
  if (selectToDos(state)?.todos) {
    const items = [...selectToDos(state).todos];
    return items;
  } else return [];
};

export const {
  setTodoStatusFilter,
  sortTodos,
  setTodoTypeFilter,
  setPage,
  setRowsPerPage,
} = todoSlice.actions;

export default todoSlice.reducer;
