import { NewPasswordForm } from "@/components/auth/new-password-form";
import { NextPage } from "next";

interface NewPasswordPageProps {
  searchParams: { token: string }
}

const NewPasswordPage: NextPage<NewPasswordPageProps> = (props) => {
  const { searchParams: { token } } = props;

  return (
    <NewPasswordForm
      token={token}
    />
  )
}

export default NewPasswordPage;