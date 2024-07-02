import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { GetObjectAttributesCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3Client";
import WaveFormVisualizerContainer from "../components/WaveFormVisualizer";
const inter = Inter({ subsets: ["latin"] });

const InvalidFileKeyScreen = () => {
  return (
    <main
      className={`flex min-w-full min-h-full flex-col items-center justify-center gap-y-20 text-md tracking-wide font-semibold ${inter.className}`}
    >
      <p>
        Please select an audio file{" "}
        <Link className="text-sky-400 hover:underline" href={"/"}>
          here
        </Link>
        .
      </p>
    </main>
  );
};

export default async function CutPage() {
  const keyCookie = cookies().get("key");

  const Bucket = process.env.AWS_BUCKET as string;
  const Key = keyCookie?.value as string;

  if (!keyCookie) return <InvalidFileKeyScreen />;

  try {
    const command = new GetObjectAttributesCommand({
      Bucket,
      Key,
      ObjectAttributes: ["ETag"],
    });
    await s3.send(command);
  } catch (error: any) {
    return <InvalidFileKeyScreen />;
  }

  return (
    <main
      className={`flex min-w-full min-h-full flex-col items-center justify-center gap-y-20 tracking-wide font-semibold ${inter.className}`}
    >
      <div className="h-fit md:w-1/2 w-4/5 flex justify-center items-center">
        <WaveFormVisualizerContainer
          src={`https://d2w8muq8s9pt97.cloudfront.net/${keyCookie.value}`}
        />
      </div>
    </main>
  );
}
