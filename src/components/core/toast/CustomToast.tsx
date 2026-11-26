"use client";

import { ToastContainer, toast } from "react-toastify";

const box = (color: string, message: string) => <div className={`rounded-lg px-4 py-2 text-sm text-white ${color}`}>{message}</div>;

const options = { closeButton: false, icon: false, className: "!bg-transparent !p-0 !shadow-none", hideProgressBar: true } as const;

/** The same messages as the dashboard: success and error (the text of an api error comes from getApiErrorMessage) */
const customToast = {
  success: (message: string) => toast(box("bg-green-600", message), options),
  error: (message: string) => toast(box("bg-red-600", message), options),
  info: (message: string) => toast(box("bg-blue-600", message), options),
};

export const Toasts = () => <ToastContainer position="top-right" autoClose={4000} newestOnTop />;

export default customToast;
