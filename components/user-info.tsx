"use client"

import { UserAuth } from "@/types/next-auth";
// import { User } from "@prisma/client";
import { FC } from "react"
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: UserAuth;
  label: string,
}

const UserInfo: FC<UserInfoProps> = (props) => {
  const { user, label } = props;

  return (
    <Card
      className="w-[600px] shadow-md"
    >
      <CardHeader
        className="space-y-4"
      >
        <p
          className="text-2xl font-semibold text-center"
        >
          { label }
        </p>
      </CardHeader>
      <CardContent>
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <p
            className="text-sm font-medium"
          >
            ID
          </p>
          <p
            className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
          >
            { user?.id } 
          </p>
        </div>
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <p
            className="text-sm font-medium"
          >
            Name
          </p>
          <p
            className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
          >
            { user?.name } 
          </p>
        </div>
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <p
            className="text-sm font-medium"
          >
            Email
          </p>
          <p
            className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
          >
            { user?.email } 
          </p>
        </div>   
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <p
            className="text-sm font-medium"
          >
            Role
          </p>
          <p
            className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
          >
            { user?.role } 
          </p>
        </div>    
        <div
          className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <p
            className="text-sm font-medium"
          >
            Two Factor Authentication
          </p>
          <div
            className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md"
          >
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              { user?.isTwoFactorEnabled ? "ON" : "OFF" } 
            </Badge>
          </div>
        </div>          
      </CardContent>
    </Card>
  )
}

export { UserInfo }