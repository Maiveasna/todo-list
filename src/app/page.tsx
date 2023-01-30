"use client";
import TodoApis from "@/common/api/TodoApi";
import { Data } from "@/common/type/todoTypeApi";
import DaboardContainer from "@/components/dashboard/DaboardContainer";
import moment from "moment";
import { useEffect, useState } from "react";

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
  const [refreshCount, setRefreshCount] = useState<number>(0);
  useEffect(() => {
    fetchDataSummay().then((res) => {
      setSmaryData(res);
    });
  }, [refreshCount]);

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };
  return (
    <div className="w-full h-full">
      <DaboardContainer
        props={{ ...sumaryData, onRefresh: () => handleRefresh() }}
      />
    </div>
  );
}
