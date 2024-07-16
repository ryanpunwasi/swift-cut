import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { GetObjectAttributesCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3Client";
import WaveFormVisualizerContainer from "../components/WaveFormVisualizer";
const inter = Inter({ subsets: ["latin"] });
import Download from "../components/Download";

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

export default async function FilePage({}) {
  const keyCookie = cookies().get("key");
  return (
    <main
      className={`flex min-w-full min-h-full flex-col items-center justify-center gap-y-20 tracking-wide font-semibold ${inter.className}`}
    >
      {keyCookie && (
        <div className="h-fit md:w-1/2 w-4/5 flex flex-col justify-center items-center">
          <Download />
        </div>
      )}
      {!keyCookie && <InvalidFileKeyScreen />}
    </main>
  );
}
