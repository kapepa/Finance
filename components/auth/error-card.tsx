import { FC } from "react";
import { Routers } from "@/enum/routers";
import { CardWrapper } from "./card-wrapper";
import { TriangleAlert } from "lucide-react";

const ErrorCard: FC = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref={Routers.Login}
    >
      <div
        className="w-full flex justify-center items-center"
      >
        <TriangleAlert 
          className="h-5 w-5 text-destructive"
        />
      </div>
    </CardWrapper>
  )
}

export { ErrorCard }