export class Todo {
  id!: string;
  title!: string;
  content!: string;
  creationTime!: number;
  dueDate!: number;
  status!: string;
  type!: string;
}

export type getArg = {
  page: number;
  rowsPerPage: number;
  sortByStatus: string;
  sortByDate: string;
  filterByType: string;
};

export type menuItems = {
  value: string;
  label: string;
};
