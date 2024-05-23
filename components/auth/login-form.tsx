"use client"

import { FC, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { Routers } from "@/enum/routers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

const LoginForm: FC = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
    ? "Email already is use with different providers"
    : ""

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      login(values)
      .then((res) => {
        if (!!res.success){
          setError(undefined);
          setSuccess(res.success);
        };
        if (!!res.error) {
          setSuccess(undefined);
          setError(res.error);
        }
        
      })
      .catch((err) => {
        if (err.error) setError(err.error);
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref={Routers.Register}
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          <div
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="my@example.com"
                      disabled={isPending}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="******" 
                      disabled={isPending}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError
            message={error || urlError}
          />
          <FormSuccess
            message={success}
          />
          <Button 
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { LoginForm }