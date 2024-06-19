"use client";
import { useState, useRef } from "react";

const FileUpload = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const onChange = () => {
    const fileInput = fileRef.current as unknown as HTMLInputElement;
    const filesAsArray = Array.from(fileInput.files!);
    setFiles(filesAsArray);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <form action="" className="text-sm w-fit flex justify-center">
        <label
          htmlFor="upload"
          className="flex justify-center items-center w-fit cursor-pointer bg-white p-5 rounded-lg text-purple-700 border border-purple-700 tracking-wider shadow-md transition duration-200 ease-in-out hover:filter hover:brightness-125 hover:-translate-y-1 focus:border-purple-900
    "
        >
          Upload audio
        </label>
        <input
          ref={fileRef}
          onChange={onChange}
          accept="audio/*"
          id="upload"
          type="file"
          className="flex justify-center text-center w-96 opacity-0 absolute -z-10"
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
              className={`w-full flex flex-col gap-1 items-center overflow-hidden whitespace-nowrap text-xl`}
            >
              <p className="font-medium text-white hidden md:block text-center">
                {file.name}
              </p>{" "}
              <p className="font-medium text-white md:hidden">{file.name}</p>{" "}
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

export default FileUpload;
