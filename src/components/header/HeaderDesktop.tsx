import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderDesktop() {
  return (
    <div className="w-full shadow-sm  py-2 bg-white">
      <div className="max-w-6xl m-auto w-full flex justify-between items-center">
        <Link className="hover:text-teal-500" href="/">
          <div className="flex space-x-2 items-center">
            <Image
              height="35"
              width="35"
              src="/assets/icon-vpost24.png"
              alt="logo"
            />
            <span className="text-xl text-blue-700 font-bold">TODO</span>
          </div>
        </Link>
        <div className=" flex space-x-6 items-center">
          <Link className="hover:text-teal-500 text-gray-600" href="/">
            Todo
          </Link>
          <Link className="hover:text-teal-500 text-gray-600" href="/about">
            About Us
          </Link>
          <div className="flex space-x-1 items-center">
            <span className="text-xl text-teal-500">Hi</span>
            <Image
              height="35"
              width="35"
              src="/assets/hacker.png"
              alt="hacker"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
