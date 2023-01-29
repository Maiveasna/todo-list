import React from "react";

export default function loading() {
  return new Array(5).fill(0).map((_, index) => {
    return (
      <div
        key={index}
        className=" bg-gray-200 h-20 w-full animate-pulse rounded-lg mt-4"
      />
    );
  });
}
