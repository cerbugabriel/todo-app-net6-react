import { getArg } from "../../models/TodoModels";

const todoApi = "http://localhost:5001/api/todos";

export async function getToDos(arg: getArg) {
  const response = await fetch(
    todoApi +
      `?page=${encodeURIComponent(arg.page)}&rowsPerPage=${encodeURIComponent(
        arg.rowsPerPage
      )}&sortByStatus=${encodeURIComponent(
        arg.sortByStatus
      )}&sortByDate=${encodeURIComponent(
        arg.sortByDate
      )}&filterByType=${encodeURIComponent(arg.filterByType)}`
  );
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body.result;
}

export const saveToDo = async (id: string) => {
  const encodedId = encodeURIComponent(id);
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(todoApi + `/${encodedId}`, requestOptions);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body.result;
};
