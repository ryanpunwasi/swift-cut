"use client";
import { useState, useRef } from "react";
import { upload } from "@/app/actions/upload";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

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
      {loading && <Loading />}
      <form
        onSubmit={onSubmit}
        action={upload}
        className="text-sm w-fit flex flex-col justify-center gap-10"
        ref={formRef}
      >
        <label
          htmlFor="file"
          className="text-gray-300 flex gap-2 flex-col justify-center items-center w-60 h-48 cursor-pointer bg-gray-800 opacity-95 p-5 rounded-xl border border-gray-600 tracking-wider shadow-md transition duration-200 ease-in-out hover:filter hover:brightness-125 
    "
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
          className="w-fit bg-violet-700 rounded-lg mx-auto py-3 px-5 filter hover:brightness-125 transition duration-200 ease-in-out text-white font-medium tracking-wider shadow-md cursor-pointer active:brightness-95 disabled:cursor-not-allowed disabled:select-none disabled:hover:brightness-75 disabled:brightness-75"
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
                className="text-gray-300 transition hover:scale-125 ease-in-out duration-150"
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

const Loading = () => {
  return (
    <div className="absolute top-0 h-full w-full bg-black opacity-90 z-30 flex justify-center items-center text-base gap-3">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 animate-spin text-gray-600 fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Uploading...</span>
      </div>
      Uploading...
    </div>
  );
};

export default FileUpload;
