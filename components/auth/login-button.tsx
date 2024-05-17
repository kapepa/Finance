"use client"

import { Routers } from "@/enum/routers";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

enum ModeEnum {
  modal = "modal",
  redirect = "redirect",
}

type ModeType = keyof typeof ModeEnum;

interface LoginButtonProps {
  mode?: ModeType,
  asChild?: boolean,
  children: ReactNode,
}

const LoginButton: FC<LoginButtonProps> = (props) => {
  const { mode = ModeEnum.redirect, asChild, children } = props;
  const router = useRouter();

  const onClick = () => {
    router.push(Routers.Login);
  }

  if (mode === ModeEnum.modal) return (
    <span>
      TODO: Implement modal
    </span>
  )

  return (
    <span
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </span>
  )
}

export { LoginButton }