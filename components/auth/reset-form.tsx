"use client"

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
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { reset } from "@/actions/reset";

const ResetForm: FC = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof ResetSchema>) {
    startTransition(() => {
      reset(values)
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
      headerLabel="Forgot your password"
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
            Send reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export { ResetForm }