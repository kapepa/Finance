"use client"

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NextPage } from "next";

const ClientPage: NextPage = () => {
  const user = useCurrentUser();

  return (
    <UserInfo
      user={user}
      label="Client component"
    />
  )
}

export default ClientPage;