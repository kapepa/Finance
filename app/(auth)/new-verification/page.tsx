import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { NextPage } from "next";

interface NewVerificationProps {
  searchParams: { token: string }
}

const NewVerification: NextPage<NewVerificationProps> = (props) => {
  const { searchParams: { token } } = props;

  return (
    <NewVerificationForm
      token={token}
    />
  )
}

export default NewVerification;