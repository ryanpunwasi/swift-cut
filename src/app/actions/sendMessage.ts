"use server";

import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const s3Key = formData.get("s3Key") as string;
  const start = formData.get("start")?.toString();
  const stop = formData.get("end")?.toString();
  let success = false;

  if (start === undefined || stop === undefined || !s3Key) {
    console.error("Missing required fields");
    return;
  }

  try {
    await fetch(process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL as string, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: parseFloat(start),
        stop: parseFloat(stop),
        s3Key,
      }),
    });
    success = true;
  } catch (error) {
    console.error(error);
  }

  if (success) redirect("/file");
}
