"use client";
import TodoApis from "@/common/api/TodoApi";
import { Data } from "@/common/type/todoTypeApi";
import DaboardContainer from "@/components/dashboard/DaboardContainer";
import moment from "moment";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const todosList = (await TodoApis.getTodoList({ limit: 2 })).data;
  return todosList;
};

const fetchDataSummay = async () => {
  const todosList = (
    await TodoApis.getSummaryData({
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
    })
  ).data;
  return todosList;
};

export default function Home() {
  const [sumaryData, setSmaryData] = useState<{
    completed?: number;
    progress?: number;
    recent?: Data[];
  }>();
  useEffect(() => {
    fetchDataSummay().then((res) => {
      setSmaryData(res);
    });
  }, []);
  return (
    <div className="w-full h-full">
      <DaboardContainer props={{ ...sumaryData }} />
    </div>
  );
}
