import { TodoParams } from "../type/todoTypeApi";
import API from "./API";

const buildParams = ({ limit, cursor, startDate, endDate }: TodoParams) => {
  const query = [];
  limit && limit > 0 && query.push(`limit=${limit}`);
  cursor && cursor > 0 && query.push(`cursor=${cursor}`);
  startDate && query.push(`start=${startDate}`);
  endDate && query.push(`end=${endDate}`);
  return query.join("&");
};
const TodoApis = {
  getTodoList: (params?: TodoParams) => {
    const query = buildParams({ ...params });
    const URL = "/api/todo?" + query;
    return API.get(URL, { baseURL: "" });
  },
  getSummaryData: (params?: TodoParams) => {
    const query = buildParams({ ...params });
    const URL = "/api/todo/summary?" + query;
    return API.get(URL, { baseURL: "" });
  },
};

export default TodoApis;
