import { Data } from "@/common/type/todoTypeApi";
import moment from "moment";
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import Toggle from "../toggle";
import TodoApis from "@/common/api/TodoApi";
import httpUtils from "@/common/utils/httpUtils";
import { ToastMessage } from "@/app/toastMessage";

export default function CardTodo({
  data,
  onEdit,
  onDelete,
  onToggle,
  loading,
}: {
  data?: Data;
  onEdit?: (data: Data) => void;
  onDelete?: (id: number) => void;
  onToggle?: (data?: Data) => void;
  loading?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleChek = async () => {
    setIsLoading(true);
    await TodoApis.editTodo({
      ...data,
      id: data?.id as number,
      isCompleted: !data?.isCompleted,
    })
      .then((res) => {
        const resData = res?.data;
        setIsLoading(false);
        onToggle && onToggle(resData);
      })
      .catch((error) => {
        httpUtils.parseError(error).then((err) => {
          ToastMessage({ title: err?.errors[0], status: "error" });
          setIsLoading(false);
        });
      });
  };

  return (
    <div
      className={`w-full bg-white px-6 py-4 flex relative group justify-between rounded-lg select-none  border border-white hover:border-teal-500 ${
        (loading || isLoading) && "pointer-events-none"
      }`}
    >
      {(loading || isLoading) && (
        <div className=" h-full w-full bg-black bg-opacity-5 absolute inset-0 z-30 flex rounded-lg flex-col items-center justify-center"></div>
      )}
      <div className="flex flex-col">
        <span className=" text-gray-700">{data?.todo}</span>
        <span className=" text-xs text-gray-500 font-sans">
          {moment(data?.createdAt).format("dddd MMM YYYY h:mm a ")}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex items-center  space-x-4">
          {data?.isCompleted ? (
            <span className=" text-sm text-teal-500 font-sans pointer-events-none">
              Completed
            </span>
          ) : (
            <span className=" text-sm text-blue-500 font-sans pointer-events-none">
              Progess
            </span>
          )}

          <div key={data?.id} className=" group-hover:block hidden">
            <Toggle
              loading={loading || isLoading}
              onChange={handleChek}
              defaultValue={data?.isCompleted}
              id={data?.id + "_new" + data?.todo}
              title={
                !data?.isCompleted ? (
                  <span className="text-sm">Mark as complete</span>
                ) : (
                  <span className="text-sm">Mark as Incomplete</span>
                )
              }
            />
          </div>
          <FiEdit3
            className=" text-yellow-500 group-hover:block hidden hover:text-yellow-700 cursor-pointer"
            size={20}
            onClick={(e) => [e.stopPropagation(), onEdit && onEdit(data)]}
          />

          <AiFillDelete
            className=" text-red-500 group-hover:block hidden hover:text-red-700 cursor-pointer"
            size={22}
            onClick={(e) => {
              e.stopPropagation(), onDelete && onDelete(data?.id as number);
            }}
          />
        </div>
      </div>
    </div>
  );
}
