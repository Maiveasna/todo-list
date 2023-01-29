import _ from "lodash";
import { TodoParams } from "../type/todoTypeApi";
import API from "./API";

const buildParams = ({
  limit,
  cursor,
  startDate,
  endDate,
  search,
  filter = "all",
}: TodoParams) => {
  const query = [];
  limit && limit > 0 && query.push(`limit=${limit}`);
  cursor && cursor > 0 && query.push(`cursor=${cursor}`);
  startDate && query.push(`start=${startDate}`);
  endDate && query.push(`end=${endDate}`);
  !!search && query.push(`search=${search}`);
  filter == "all"
    ? query.push(`filter=${filter}`)
    : query.push(`filter=${filter}`);
  return query.join("&");
};
const TodoApis = {
  getTodoList: (params?: TodoParams) => {
    const query = buildParams({ ...params });
    const URL = "/api/todo?" + query;
    return API.get(URL, { baseURL: "" });
  },
  getTodoListByNextPage: (next: string, params?: TodoParams) => {
    const query = buildParams({ ...params });
    const url = !_.isEmpty(query) ? `${next}&${query}` : next;
    return API.get(url, { baseURL: "" });
  },
  getSummaryData: (params?: TodoParams) => {
    const query = buildParams({ ...params });
    const URL = "/api/todo/summary?" + query;
    return API.get(URL, { baseURL: "" });
  },
  deleteTodo: async (id?: number) => {
    const URL = `/api/todo/${id}`;
    return API.delete(URL, { baseURL: "" });
  },
  createTodo: async ({
    todo,
    isCompleted,
  }: {
    todo?: string;
    isCompleted?: boolean;
  }) => {
    const URL = `/api/todo`;
    return API.post(
      URL,
      { todo: todo, isCompleted: isCompleted },
      { baseURL: "" }
    );
  },
};

export default TodoApis;
