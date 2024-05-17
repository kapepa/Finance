import { FC } from "react";
import { CardWrapper } from "./card-wrapper";
import { Routers } from "@/enum/routers";

const LoginForm: FC = () => {
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={Routers.Register}
      showSocial
    >
      LoginForm
    </CardWrapper>
  )
}

export { LoginForm }