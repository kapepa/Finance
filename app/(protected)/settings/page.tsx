"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { NextPage } from "next";

const SettingsPage: NextPage = () => {
  const user = useCurrentUser();


  return (
    <div
      className="bg-white p-10 rounded-xl"
    >
      ettingsPage
    </div>
  )
}

export default SettingsPage;