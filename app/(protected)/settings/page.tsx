"use client"

import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NextPage } from "next";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SettingsSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

const SettingsPage: NextPage = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const { update, data } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: data?.user.name || "",
      email: data?.user.email || "",
      oldPassword: "",
      password: "",
      confirm: "",
      role: data?.user.role || UserRole.USER,
      isTwoFactorEnabled: data?.user.isTwoFactorEnabled || false,
    },
  })
  
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
      .then(res => {
        if (!!res?.success) {
          setError(undefined);
          setSuccess(res?.success);
        };
        if (!!res.error) {
          setSuccess(undefined);
          setError(res.error);
        }
        update();
        router.refresh();
      })
      .catch(() => {
        setSuccess(undefined);
        setError("Something went wrong!");
      })
    })
  };

  return (
    <Card
      className="w-[600px]"
    >
      <CardHeader>
        <p
          className="text-2xl font-semibold text-center"
        >
          Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={isPending}
                        placeholder="Name"
                        type="name"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                data?.user.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              disabled={isPending}
                              placeholder="my@email.example" 
                              type="email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Old Password</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="*****" 
                              type="password"
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
                              disabled={isPending}
                              placeholder="*****" 
                              type="password"
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
                              disabled={isPending}
                              placeholder="*****" 
                              type="password"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )
              }
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select 
                      disabled={isPending}
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            placeholder="Select a role" 
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem 
                          value={UserRole.ADMIN}
                        >
                          {UserRole.ADMIN}
                        </SelectItem>
                        <SelectItem 
                          value={UserRole.USER}
                        >
                          {UserRole.USER}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {
                data?.user.isOAuth === false && (
                  <FormField
                    control={form.control}
                    name="isTwoFactorEnabled"
                    render={({ field }) => (
                      <FormItem
                        className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
                      >
                        <div
                          className="space-y-0.5"
                        >
                          <FormLabel>Two Factor Authentication</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            disabled={isPending}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }
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
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SettingsPage;