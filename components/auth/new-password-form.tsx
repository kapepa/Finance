"use client"

import { ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardWrapper } from "./card-wrapper";
import { Routers } from "@/enum/routers";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/new-password";

interface NewPasswordFormProps {
  token: string,
}

const NewPasswordForm: FC<NewPasswordFormProps> = (props) => {
  const { token } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  })

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    if (!token) return setError("Tokin is not existing")

    startTransition(() => {
      newPassword({ token, values })
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
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref={Routers.Login}
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
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
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
            message={error}
          />
          <FormSuccess
            message={success}
          />
          <Button 
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            Set new password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { NewPasswordForm }