import React, { useEffect, useState } from "react";
import TodoApis from "../api/TodoApi";
import { Data } from "../type/todoTypeApi";

export default function useTodo({
  limit = 20,
  search,
  filter,
}: {
  limit?: number;
  search?: string;
  filter?: string;
}) {
  const [data, setData] = useState<Data[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string>();

  useEffect(() => {
    fetchData();
  }, [search, filter]);

  const resetData = () => {
    setData([]);
    setNextPage("");
    setLoading(false);
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await TodoApis.getTodoList({
        limit: limit,
        search,
        filter: filter == "all" ? "all" : filter === "progress" ? false : true,
      });
      if (res) {
        setLoading(false);
        setData(res?.data?.data);
        const { link } = res?.data;
        setNextPage(link?.next);
      }
    } catch (error) {
      resetData();
    }
  };

  const fetchDataByNextPage = async (
    next: string,
    search?: string,
    filter?: boolean | string
  ) => {
    setIsFetchingNextPage(true);
    try {
      const res = await TodoApis.getTodoListByNextPage(next, {
        search: search,
        filter: filter,
      });
      if (res) {
        setIsFetchingNextPage(false);
        setData([...data, ...res?.data?.data]);
        const { link } = res?.data;
        setNextPage(link?.next);
      }
    } catch (error) {
      resetData();
    }
  };

  return {
    data,
    loading,
    nextPage,
    isFetchingNextPage,
    fetchDataByNextPage,
  };
}
