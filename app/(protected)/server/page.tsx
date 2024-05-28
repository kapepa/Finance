import { auth } from "@/auth";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";
import { NextPage } from "next";

const ServerPage: NextPage = async () => {
  // const user = await auth();
  const user = await currentUser()

  return (
    <UserInfo
      user={user}
      label="Server component"
    />
  )
}

export default ServerPage;