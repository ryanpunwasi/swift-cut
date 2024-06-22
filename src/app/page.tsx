import { Inter } from "next/font/google";
import FileUpload from "./components/FileUpload";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-w-full min-h-full flex-col items-center justify-center gap-y-20  ${inter.className}`}
    >
      <video
        autoPlay
        muted
        loop
        className="fixed -z-10 filter brightness-90 min-w-full min-h-full right-0 bottom-0 object-cover backdrop-brightness-0"
      >
        <source src="bg-video.mp4" type="video/mp4" />
      </video>
      <h1
        className="select-none text-white text-3xl sm md:text-5xl lg:text-6xl tracking-wide font-semibold"
        style={{
          textShadow:
            "-1px 0 #3b0764, 0 1px #3b0764, 1px 0 #3b0764, 0 -1px #3b0764",
        }}
      >
        Trim audio files online for free
      </h1>
      <FileUpload />
      <p className="absolute bottom-10 right-10 text-sm tracking-normal">
        Developed by{" "}
        <a
          className="text-sky-400 hover:underline"
          href="https://ryansoftware.netlify.app/"
          target="_blank"
        >
          Ryan
        </a>
      </p>
    </main>
  );
}
