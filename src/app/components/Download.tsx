import { FaHeadphonesAlt } from "react-icons/fa";
import { cookies } from "next/headers";
import DownloadLink from "./DownloadLink";
import { s3 } from "../lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Download = async () => {
  const keyCookie = cookies().get("key");
  const Key = keyCookie?.value as string;
  const command = new GetObjectCommand({ Key, Bucket: process.env.AWS_BUCKET });
  const url = await getSignedUrl(s3, command, { expiresIn: 300 });

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-gray-900 text-gray-400 border-4 border-gray-800 gap-5 border-dashed rounded-lg flex flex-col justify-center items-center rounded-l w-96 h-48">
        <FaHeadphonesAlt className="text-gray-700" size={50} />
        <div className="flex flex-col items-center justify-center">
          <span className="font-normal">File name.mp3</span>
          <span className="uppercase font-light text-xs">mp3</span>
        </div>
      </div>
      <DownloadLink signedURL={url} />
    </div>
  );
};

export default Download;
