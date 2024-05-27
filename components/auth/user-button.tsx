"use client"

import { FC } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "./logout-button";
import { LogOut } from "lucide-react";

const UserButton: FC = () => {
  const user = useCurrentUser();

  console.log(user?.image)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback
            className="bg-sky-500"
          >
            <FaUser
              className="text-white"
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40"
      >
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut 
              className="h-4 w-4 mr-2"
            />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserButton };