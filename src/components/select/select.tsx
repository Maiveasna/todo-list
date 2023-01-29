"use client";
import React from "react";
type OptionType = { id?: number; title?: string; value?: string };
type Props = {
  onChange?: (id: string) => void;
  data?: OptionType[];
  defaultValue?: string;
};

const Selector = ({ data, onChange, defaultValue }: Props) => {
  return (
    <div className="relative w-full border border-teal-500 items-center justify-center flex px-4 py-2 text-sm rounded-lg">
      <select
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultValue={defaultValue}
        className="   text-gray-600 hover:text-teal-500  focus:outline-none pr-2"
      >
        {data?.map((option, index) => {
          return (
            <option value={option?.value} key={index}>
              {option?.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
