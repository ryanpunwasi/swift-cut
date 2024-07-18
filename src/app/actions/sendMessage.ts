"use server";

import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const s3Key = formData.get("s3Key") as string;
  const start = formData.get("start") as string;
  const end = formData.get("end") as string;
  let success = false;

  try {
    await fetch(process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL as string, {
      method: "POST",
      body: JSON.stringify({
        start,
        end,
        s3Key,
      }),
    });
    success = true;
  } catch (error) {
    console.error(error);
  }

  if (success) redirect("/file");
}
