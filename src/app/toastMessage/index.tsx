"use client";
import { toast, ToastContainer, Zoom } from "react-toastify";
const ToastMessage = ({
  title,
  status,
}: {
  title?: string;
  status: "error" | "success";
}) => {
  //  toast message
  if (status == "success") {
    toast.success(title, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "text-xs",
      transition: Zoom,
    });
  } else if (status == "error") {
    return toast.error(title, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "text-xs",
      transition: Zoom,
    });
  }
};
export { ToastMessage, ToastContainer };
