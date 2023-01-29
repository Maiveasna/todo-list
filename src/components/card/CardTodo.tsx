import { Data } from "@/common/type/todoTypeApi";
import moment from "moment";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

export default function CardTodo({
  data,
  onEdit,
  onDelete,
}: {
  data?: Data;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}) {
  return (
    <div className="w-full bg-white px-6 py-4 flex justify-between rounded-lg select-none  border border-white hover:border-teal-500">
      <div className="flex flex-col">
        <span className=" text-gray-700">{data?.todo}</span>
        <span className=" text-xs text-gray-500 font-sans">
          {moment(data?.createdAt).format("dddd MMM YYYY h:mm a ")}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex items-center  space-x-4">
          {data?.isCompleted ? (
            <span className=" text-sm uppercase text-teal-500 font-sans pointer-events-none">
              Completed
            </span>
          ) : (
            <span className=" text-sm uppercase text-blue-500 font-sans pointer-events-none">
              Progess
            </span>
          )}
          <FiEdit3
            className=" text-yellow-500 hover:text-yellow-700 cursor-pointer"
            size={20}
            onClick={(e) => [
              e.stopPropagation(),
              onEdit && onEdit(data?.id as number),
            ]}
          />

          <AiFillDelete
            className=" text-red-500 hover:text-red-700 cursor-pointer"
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
