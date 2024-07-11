"use client";
import { useState, useEffect } from "react";

const DownloadLink = ({
  signedURL,
  name,
}: {
  signedURL: string;
  name: string;
}) => {
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    fetch(signedURL)
      .then(response => {
        response.blob().then(blob => {
          setBlob(blob);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, [signedURL]);

  const downloadBlob = (name = `audio.mp3`) => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob || new Blob());
    // Create a link element
    const link = document.createElement("a");
    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;
    // Append link to the body
    document.body.appendChild(link);
    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  };

  return (
    <>
      {blob && (
        <button
          onClick={() => (name ? downloadBlob(name) : downloadBlob())}
          className="flex items-center justify-center gap-2 w-fit bg-violet-700 rounded-lg mx-auto py-2 px-5 filter hover:brightness-125 transition duration-200 ease-in-out text-white text-sm font-light tracking-wider shadow-md cursor-pointer active:brightness-95 disabled:cursor-not-allowed disabled:select-none disabled:hover:brightness-75 disabled:brightness-75"
        >
          Download
        </button>
      )}
      {!blob && (
        <button
          disabled={true}
          className="flex items-center justify-center gap-2 w-fit bg-violet-700 rounded-lg mx-auto py-2 px-5 filter hover:brightness-125 transition duration-200 ease-in-out text-white text-sm font-light tracking-wider shadow-md cursor-pointer active:brightness-95 disabled:cursor-not-allowed disabled:select-none disabled:hover:brightness-75 disabled:brightness-75"
        >
          Fetching file...
        </button>
      )}
    </>
  );
};
export default DownloadLink;
