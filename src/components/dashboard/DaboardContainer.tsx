"use client";
import { ToastContainer, ToastMessage } from "@/app/toastMessage";
import TodoApis from "@/common/api/TodoApi";
import { Data } from "@/common/type/todoTypeApi";
import httpUtils from "@/common/utils/httpUtils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineMeh, AiOutlinePlus } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CardTodo from "../card/CardTodo";
import CreateTodo from "../modal/CreateTodo";
import EditTodo from "../modal/EditTodo";
type Props = {
  completed?: number;
  progress?: number;
  recent?: Data[];
  onRefresh?: () => void;
};
export default function DaboardContainer({ props }: { props: Props }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [editData, setDataEdit] = useState<Data>();
  const { onRefresh } = props;

  useEffect(() => {
    setData(props?.recent);
  }, [JSON.stringify(props?.recent)]);
  const handleDelete = async (id: number) => {
    setLoading(true);
    await TodoApis.deleteTodo(id)
      .then((res) => {
        const nData = data?.filter((todo) => todo.id !== id);
        setData(nData);
        ToastMessage({ title: res?.data.message, status: "success" });
        onRefresh();
        setLoading(false);
      })
      .catch((error) => {
        httpUtils.parseError(error).then((err) => {
          ToastMessage({ title: err.errors[0], status: "error" });
          setLoading(false);
        });
      });
  };

  useEffect(() => {
    if (props?.progress && props?.completed) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [JSON.stringify(props)]);

  const handleSucess = (dataSub) => {
    const newData = [dataSub, ...data];
    setData(newData);
  };

  const handleeditSucess = (dataSub) => {
    const newData = [...data];
    const index = newData.findIndex((todo) => todo?.id == dataSub?.id);
    newData[index] = { ...dataSub };
    setData(newData);
    setDataEdit(null);
    setOpenEdit(false);
  };

  const handleEdit = (data?: Data) => {
    setDataEdit(data);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  return (
    <div className="w-full h-full  m-auto max-w-4xl rounded-lg ">
      <ToastContainer />
      <div className="w-full flex bg-white px-6 py-3 justify-between items-center">
        <span className=" font-semibold uppercase">Dashboard</span>
        <div className=" flex space-x-4 ">
          <button
            onClick={onRefresh}
            className=" border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg space-x-2 text-gray-600 hover:text-teal-500"
          >
            <FiRefreshCcw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      <div className=" lg:grid-cols-2 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 grid gap-6 w-full mt-2">
        <Link href="/list?filter=progress">
          <div className=" rounded-lg p-6 bg-white space-x-4 items-center flex relative cursor-pointer hover:border hover:border-blue-700">
            <div className=" flex-none bg-blue-200 text-blue-700 text-2xl font-semibold w-16 h-16 rounded-lg flex items-center justify-center ">
              {props?.progress ?? 0}
            </div>
            <div className="w-full flex flex-col">
              <div className=" flex justify-between items-center w-full">
                <div className=" flex items-center space-x-2">
                  <GiProgression className="text-blue-700" size={20} />
                  <h2 className=" text-2xl text-blue-700 uppercase">
                    Progress
                  </h2>
                </div>
              </div>
              <span className="text-gray-400 text-sm">
                The todo list in status progress
              </span>
              <span className="text-blue-500 text-sm uppercase"> Today</span>
            </div>
          </div>
        </Link>
        <Link href="/list?filter=completed">
          <div className=" rounded-lg p-6 bg-white space-x-4 items-center flex relative cursor-pointer hover:border hover:border-teal-700">
            <div className=" flex-none bg-teal-200 text-teal-700 w-16 h-16 text-2xl font-semibold rounded-lg flex items-center justify-center ">
              {props?.completed ?? 0}
            </div>
            <div className="w-full flex flex-col">
              <div className=" flex justify-between items-center w-full">
                <div className=" flex items-center space-x-2">
                  <IoMdCheckmarkCircleOutline
                    className="text-teal-700"
                    size={22}
                  />
                  <h2 className=" text-2xl text-teal-700 uppercase">
                    Completed
                  </h2>
                </div>
              </div>
              <span className="text-gray-400 text-sm">
                The todo list in status completed
              </span>
              <span className="text-teal-700 text-sm uppercase"> Today</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="w-full flex bg-white px-6 py-3 justify-between items-center mt-6">
        <span className=" font-semibold uppercase">
          Recently {data?.length > 0 && `(${props?.recent?.length})`}
        </span>
        <div className=" flex space-x-4">
          <button
            onClick={() => setOpen(true)}
            className=" border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg space-x-2 text-gray-600 hover:text-teal-500"
          >
            <AiOutlinePlus size={16} />
            <span> New</span>
          </button>
          <Link href="/list">
            <div className=" border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg space-x-2 text-gray-600 hover:text-teal-500">
              <BsEyeFill size={16} />
              <span>View All</span>
            </div>
          </Link>
        </div>
      </div>
      <div className=" flex flex-col w-full mt-2 space-y-2">
        {data &&
          data.map((rec: Data, index: number) => {
            return (
              <CardTodo
                loading={loading}
                onToggle={handleeditSucess}
                onEdit={handleEdit}
                onDelete={handleDelete}
                key={rec?.id + "_" + index}
                data={rec}
              />
            );
          })}
        {loading &&
          new Array(5).fill(0).map((_, index) => {
            return (
              <div
                key={index}
                className=" bg-gray-200 h-14 animate-pulse rounded-lg"
              />
            );
          })}
        {!loading && data?.length === 0 && (
          <div className=" space-x-2 items-center flex justify-center my-24">
            <AiOutlineMeh size={20} className="text-red-500" />
            <span className="text-gray-500">No Result</span>
          </div>
        )}
        {open && <CreateTodo onClose={handleClose} onSuccess={handleSucess} />}
        {openEdit && (
          <EditTodo
            onClose={handleClose}
            dataEdit={editData}
            onSuccess={handleeditSucess}
          />
        )}
      </div>
    </div>
  );
}
