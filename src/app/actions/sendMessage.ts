"use server";

import { redirect } from "next/navigation";
import { sqs } from "../lib/sqsClient";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

export async function sendMessage(formData: FormData) {
  const s3Key = formData.get("s3Key") as string;
  const start = formData.get("start") as string;
  const end = formData.get("end") as string;
  let success = false;

  try {
    const command = new SendMessageCommand({
      QueueUrl: process.env.NEXT_PUBLIC_AWS_SQS_URL,
      MessageBody: JSON.stringify({
        rawRegionBoundaries: [parseFloat(start), parseFloat(end)],
        s3Key,
      }),
    });
    const response = await sqs.send(command);
    if (response.$metadata.httpStatusCode === 200) success = true;
  } catch (error) {
    console.error(error);
  }

  if (success) redirect("/processing");
}
