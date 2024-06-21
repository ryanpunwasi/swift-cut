"use server";

import { fileTypeFromBuffer } from "file-type";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createId } from "@paralleldrive/cuid2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function upload(formData: FormData) {
  const Bucket = process.env.AWS_BUCKET as string;
  const Key = createId();

  const file = formData.get("file") as File;
  const buffer = await file.arrayBuffer();
  const { mime } = (await fileTypeFromBuffer(buffer)) || {
    mime: undefined,
  };

  if (!mime) new Error("Invalid file type");

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key,
        Body: buffer as Buffer,
        ContentType: mime,
      })
    );
  } catch (error) {
    console.log(error);
  }
  setCookie("key", Key);
  redirect("/cut");
}

const setCookie = (key: string, value: string) => {
  cookies().set(key, value);
};
