import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { FC, ReactNode } from "react";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

interface HeaderProps {
  children: ReactNode
}

const Header: FC<HeaderProps> = (props) => {
  const { children } = props;

  return (
    <div
      className="w-full flex flex-col gap-y-4 items-center"
    >
      <h1
        className={cn(
          PoppinsFont.className,
          "text-3xl font-semibold"
        )}
      >
        Auth
      </h1>
      <p
        className="text-muted-foreground text-sm"
      >
        {children}
      </p>
    </div>
  )
}

export { Header }