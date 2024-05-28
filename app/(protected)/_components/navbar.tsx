"use client"

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import { Routers } from "@/enum/routers";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { FC } from "react"

const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm"
    >
      <div
        className="flex gap-x-2"
      >
        <Button
          variant={pathname === Routers.Server ? "default" : "outline"}
          asChild
        >
          <Link
            href={Routers.Server}
          >
            Server
          </Link>
        </Button>
        <Button
          variant={pathname === Routers.Client ? "default" : "outline"}
          asChild
        >
          <Link
            href={Routers.Client}
          >
            Client
          </Link>
        </Button>  
        <Button
          variant={pathname === Routers.Admin ? "default" : "outline"}
          asChild
        >
          <Link
            href={Routers.Admin}
          >
            Admin
          </Link>
        </Button>      
        <Button
          variant={pathname === Routers.Settings ? "default" : "outline"}
          asChild
        >
          <Link
            href={Routers.Settings}
          >
            Settings
          </Link>
        </Button>
      </div>
      <UserButton/>
    </nav>
  )
}

export { Navbar }