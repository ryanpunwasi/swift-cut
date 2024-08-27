import Link from "next/link";
import { FaHeadphonesAlt } from "react-icons/fa";
import { cookies } from "next/headers";
import DownloadLink from "./DownloadLink";
import { s3 } from "../lib/s3Client";
import {
  GetObjectAttributesCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"; // ES Modules import
import { formatBytes } from "../utils";
import { fileTypeFromBuffer } from "file-type";

const Download = async () => {
  const keyCookie = cookies().get("key");
  const Key = keyCookie?.value as string;
  const url = `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_URL}${Key}`;

  const command = new GetObjectAttributesCommand({
    Bucket: process.env.AWS_BUCKET,
    Key,
    ObjectAttributes: ["ObjectSize"],
  });
  const response = await s3.send(command);

  const objCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key,
  });
  const { Body } = await s3.send(objCommand);
  const fileType = Body
    ? await fileTypeFromBuffer(await Body.transformToByteArray())
    : null;

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-gray-900 text-gray-300 border-4 border-gray-800 gap-5 border-dashed rounded-lg flex flex-col justify-center items-center rounded-l w-96 h-56">
        <FaHeadphonesAlt
          className="dark:text-gray-500 text-gray-600 animate-bounce"
          size={50}
        />
        <div className="flex flex-col gap-2 items-center justify-center">
          <span className="font-normal">
            {fileType ? `audio.${fileType.ext}` : "Ready to download!"}
          </span>
          <div className="text-gray-400 flex flex-col justify-center items-center">
            <span className="font-light text-xs">
              {formatBytes(response.ObjectSize as number)}
            </span>
            {fileType && (
              <span className="font-light text-xs">{fileType.mime}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-fit mx-auto">
        <DownloadLink
          signedURL={url}
          name={fileType ? `audio.${fileType.ext}` : ""}
        />
        <hr className="h-px mt-6 mb-3 border-0 bg-gray-800 w-80 rounded" />
        <Link
          href="/"
          className="text-sky-400 hover:underline font-normal text-sm"
        >
          Trim another file
        </Link>
      </div>
    </div>
  );
};

export default Download;
