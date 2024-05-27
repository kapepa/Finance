"use client"

import { FC, ReactNode } from "react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

interface LogoutButtonProps {
  children: ReactNode,
}

const LogoutButton: FC<LogoutButtonProps> = (props) => {
  const { children } = props;

  const onLogout = () => signOut();

  return (
    <span
      onClick={onLogout}
      className="cursor-pointer"
    >
      { children }
    </span>
  )
}

export { LogoutButton }