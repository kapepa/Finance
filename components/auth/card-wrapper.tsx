"use client"

import { FC, ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Routers } from "@/enum/routers";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: ReactNode,
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: Routers,
  showSocial?: boolean,
}

const CardWrapper: FC<CardWrapperProps> = (props) => {
  const { children, headerLabel, backButtonLabel, backButtonHref, showSocial } = props;

  return (
    <Card
      className="w-[400px] shadow-md"
    >
      <CardHeader>
        <Header>
          {headerLabel}
        </Header>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {
        showSocial && (
          <CardFooter>
            <Social/>
          </CardFooter>
        )
      }
      <CardFooter>
        <BackButton
          href={backButtonHref}
        >
          {backButtonLabel}
        </BackButton>
      </CardFooter>
    </Card>
  )
}

export { CardWrapper }