import { HashLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <HashLoader size={70} color="#364153" />
    </div>
  );
}
