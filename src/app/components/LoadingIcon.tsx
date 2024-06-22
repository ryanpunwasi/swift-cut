import { PiWaveformBold } from "react-icons/pi";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

type Props = {
  text?: string;
};

const LoadingIcon = ({ text }: Props) => {
  return (
    <div className="flex min-w-full min-h-full gap-2 flex-col items-center justify-center">
      <PiWaveformBold
        className="text-pink-400 filter brightness-50 animate-pulse"
        size={150}
      />
      <p
        className={`text-gray-400 text-center text-base ${nunito.className} tracking-normal`}
      >
        {text || "Loading..."}
      </p>
    </div>
  );
};

export default LoadingIcon;
