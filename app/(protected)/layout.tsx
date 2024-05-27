import { FC, ReactNode } from "react";
import { Navbar } from "./_components/navbar";

interface ProtectedPageProps {
  children: ReactNode,
}

const ProtectedPage: FC<ProtectedPageProps> = (props) => {
  const { children } = props;

  return (
    <div
      className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500"
    >
      <Navbar/>
      { children }
    </div>
  )
}

export default ProtectedPage;