"use client"

import { FC, useTransition } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";

enum SocialProvider {
  Google = "google",
  Github = "github",
}

type SocialProvidetype = SocialProvider;

const Social: FC = () => {
  const [isPending, startTransition] = useTransition()
  const onClick = (provider: SocialProvidetype) => {
    startTransition(async () => {
      await signIn(provider, { redirectTo: DEFAULT_LOGIN_REDIRECT });
    })
  }

  return (
    <div
      className="flex items-center w-full gap-x-2"
    >
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        disabled={isPending}
        onClick={onClick.bind(null, SocialProvider.Google)}
      >
        <FcGoogle
          className="h-5 w-5"
        />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        disabled={isPending}
        onClick={onClick.bind(null, SocialProvider.Github)}
      >
        <FaGithub
           className="h-5 w-5"
        />
      </Button>
    </div>
  )
}

export { Social }