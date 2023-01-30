"use client";
import TodoApis from "@/common/api/TodoApi";
import useTodo from "@/common/hook/useTodo";
import { Data } from "@/common/type/todoTypeApi";
import httpUtils from "@/common/utils/httpUtils";
import CardTodo from "@/components/card/CardTodo";
import CreateTodo from "@/components/modal/CreateTodo";
import Selector from "@/components/select/select";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineMeh, AiOutlinePlus } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";
import { ToastContainer, ToastMessage } from "../toastMessage";
const filters = [
  { id: 0, title: "All", value: "all" },
  { id: 1, title: "Progress", value: "progress" },
  { id: 2, title: "Completed", value: "completed" },
];
export default function ListPage() {
  const [search, setSearch] = useState<string>();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [data, setData] = useState<Data[]>();
  const filter =
    searchParams?.get("filter") == "all" || !searchParams?.get("filter")
      ? "all"
      : searchParams?.get("filter") == "completed"
      ? "completed"
      : "progress";
  const {
    data: todo,
    isFetchingNextPage,
    loading,
    nextPage,
    fetchDataByNextPage,
  } = useTodo({
    limit: 10,
    search: search,
    filter: filter as string,
  });

  useEffect(() => {
    setData(todo);
  }, [JSON.stringify(todo)]);

  const handleFilter = (val: string) => {
    if (val === "progress") {
      router.push(`/list?filter=progress`);
    } else if (val == "completed") {
      router.push(`/list?filter=completed`);
    } else {
      router.push(`/list?filter=all`);
    }
  };

  const handleSearchFun = _.debounce((e: any) => {
    e.preventDefault();
    if (e) {
      setSearch(e.target.value);
    }
  }, 700);

  const handleDelete = async (id: number) => {
    await TodoApis.deleteTodo(id)
      .then((res) => {
        const nData = data?.filter((todo) => todo.id !== id);
        setData(nData);
        ToastMessage({ title: res?.data.message, status: "success" });
      })
      .catch((error) => {
        httpUtils.parseError(error).then((err) => {
          ToastMessage({ title: err.errors[0], status: "error" });
        });
      });
  };

  const handleSucess = (dataSub) => {
    const newData = [dataSub, ...data];
    setData(newData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full h-full  m-auto max-w-4xl rounded-lg ">
      <ToastContainer />
      <div className="w-full flex bg-white px-6 py-3 justify-between items-center">
        <span className=" font-semibold uppercase">List</span>
        <div className=" flex space-x-4">
          <div className=" border border-teal-500 items-center justify-center flex pr-4 pl-2 py-2 text-sm rounded-lg space-x-2 ">
            <input
              onChange={handleSearchFun}
              className=" px-3 focus:outline-none text-gray-600 hover:text-teal-500 w-32"
              placeholder="search / filter"
            />
            <RiSearchLine size={16} className=" pointer-events-none" />
          </div>
          <Selector
            onChange={handleFilter}
            defaultValue={filter}
            data={filters}
          />
          <button className=" border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg space-x-2 text-gray-600 hover:text-teal-500">
            <AiOutlinePlus size={16} />
          </button>
        </div>
      </div>
      <div className=" flex flex-col w-full mt-2 space-y-2">
        {data &&
          data.map((rec: Data, index: number) => {
            return (
              <CardTodo onDelete={handleDelete} key={rec?.id} data={rec} />
            );
          })}
        {(loading || isFetchingNextPage) &&
          new Array(5).fill(0).map((_, index) => {
            return (
              <div
                key={index}
                className=" bg-gray-200 h-14 animate-pulse rounded-lg"
              />
            );
          })}
        {!loading && !isFetchingNextPage && nextPage && (
          <button
            className="py-5 bg-teal-500 rounded-lg text-white cursor-pointer hover:text-gray-100 transform ease-in-out duration-500"
            onClick={() =>
              fetchDataByNextPage(nextPage as string, search, filter)
            }
          >
            Load More
          </button>
        )}

        {!loading && !isFetchingNextPage && data?.length === 0 && (
          <div className=" space-x-2 items-center flex justify-center my-24">
            <AiOutlineMeh size={20} className="text-red-500" />
            <span className="text-gray-500">No Result</span>
          </div>
        )}
      </div>
      {open && <CreateTodo onClose={handleClose} onSuccess={handleSucess} />}
    </div>
  );
}
