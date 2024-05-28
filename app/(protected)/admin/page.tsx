"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Routers } from "@/enum/routers";
import { UserRole } from "@prisma/client";
import { NextPage } from "next";
import { useTransition } from "react";
import { toast } from "sonner";

const AdminPage: NextPage = () => {
  const [isPending, startTransition] = useTransition()
  
  const onApiRouteClient = () => {
    startTransition(() => {
      fetch(Routers.ApiAdmin,{ method: "get" })
      .then((res) => {
        if (res.ok) {
          toast.success("Allowed API Route")
        } else {
          toast.error("Forbidden API Route")
        }
      })
    })
  }

  const onServerAction = () => {
    startTransition(() => {
      admin()
      .then((res) => {
        if (res.success) toast.success("Allowed API Route")
        if (res.error) toast.error("Forbidden API Route")
      })
    })
  }

  return (
    <Card
      className="w-[600px]"
    > 
      <CardHeader>
        <p
          className="text-2xl font-semibold text-center"
        >
          Admin
        </p>
      </CardHeader>
      <CardContent
        className="space-y-4"
      >
        <RoleGate
          allowedRole={UserRole.ADMIN}
        >
          <FormSuccess
            message="You are allowd to see this content"
          />
        </RoleGate>
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
        >
          <p
            className="text-sm font-medium"
          >
            Admin-only API Route
          </p>
          <Button
            onClick={onApiRouteClient}
            disabled={isPending}
          >
            Click to test
          </Button>
        </div>
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
        >
          <p
            className="text-sm font-medium"
          >
            Admin-only Server Action
          </p>
          <Button
            onClick={onServerAction}
            disabled={isPending}
          >
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage;