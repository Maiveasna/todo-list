"use client";
import { Data } from "@/common/type/todoTypeApi";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import CardTodo from "../card/CardTodo";

type Props = {
  completed?: number;
  progress?: number;
  recent?: Data[];
};
export default function DaboardContainer({ props }: { props: Props }) {
  return (
    <div className="w-full h-full  m-auto max-w-4xl rounded-lg ">
      <div className="w-full flex bg-white px-6 py-3 justify-between items-center">
        <span className=" font-semibold uppercase">Dashboard</span>
        <button className=" border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg space-x-2 text-gray-600 hover:text-teal-500">
          <AiOutlinePlus size={16} />
          <span> New</span>
        </button>
      </div>
      <div className=" lg:grid-cols-2 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 grid gap-6 w-full mt-2">
        <div className=" rounded-lg p-6 bg-white space-x-4 items-center flex relative cursor-pointer hover:border hover:border-blue-700">
          <div className=" flex-none bg-blue-200 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center ">
            <GiProgression size={25} />
          </div>
          <div className="w-full flex flex-col">
            <div className=" flex justify-between items-center w-full">
              <h2 className=" text-2xl text-blue-700 uppercase">Progress</h2>
              <span className=" bg-blue-200 text-blue-700 h-8 w-8 flex items-center justify-center text-sm rounded-full">
                {props?.progress ?? 0}
              </span>
            </div>
            <span className="text-gray-400 text-sm">
              The todo list in status progress
            </span>
          </div>
        </div>
        <div className=" rounded-lg p-6 bg-white space-x-4 items-center flex relative cursor-pointer hover:border hover:border-teal-700">
          <div className=" flex-none bg-teal-200 text-teal-700 w-16 h-16 rounded-full flex items-center justify-center ">
            <IoMdCheckmarkCircleOutline size={30} />
          </div>
          <div className="w-full flex flex-col">
            <div className=" flex justify-between items-center w-full">
              <h2 className=" text-2xl text-teal-700 uppercase">Completed</h2>
              <span className=" bg-teal-200 text-teal-700 h-8 w-8 flex items-center justify-center text-sm rounded-full">
                {props?.completed ?? 0}
              </span>
            </div>
            <span className="text-gray-400 text-sm">
              The todo list in status completed
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex bg-white px-6 py-3 justify-between items-center mt-6">
        <span className=" font-semibold uppercase">
          Recent ({props?.recent?.length})
        </span>
        <button className=" border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg space-x-2 text-gray-600 hover:text-teal-500">
          <BsEyeFill size={16} />
          <span>View All</span>
        </button>
      </div>
      <div className=" flex flex-col w-full mt-2 space-y-2">
        {props?.recent &&
          props?.recent.map((rec: Data, index: number) => {
            return <CardTodo key={index} data={rec} />;
          })}
      </div>
    </div>
  );
}
