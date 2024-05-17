"use client"

import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { Routers } from "@/enum/routers";
import Link from "next/link";

interface BackButtonProps {
  href: Routers,
  children: ReactNode,
}

const BackButton: FC<BackButtonProps> = (props) => {
  const { href, children } = props;

  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild
    >
      <Link
        href={href}
      >
        {children}
      </Link>
    </Button>
  )
}

export { BackButton }