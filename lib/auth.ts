import { auth } from "@/auth"

const currentUser = async () => {
  const current = await auth();

  return current?.user
}

const currentRole = async () => {
  const current = await auth();

  return current?.user.role
}

export { currentUser, currentRole }