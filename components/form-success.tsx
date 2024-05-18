"use client"

import { CircleCheck, TriangleAlert } from "lucide-react";
import { FC } from "react";

interface FormSuccessProps {
  message?: string
}

const FormSuccess: FC<FormSuccessProps> = (props) => {
  const { message } = props;

  if (!message) return null;

  return (
    <div
      className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500"
    >
      <CircleCheck
        className="h-5 w-5"
      />
      <p>{message}</p>
    </div>
  )
}

export { FormSuccess }