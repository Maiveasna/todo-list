import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col">
      <Image
        className=" rounded-full"
        height="100"
        width="100"
        alt="me"
        src="/assets/profile.jpg"
      />
      <span className="text-lg font-semibold">I'm Mai Veasna</span>
      <p className="text-sm text-gray-500">Frontend developer at Nham24.</p>
    </div>
  );
}
