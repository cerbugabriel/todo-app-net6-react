import { ChangeEvent, useEffect } from "react";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import "./App.css";
import { TodoCard } from "./features/todo/TodoCard";
import {
  getToDosAsync,
  selectToDos,
  setTodoStatusFilter,
  sortTodos,
  selectTodoItems,
  setPage,
  setRowsPerPage,
  saveToDoAsync,
  setTodoTypeFilter,
} from "./features/todo/todoStore";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  LinearProgress,
  SelectChangeEvent,
  TablePagination,
} from "@mui/material";
import { TodoFilter } from "./features/todo/ToDoFilterComponent";

export default function App() {
  const todosState = useAppSelector(selectToDos);
  const todos = useAppSelector(selectTodoItems);
  const dispatch = useAppDispatch();

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  useEffect(() => {
    dispatch(
      getToDosAsync({
        page: todosState.pageNumber,
        rowsPerPage: todosState.rowsPerPage,
        sortByStatus: todosState.todosStatusSort,
        sortByDate: todosState.todosDueDateSort,
        filterByType: todosState.todosTypeFilter,
      })
    );
  }, [
    dispatch,
    todosState.pageNumber,
    todosState.rowsPerPage,
    todosState.todosDueDateSort,
    todosState.todosStatusSort,
    todosState.todosTypeFilter,
  ]);

  return todos.length > 0 ? (
    <div style={{ margin: "5px" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <TodoFilter
          title={"Sort by status:"}
          id={"todoStatusSort"}
          value={todosState.todosStatusSort}
          label={"Sort"}
          handleChange={(event:SelectChangeEvent)  => dispatch(setTodoStatusFilter(event.target.value as string))}
          menuItems={[
            { label: "Active", value: "Active" },
            { label: "Done", value: "Done" },
          ]}
        />
        <TodoFilter
          title={"Sort by date:"}
          id={"todoDateSort"}
          value={todosState.todosDueDateSort}
          label={"Sort"}
          handleChange={(event:SelectChangeEvent) => dispatch(sortTodos(event.target.value as string))}
          menuItems={[
            { label: "Asc", value: "Asc" },
            { label: "Desc", value: "Desc" },
          ]}
        />
        <TodoFilter
          title={"Filter by type:"}
          id={"todoTypeFilter"}
          value={todosState.todosTypeFilter}
          label={"Filter"}
          handleChange={(event: SelectChangeEvent)=> dispatch(setTodoTypeFilter(event.target.value as string))}
          menuItems={[
            { label: "All", value: "All" },
            { label: "Results", value: "Results" },
            { label: "Wins", value: "Wins" },
            { label: "Withdraw", value: "Withdraw" },
          ]}
        />
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          bgcolor: "background.paper",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 1,
          fontWeight: "bold",
          borderStyle: "solid",
          borderColor: "primary.main",
          margin: "5px",
          padding: "5px",
        }}
      >
        <Grid container spacing={4}>
          {todos &&
            todos.map((todo, key) => (
              <Grid item lg={3} md={4} xs={6} key={key}>
                <TodoCard todo={todo} onClick={(_event: any) => dispatch(saveToDoAsync(todo.id))} />
              </Grid>
            ))}
        </Grid>
      </Box>
      <TablePagination
        component="div"
        count={todosState.todoCount}
        page={todosState.pageNumber}
        onPageChange={(_event, newPage) => dispatch(setPage(newPage))}
        rowsPerPage={todosState.rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  ) : (
    <LinearProgress />
  );
}
