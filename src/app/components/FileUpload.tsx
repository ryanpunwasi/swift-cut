"use client";
import { useState, useRef } from "react";
import { upload } from "@/app/actions/upload";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import LoadingIcon from "./LoadingIcon";

const FileUpload = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onChange = async () => {
    const fileInput = fileRef.current as unknown as HTMLInputElement;
    const filesAsArray = Array.from(fileInput.files!);
    setFiles(filesAsArray);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
  };

  const resetForm = () => {
    setFiles([]);
    setLoading(false);
    formRef.current?.reset();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      {loading && <LoadingScreen />}
      <form
        onSubmit={onSubmit}
        action={upload}
        className="text-sm w-fit flex flex-col justify-center gap-7"
        ref={formRef}
      >
        <label
          htmlFor="file"
          className="text-gray-200 flex gap-2 flex-col justify-center items-center w-60 h-48 cursor-pointer opacity-95 p-5 rounded-xl border border-gray-700 tracking-wider shadow-md transition duration-200 ease-in-out hover:filter hover:brightness-125 hover:border-gray-600 backdrop-blur-xl bg-white/1"
        >
          <MdOutlineFileUpload size={50} />
          <p className="text-xs">Browse</p>
        </label>
        <input
          disabled={loading}
          formEncType="multipart/form-data"
          ref={fileRef}
          name="file"
          id="file"
          onChange={onChange}
          accept="audio/*"
          type="file"
          className="flex justify-center text-center w-96 opacity-0 absolute -z-10"
        />
        <input
          type="submit"
          disabled={files.length === 0 || loading}
          value={"Upload"}
          className="w-fit bg-violet-700 rounded-lg mx-auto py-2 px-5 filter hover:brightness-125 transition duration-200 ease-in-out text-white text-sm font-light tracking-wider shadow-md cursor-pointer active:brightness-95 disabled:cursor-not-allowed disabled:select-none disabled:hover:brightness-75 disabled:brightness-75"
        />
      </form>
      <ul
        className={`${
          files.length > 0 ? "visible" : "invisible"
        } h-24 w-full flex flex-col items-center justify-center gap-2 flex-1`}
      >
        {files.length > 0 &&
          files.map(file => (
            <li
              key={file.name}
              className={`w-full flex gap-3 items-center justify-center overflow-hidden whitespace-nowrap text-xl`}
            >
              <p className="font-medium text-white hidden md:block text-center">
                {file.name}
              </p>{" "}
              <p className="font-medium text-white md:hidden">{file.name}</p>{" "}
              <button
                onClick={resetForm}
                className="text-gray-400 transition hover:scale-125 ease-in-out duration-150"
              >
                <IoMdClose />
              </button>
            </li>
          ))}
        {files.length === 0 && (
          <li
            key={"empty"}
            className={`w-full flex flex-col gap-1 items-center overflow-hidden whitespace-nowrap text-xl`}
          >
            <p className="font-medium text-white hidden md:block text-center">
              {"No files selected"}
            </p>{" "}
            <p className="font-medium text-white md:hidden">
              No files selected
            </p>{" "}
          </li>
        )}
      </ul>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="absolute top-0 h-full w-full bg-black opacity-90 z-30 flex justify-center items-center gap-3">
      <LoadingIcon text="Uploading..."></LoadingIcon>
    </div>
  );
};

export default FileUpload;
