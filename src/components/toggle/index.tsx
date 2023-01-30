import React, { ReactNode } from "react";
type Props = {
  defaultValue?: boolean;
  onChange?: (value) => void;
  title: string | ReactNode;
  id?: string;
  loading?: boolean;
};
export default function Toggle({
  defaultValue,
  onChange,
  title,
  id,
  loading,
}: Props) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center  ${
        loading ? " pointer-events-none text-gray-400" : "cursor-pointer"
      }`}
    >
      <div className="relative">
        <input
          checked={defaultValue}
          onChange={(e) => onChange && onChange(e.target.checked)}
          id={id}
          type="checkbox"
          className="sr-only"
        />
        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
        <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
      </div>
      <div className="ml-3 text-gray-700 font-medium"> {title}</div>
    </label>
  );
}
